/**
 * NGramExtractor - extracts sequences of words in a text as its features.
 */

import NGramsFromArray from './NGramsFromArray';
export default function (numOfWords, gap) {
	return function (sample, features) {
		var words = sample.split(/[ \t,;:.!?]/).filter(function (a) {
			return !!a
		}); // all non-empty words
		NGramsFromArray(numOfWords, gap, words, features);
	};
};
