"use strict";

var trainAndTest = require("./trainAndTest");

module.exports = {
  hash: require("./hash"),
  partitions: require("./partitions"),
  PrecisionRecall: require("./PrecisionRecall"),
  test: trainAndTest.test,
  compare: trainAndTest.compare,
  hammingDistance: require("./hamming").hammingDistance
};