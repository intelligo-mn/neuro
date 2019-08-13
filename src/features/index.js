export const NGramsOfLetters = require("./NGramsOfLetters");
export const Hypernyms = require("./HypernymExtractor");
export const FeatureLookupTable = require("./FeatureLookupTable");
export const LowerCaseNormalizer = require("./LowerCaseNormalizer");
export const RegexpNormalizer = require("./RegexpNormalizer");
export const RegexpSplitter = require("./RegexpSplitter");

/**
 * CollectionOfExtractors - combines the features from several feature extractors. 
 * @param extractors - an array of other feature extractors. 
 * @param sample - a string.
 * @param features an initial hash of features (optional).
 * @return a hash with all features generated from the sample by the different extractors
 */
export function CollectionOfExtractors(extractors) {
	return function(sample, features) {
		for (var i=0; i<extractors.length; ++i){
			extractors[i](sample, features);
		}
	};
};



/**
 * Convert an array of words/tokens to a set of n-grams, for a given n, possibly with a gap:
 */
export function NGramsFromArray(numOfWords, gap, grams, features) {
	for (var i = 0; i < numOfWords - 1 - (gap ? 1 : 0); ++i) {
		grams.unshift("[start]");
		grams.push("[end]");
	}
	for (var i = 0; i <= grams.length - numOfWords; ++i) {
		let sliceOfWords = grams.slice(i, i + numOfWords);
		if (gap) sliceOfWords[1] = "-";
		let feature = sliceOfWords.join(" ");
		features[feature.trim()] = 1;
	}
	for (var i = 0; i < numOfWords - 1 - (gap ? 1 : 0); ++i) {
		grams.pop();
		grams.shift();
	}
}

export function NGramsOfWords(numOfWords, gap) {
	return function (sample, features) {
		var words = sample.split(/[ \t,;:.!?]/).filter(function (a) {
			return !!a
		}); // all non-empty words
		NGramsFromArray(numOfWords, gap, words, features);
	};
}


/**
 * Call the given featureExtractor on the given sample, and return the result.
 * Used for testing.
 */
export function call(featureExtractor, sample) {
	var features = {};
	featureExtractor(sample, features);
	return features;
} 

/**
 * If the input is a featureExtractor, return it as is.
 *
 * If it is an array of featureExtractors, convert it to a CollectionOfExtractors.
 *
 */
export function normalize(featureExtractorOrArray) {
	return (!featureExtractorOrArray? 
				featureExtractorOrArray:
			Array.isArray(featureExtractorOrArray)? 
				new CollectionOfExtractors(featureExtractorOrArray):
				featureExtractorOrArray);	
}
