let nunjucks = require('nunjucks');
let njIncludeData = require('nunjucks-includeData');

module.exports = function(config) {
  config.addPassthroughCopy('src/assets');

  let njEnv = nunjucks.configure('src/templates');
  njIncludeData.install(njEnv);
  config.setLibrary("njk", njEnv);

  return {
    dir: {
      input: 'pages',
      output: 'dist',
      includes: '../src/templates',
      data: '../data'
    },
    passthroughFileCopy: true
  };
};
