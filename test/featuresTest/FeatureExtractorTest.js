/**
 * a unit-test for feature extractors
 */

import {
  call,
  CollectionOfExtractors,
  Hypernyms,
  NGramsOfLetters,
  NGramsOfWords
} from "../../dist/features";

describe("word unigram feature extractor", function() {
  it("creates word unigram features", function() {
    var fe = NGramsOfWords(1);
    call(fe, "This is a demo, you know?").should.eql({
      This: 1,
      is: 1,
      a: 1,
      demo: 1,
      you: 1,
      know: 1
    });
  });
});

describe("word bigram feature extractor", function() {
  it("creates word bigram features", function() {
    var fe = NGramsOfWords(2);
    call(fe, "This is a demo, you know?").should.eql({
      "[start] This": 1,
      "This is": 1,
      "is a": 1,
      "a demo": 1,
      "demo you": 1,
      "you know": 1,
      "know [end]": 1
    });
  });
});

describe("word trigram-with-gap feature extractor", function() {
  it("creates word bigram features", function() {
    var fe = NGramsOfWords(3, true);
    call(fe, "This is a demo, you know?").should.eql({
      "[start] - is": 1,
      "This - a": 1,
      "is - demo": 1,
      "a - you": 1,
      "demo - know": 1,
      "you - [end]": 1
    });
  });
});

describe("hypernym extractor", function() {
  it("creates hypernym features", function() {
    var hypernyms = [
      {
        regexp: /demo/g,
        feature: "demonstration",
        confidence: 0.9
      }
    ];
    var fe = Hypernyms(hypernyms);
    call(fe, "This is a demo, you know?").should.eql({
      demonstration: 0.9
    });
  });
});

describe("letter unigram feature extractor", function() {
  it("creates letter unigram features", function() {
    var fe = NGramsOfLetters(1);
    call(fe, "This is a demo, you know?").should.eql({
      t: 1,
      h: 1,
      i: 1,
      s: 1,
      " ": 1,
      a: 1,
      d: 1,
      e: 1,
      m: 1,
      o: 1,
      ",": 1,
      y: 1,
      u: 1,
      k: 1,
      n: 1,
      w: 1,
      "?": 1
    });
  });
});

describe("collection of extractors", function() {
  it("creates collection of features", function() {
    var fe = CollectionOfExtractors([NGramsOfWords(1), NGramsOfWords(2)]);
    call(fe, "This is a demo, you know?").should.eql({
      This: 1,
      is: 1,
      a: 1,
      demo: 1,
      you: 1,
      know: 1,
      "[start] This": 1,
      "This is": 1,
      "is a": 1,
      "a demo": 1,
      "demo you": 1,
      "you know": 1,
      "know [end]": 1
    });
  });
});
