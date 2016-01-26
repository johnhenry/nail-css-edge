#CSS Edge (nail-css-edge)
Use latest features of CSS with [John Henry's Hammer](https://github.com/johnhenry/john-henrys-hammer)

Use the "@import" function to combine multiple files into one.

##Installation
See [John Henry's Hammer](https://github.com/johnhenry/john-henrys-hammer/blob/master/readme.md#usage)

##Options

 -  source:string - source file
 -  destination:string - destination file (defaults to "style.css")
 -  minify:boolean - minify file (defaults to false)
 -  map:boolean - create source map (defaults to false)
 -  mode: string ('edge' | 'scss' | 'less') - language mode (defaults to 'edge') see below

##Language Modes
When setting the mode, you have the option of choosing a language mode.

- edge (css) - Default - This will process the file as CSS 4.0, including experimental such as variables and imports. This also adds the ability to nest code..

- scss - This will process the file as (scss)[http://sass-lang.com/]. Importing is currently limited to '.scss' files.

- less - This will process the file as (less)[http://lesscss.org/]. Importing is not yet supported.
