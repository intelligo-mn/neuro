/*
 * a unit-test for kNN classifier.
 */

import should from 'should';
import {
	kNN,
	EnhancedClassifier
} from '../../dist/core';
import {
	FeatureLookupTable
} from '../../dist/features';
import {
	_
} from "underscore";

var unigramext = function (sentence, features) {
	var feature = sentence.split(" ")
	_.each(feature, function (feat, key, list) {
		features[feat] = 1
	}, this)
	return features;
}

function weightInstance1(instance) {
	return 1
}

function weightInstance2(instance) {
	return 1 / instance
}

var kNNClassifier = kNN.bind(this, {
	k: 1,
	distanceFunction: 'EuclideanDistance',
	/*EuclideanDistance
	ChebyshevDistance
	ManhattanDistance*/

	distanceWeightening: weightInstance1

});

var kNNClassifier2 = kNN.bind(this, {
	k: 1,
	distanceFunction: 'EuclideanDistance',
	distanceWeightening: weightInstance1
});

var kNNClassifierE = EnhancedClassifier.bind(this, {
	classifierType: kNNClassifier,
	featureLookupTable: new FeatureLookupTable()
});

var kNNClassifierEF = EnhancedClassifier.bind(this, {
	classifierType: kNNClassifier2,
	featureLookupTable: new FeatureLookupTable(),
	featureExtractor: unigramext
});

describe.skip('kNN classifier', function () {

	it('simple', function () {

		var classifier = new kNNClassifierE();
		var trainSet = [{
				input: {
					a: 1.5,
					d: 1
				},
				output: 0
			},
			{
				input: {
					a: 1.2,
					d: 0.6
				},
				output: 0
			},
			{
				input: {
					a: 2,
					d: 1
				},
				output: 1
			},
			{
				input: {
					a: 2.5,
					d: 2.1
				},
				output: 1
			}
		];

		classifier.trainBatch(trainSet);
		classifier.classify({
			a: 0.5,
			d: 0.5
		})['explanation'][0]['distance'].should.equal(0.7071067811865475)
	})

	it('features', function () {

		var classifier = new kNNClassifierE();
		var trainSet = [{
				input: {
					a: 1.5,
					d: 1
				},
				output: 0
			},
			{
				input: {
					a: 1.2,
					d: 0.6
				},
				output: 0
			},
			{
				input: {
					a: 2,
					d: 1
				},
				output: 1
			},
			{
				input: {
					a: 2.5,
					d: 2.1
				},
				output: 1
			}
		];

		classifier.trainBatch(trainSet);

		_.isEqual(classifier.featureLookupTable, {
			featureIndexToFeatureName: [undefined, 'a', 'd'],
			featureNameToFeatureIndex: {
				undefined: 0,
				a: 1,
				d: 2
			}
		}).should.be.true

		classifier.classify({
			a: 0,
			b: 0,
			c: 1
		})

		_.isEqual(classifier.featureLookupTable, {
			featureIndexToFeatureName: [undefined, 'a', 'd', 'b', 'c'],
			featureNameToFeatureIndex: {
				undefined: 0,
				a: 1,
				d: 2,
				b: 3,
				c: 4
			}
		}).should.be.true

	})

	it('complex', function () {
		var classifier = new kNNClassifierEF();
		var trainSet = [{
				input: 'aa bb cc',
				output: 0
			},
			{
				input: 'bb aa cc',
				output: 0
			},
			{
				input: 'dd bb dd',
				output: 1
			},
			{
				input: 'dd pp ss',
				output: 1
			}
		];

		classifier.trainBatch(trainSet);

		_.isEqual(classifier.featureLookupTable['featureNameToFeatureIndex'], {
			undefined: 0,
			aa: 1,
			bb: 2,
			cc: 3,
			dd: 4,
			pp: 5,
			ss: 6
		}).should.be.true

		var output = classifier.classify('ww pp oo');

		_.isEqual(classifier.featureLookupTable['featureNameToFeatureIndex'], {
			undefined: 0,
			aa: 1,
			bb: 2,
			cc: 3,
			dd: 4,
			pp: 5,
			ss: 6,
			ww: 7,
			oo: 8
		}).should.be.true

	})

})