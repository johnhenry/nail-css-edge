const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const postcss = require('postcss');
const postcssExtend = require('postcss-extend');
const postcssImport = require('postcss-import');
const cssNext = require('cssnext');
const postcssNested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const colorguard = require('colorguard');
module.exports = (opts) => {
  const options = opts || {};
  const config = options.config;
  const source = options.source;
  const destination = options.destination || 'style.css';
  const minify = options.minify;
  const map = options.map;
  const resolvedSource = path.resolve(cwd, source);
  const resolvedDestination = path.resolve(cwd, config.dir, destination);
  const mode = options.mode;
  switch(mode){
    case 'scss':
      const sass = require('node-sass');
      try{
        const result = sass.renderSync({
          file  : resolvedSource,
          outFile : resolvedDestination,
          sourceMap : !!map
        }).css.toString();
        return Promise.resolve(fs.writeFileSync(resolvedDestination, result));
      }catch(error){
        return Promise.reject(new Error(error.message));
      }
      break;
    case 'less':
      const less = require('less');
      const lessInput = fs.readFileSync(resolvedSource, 'utf-8');
      const lessOptions = {};
      return less.render(lessInput, lessOptions)
          .then(function(result) {
              return fs.writeFileSync(resolvedDestination, result.css);
          });
      break;
    case 'edge':
    default:
      const plugins = [
        postcssImport
        ,postcssExtend
        ,cssNext()
        ,postcssNested
        ,autoprefixer
        ,colorguard()
      ];
      if(minify) plugins.push(require('cssnano'));
      plugins.push(colorguard());
      return postcss(plugins)
      .process(fs.readFileSync(resolvedSource, 'utf-8'), {
            from: resolvedSource,
            to:   resolvedDestination,
            map: { inline: false }
        })
      .then(function (result) {
          fs.writeFileSync(resolvedDestination, result.css);
          if ( result.map ) fs.writeFileSync(resolvedDestination + '.map', result.map);
          return true;
      }).catch(function(error){console.error(error)});
  }
};
