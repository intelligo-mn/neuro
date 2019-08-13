/**
 * a unit-test for Multi-Label classification in the Binary-Relevance method,
 * with Naive Bayes as the underlying binary classifier.
 * 
 * @author Erel Segal-Halevi
 * @since 2013-08
 */

import should from 'should';
import {
	multilabel,
	Bayesian
} from '../../../dist/core';

var BinaryRelevanceBayes = multilabel.BinaryRelevance.bind(this, {
	binaryClassifierType: Bayesian.bind(this, {}),
});
