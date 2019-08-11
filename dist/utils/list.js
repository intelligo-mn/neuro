"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.median = median;
exports.variance = variance;
exports.average = average;
exports.listembed = listembed;
exports.clonedataset = clonedataset;

var _underscore = require("underscore");

/**
 * Utilities for lists
 * 
 * @author Vasily Konovalov
 */
// Calculating the median of an array basically involves sorting the array and picking the middle number. 
// If it’s an even amount of numbers you take the two numbers in the middle and average them.
function median(values) {
  values.sort(function (a, b) {
    return a - b;
  });
  var half = Math.floor(values.length / 2);
  if (values.length % 2) return values[half];else return (values[half - 1] + values[half]) / 2.0;
}

function variance(list) {
  sum = (0, _underscore.reduce)(list, function (memo, num) {
    return memo + num;
  }, 0);
  exp = sum / list.length;
  sum2 = (0, _underscore.reduce)(list, function (memo, num) {
    return memo + num * num;
  }, 0);
  exp2 = sum2 / list.length;
  return exp2 - exp * exp;
}

function average(list) {
  var sum = (0, _underscore.reduce)(list, function (memo, num) {
    return memo + num;
  }, 0);
  return sum / list.length;
} // @input - list 
// @output - embedded list


function listembed(label) {
  if (label === null || label == undefined || typeof label == 'undefined') return [[]]; // if (typeof label != 'undefined')
  // else
  // {

  if ((0, _underscore.isObject)(label) && !(0, _underscore.isArray)(label)) // if ('classes' in JSON.parse(label))
    if ('classes' in label) label = label.classes;
  if (!(label[0] instanceof Array)) return [label];else return label; // }
  // else
  // {
  // return [label]
  // }
}

function clonedataset(set) {
  set1 = [];
  (0, _underscore.each)(set, function (value, key, list) {
    set1.push((0, _underscore.clone)(value));
  });
  return set1;
}