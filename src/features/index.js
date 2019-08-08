export const NGramsFromArray = require("./NGramsFromArray");
export const NGramsOfWords = require("./NGramsOfWords");
export const NGramsOfLetters = require("./NGramsOfLetters");
export const Hypernyms = require("./HypernymExtractor");
export const CollectionOfExtractors = require("./CollectionOfExtractors").default;
export const FeatureLookupTable = require("./FeatureLookupTable");
export const LowerCaseNormalizer = require("./LowerCaseNormalizer");
export const RegexpNormalizer = require("./RegexpNormalizer");
export const RegexpSplitter = require("./RegexpSplitter");

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
