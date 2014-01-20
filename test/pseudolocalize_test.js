'use strict';

var grunt = require('grunt');

function areFilesEqual(filename) {
	var actual = grunt.util.normalizelf(grunt.file.read('tmp/' + filename));
	var expected = grunt.util.normalizelf(grunt.file.read('test/expected/' + filename));
	return (actual === expected);
}

exports.pseudolocalize = {
	setUp: function(done) {
		done();
	},
	basic: function(test) {
		test.expect(1);
		test.ok(areFilesEqual('basic'), 'should produce pseduo-English output');
		test.done();
	},
	pretty: function(test) {
		test.expect(1);
		test.ok(areFilesEqual('pretty'), 'should produce multi-line pseduo-English output');
		test.done();
	},
	padding: function(test) {
		test.expect(1);
		test.ok(areFilesEqual('padded'), 'output should be padded 25% longer with x');
		test.done();
	},
	merging: function(test) {
		test.expect(1);
		test.ok(areFilesEqual('merged'), 'two input files should be combined');
		test.done();
	},
	nested: function(test) {
		test.expect(1);
		test.ok(areFilesEqual('nested'), 'nested output should be handled correctly');
		test.done();
	}
};