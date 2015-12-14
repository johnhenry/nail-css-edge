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
module.exports = ({
  config,
  source,
  destination = 'style.css',
  minify,
  map
} = {
  destination : 'style.css',
}) => {
  const resolvedSource = path.resolve(cwd, source);
  const resolvedDestination = path.resolve(cwd, config.dir, destination);
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
};
