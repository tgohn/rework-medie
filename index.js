var mediaQuery = require('css-mediaquery');

// http://keithclark.co.uk/articles/moving-ie-specific-css-into-media-blocks/media-tests/
var IE_ONLY_MEDIA_QUERY = '\\0screen\\,screen\\9';

module.exports = function(targetMedia) {
  targetMedia = targetMedia || {
    'width': '1024px',
    'dppx':  1
  };

  return function medie(ast) {
    var mediaRules = ast.rules
      .filter(function onlyMedia(rule) {
        return rule.type === 'media';
      })
      .filter(function matchedMedia(rule) {
        return mediaQuery.match(rule.media, targetMedia);
      })
      .reduce(function combineMatchedRules(prev, curr) {
        return prev.concat(curr.rules);
      }, []);

    ast.rules.push({
      'type':  'media',
      'media': IE_ONLY_MEDIA_QUERY,
      rules:   mediaRules
    });
  }
}
