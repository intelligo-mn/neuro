import { isEqual } from "underscore";
import { average, listembed, median, variance } from "../../dist/utils/list";

describe("List test function", function() {
  it("It should correctly calculate Variance", function() {
    let list = [170, 300, 430, 470, 600];
    variance(list).should.be.equal(21704);
  });

  it("it should calculate average correctly", function() {
    let list1 = [1, 2, 3, 4, 5, 6, 7];
    average(list1).should.be.equal(4);
  });

  it("it should calculate median correctly", function() {
    var list1 = [3, 8, 9, 1, 5, 7, 9, 21];
    median(list1).should.be.equal(7.5);
  });

  it("it should know how to do embedding", function() {
    isEqual(listembed(["label"]), [["label"]]).should.equal(true);
    isEqual(listembed([]), [[]]).should.equal(true);
    isEqual(listembed(undefined), [[]]).should.equal(true);
    isEqual(listembed(null), [[]]).should.equal(true);
    isEqual(
      listembed({
        classes: "label"
      }),
      ["label"]
    ).should.equal(true);
    isEqual(
      listembed({
        classes: ["label"]
      }),
      [["label"]]
    ).should.equal(true);
  });
});
