/**
 * a unit-test for Regular Expression Splitter.
 */

import { RegexpSplitter } from "../../dist/features";

describe("RegexpSplitter", function() {
  it("splits sentences without delimiter", function() {
    var res = RegexpSplitter("[.,;?!]|and");
    res("Hi. Who are you? I am Intelligo Bot.").should.eql([
      "Hi",
      "Who are you",
      "I am Intelligo Bot"
    ]);
    res("Hi.Who are you?I am Intelligo Bot.").should.eql([
      "Hi",
      "Who are you",
      "I am Intelligo Bot"
    ]);
    res(
      "Hi.       Who are you?           I am Intelligo Bot.          "
    ).should.eql(["Hi", "Who are you", "I am Intelligo Bot"]);
  });
  it("splits sentences with delimiter", function() {
    var res = RegexpSplitter("[.,;?!]|and", {
      "?": true,
      ".": false
    });
    res("Hi. Who are you? I am Intelligo Bot.").should.eql([
      "Hi",
      "Who are you ?",
      "I am Intelligo Bot"
    ]);
    res("Hi.Who are you?I am Intelligo Bot.").should.eql([
      "Hi",
      "Who are you ?",
      "I am Intelligo Bot"
    ]);
    res("Hi.        Who are you?        I am Intelligo Bot.").should.eql([
      "Hi",
      "Who are you ?",
      "I am Intelligo Bot"
    ]);
  });
});
