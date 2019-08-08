/**
 * Utilities for lists
 * 
 * @author Vasily Konovalov
 */
import {
	reduce,
	isObject,
	isArray,
	each,
	clone
} from 'underscore';

// Calculating the median of an array basically involves sorting the array and picking the middle number. 
// If it’s an even amount of numbers you take the two numbers in the middle and average them.
export function median(values) {
	values.sort(function (a, b) {
		return a - b;
	});
	var half = Math.floor(values.length / 2);
	if (values.length % 2)
		return values[half];
	else
		return (values[half - 1] + values[half]) / 2.0;
}

export function variance(list) {
	sum = reduce(list, function (memo, num) {
		return memo + num;
	}, 0);
	exp = sum / list.length
	sum2 = reduce(list, function (memo, num) {
		return memo + num * num;
	}, 0);
	exp2 = sum2 / list.length
	return exp2 - exp * exp
}

export function average(list) {
	let sum = reduce(list, function (memo, num) {
		return memo + num;
	}, 0);
	return sum / list.length
}

// @input - list 
// @output - embedded list
export function listembed(label) {
	if ((label === null) || (label == undefined) || (typeof label == 'undefined'))
		return [
			[]
		]
	// if (typeof label != 'undefined')
	// else
	// {
	if ((isObject(label)) && !(isArray(label)))
		// if ('classes' in JSON.parse(label))
		if ('classes' in label)
			label = label.classes

	if (!(label[0] instanceof Array))
		return [label]
	else
		return label
	// }
	// else
	// {
	// return [label]
	// }
}

export function clonedataset(set) {
	set1 = []
	each(set, function (value, key, list) {
		set1.push(clone(value))
	})
	return set1
}