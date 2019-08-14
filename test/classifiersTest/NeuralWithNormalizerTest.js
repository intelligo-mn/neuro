/**
 * a unit-test for Enhanced Classifier
 */

import { EnhancedClassifier, NeuralNetwork } from "../../dist/core";
import {
  LowerCaseNormalizer,
  NGramsOfWords,
  RegexpNormalizer
} from "../../dist/features";

describe("baseline - classifier without a normalizer", function() {
  it("errs on non-normalized sentencs", function() {
    var spamClassifier = new EnhancedClassifier({
      classifierType: NeuralNetwork,
      featureExtractor: NGramsOfWords(1),
      normalizer: null
    });

    spamClassifier.trainBatch([
      {
        input: "cheaper watches",
        output: [1]
      },
      {
        input: "",
        output: [0]
      }
    ]);

    spamClassifier.classify("cheaper watches").should.be.above(0.8); // high number (spam)
    spamClassifier.classify("cheapest watch es").should.be.below(0.2); // very high number (spam)
    spamClassifier.classify("cheapless clocks").should.be.below(0.2); // low number (not spam)
  });
});

describe("classifier with a single normalizer", function() {
  it("classifies sentences correctly", function() {
    var spamClassifier = new EnhancedClassifier({
      classifierType: NeuralNetwork,
      featureExtractor: NGramsOfWords(1),
      normalizer: RegexpNormalizer([
        {
          source: "er\\b",
          target: ""
        },
        {
          source: "est\\b",
          target: ""
        },
        {
          source: " es\\b",
          target: "es"
        }
      ])
    });

    spamClassifier.trainBatch([
      {
        input: "cheaper watches",
        output: [1]
      },
      {
        input: "",
        output: [0]
      }
    ]);

    spamClassifier.classify("cheaper watches").should.be.above(0.8); // high number (spam)
    spamClassifier.classify("cheapest watch es").should.be.above(0.8); // low number (not spam)
    spamClassifier.classify("cheapless clocks").should.be.below(0.2); // low number (not spam)
  });
});

describe("classifier with an array of normalizers", function() {
  it("classifies sentences correctly", function() {
    var spamClassifier = new EnhancedClassifier({
      classifierType: NeuralNetwork,
      featureExtractor: NGramsOfWords(1),
      normalizer: [
        LowerCaseNormalizer,
        RegexpNormalizer([
          {
            source: "er\\b",
            target: ""
          }
        ]),
        RegexpNormalizer([
          {
            source: "est\\b",
            target: ""
          }
        ]),
        RegexpNormalizer([
          {
            source: " es\\b",
            target: "es"
          }
        ])
      ]
    });

    spamClassifier.trainBatch([
      {
        input: "ChEaPeR WaTcHeS",
        output: [1]
      },
      {
        input: "",
        output: [0]
      }
    ]);

    spamClassifier.classify("cheaper watches").should.be.above(0.8); // high number (spam)
    spamClassifier.classify("cheapest watch es").should.be.above(0.8); // high number (spam)
    spamClassifier.classify("cheapless clocks").should.be.below(0.2); // low number (not spam)
  });
});
