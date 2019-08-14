/**
 * a unit-test for Multi-Label classification in the Binary-Relevance method,
 * with Naive Bayes as the underlying binary classifier.
 */

import { Bayesian, multilabel } from "../../../dist/core";

var BinaryRelevanceBayes = multilabel.BinaryRelevance.bind(this, {
  binaryClassifierType: Bayesian.bind(this, {})
});
