export const BinaryRelevance = require('./BinaryRelevance');
export const BinarySegmentation = require('./BinarySegmentation');
export const MulticlassSegmentation = require('./MulticlassSegmentation');
export const MetaLabeler = require('./MetaLabeler');
export const CrossLanguageModel = require('./CrossLangaugeModelClassifier');
export const ThresholdClassifier = require('./ThresholdClassifier');

// add a "classify and log" method to all classifiers, for demos:
for (var classifierClass in module.exports) {
	if (module.exports[classifierClass].prototype && module.exports[classifierClass].prototype.classify)
		module.exports[classifierClass].prototype.classifyAndLog = function(sample) {
			console.log(sample+" is "+this.classify(sample));
		}
}
