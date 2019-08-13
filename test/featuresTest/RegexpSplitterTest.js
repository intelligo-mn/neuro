/**
 * a unit-test for Regular Expression Splitter.
 */

import should from 'should';
import {
	RegexpSplitter
} from '../../dist/features';

describe('RegexpSplitter', function () {
	it('splits sentences without delimiter', function () {
		var res = RegexpSplitter("[.,;?!]|and");
		res("Hi. Who are you? I am Erel.").should.eql(["Hi", "Who are you", "I am Erel"]);
		res("Hi.Who are you?I am Erel.").should.eql(["Hi", "Who are you", "I am Erel"]);
		res("Hi.       Who are you?           I am Erel.          ").should.eql(["Hi", "Who are you", "I am Erel"]);
	})
	it('splits sentences with delimiter', function () {
		var res = RegexpSplitter("[.,;?!]|and", {
			"?": true,
			".": false
		});
		res("Hi. Who are you? I am Erel.").should.eql(["Hi", "Who are you ?", "I am Erel"]);
		res("Hi.Who are you?I am Erel.").should.eql(["Hi", "Who are you ?", "I am Erel"]);
		res("Hi.        Who are you?        I am Erel.").should.eql(["Hi", "Who are you ?", "I am Erel"]);
	})
})