#!mocha

/**
 * a unit-test for Multi-Label classification
 */

import { hammingDistance } from "../../dist/utils";

describe("Hamming distance", function() {
  it("calculates hamming distance", function() {
    hammingDistance([], []).should.equal(0);
    hammingDistance(["a"], []).should.equal(1);
    hammingDistance([], ["a"]).should.equal(1);
    hammingDistance(["a"], ["a"]).should.equal(0);
    hammingDistance(["a"], ["b"]).should.equal(2);
    hammingDistance(["a", "b"], ["b", "c"]).should.equal(2);
  });
});
