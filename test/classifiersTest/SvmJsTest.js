/**
 * a unit-test for svm.js classifier
 */

import { EnhancedClassifier, SvmJs } from "../../dist/core";
import { FeatureLookupTable } from "../../dist/features";

var SvmClassifier = SvmJs.bind(this, {
  C: 20.0
});

describe("svm.js classifier with numeric features", function() {
  var trainSet = [
    {
      input: [0, 0],
      output: 0
    },
    {
      input: [1, 1],
      output: 0
    },
    {
      input: [0, 1],
      output: 1
    },
    {
      input: [1, 2],
      output: 1
    }
  ];

  var classifier = new SvmClassifier();
  classifier.trainBatch(trainSet);

  it("supports training and classification", function() {
    classifier.classify([0, 2]).should.eql(1);
    classifier.classify([1, 0]).should.eql(0);
  });

  it("explains its classifications", function() {
    classifier
      .classify([0, 2], 2)
      .should.have.property("explanation")
      .with.lengthOf(2);
    classifier
      .classify([1, 0], 2)
      .should.have.property("explanation")
      .with.lengthOf(2);
  });
});

var SvmClassifierStringFeatures = EnhancedClassifier.bind(this, {
  classifierType: SvmClassifier,
  featureLookupTable: new FeatureLookupTable()
});

describe("svm.js classifier with string features", function() {
  var trainSet = [
    {
      input: {
        a: 0,
        b: 0
      },
      output: 0
    },
    {
      input: {
        a: 1,
        b: 1
      },
      output: 0
    },
    {
      input: {
        a: 0,
        b: 1
      },
      output: 1
    },
    {
      input: {
        a: 1,
        b: 2
      },
      output: 1
    }
  ];

  var classifier = new SvmClassifierStringFeatures();
  classifier.trainBatch(trainSet);

  it("supports training and classification", function() {
    classifier
      .classify({
        a: 0,
        b: 2
      })
      .should.eql(1);
    classifier
      .classify({
        a: 1,
        b: 0
      })
      .should.eql(0);
  });

  it("explains its classifications", function() {
    classifier
      .classify([0, 2], 2)
      .should.have.property("explanation")
      .with.lengthOf(2);
    classifier
      .classify([1, 0], 2)
      .should.have.property("explanation")
      .with.lengthOf(2);
  });
});
