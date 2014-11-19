var assert = require('assert');
var fs     = require('fs');
var rework = require('rework');
var medie  = require('../');

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name + '.css', 'utf8').trim();
}

function compareFixtures(name, targetDevice) {
  var actual = rework(fixture(name)).use(medie(targetDevice)).toString().trim();
  var expected = fixture(name + '.out');

  return assert.equal(actual, expected);
}

describe('rework-medie', function() {
	it('should work with default IE device options', function() {
		compareFixtures('main');
	});
});
