/**
 * Generating random string with given number of words and generating random list 
 * with given length with element from the given list
 */

export function random_string(length) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  length = length ? length : 10;
  var string = '';
  for (var i = 0; i < length; i++) {
    var word_length = Math.floor(Math.random() * 10 + 1);
    for (var j = 0; j <= word_length; j++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      var ch = chars.substring(randomNumber, randomNumber + 1);
      string += ch;
    }
    string += " ";
  }
  return string;
}
export function random_list_length(list) {
  return this.random_list(Math.floor(Math.random() * 5), list);
}
export function random_list(length, list) {
  var result = [];
  for (var i = 0; i < length; i++) {
    result.push(list[Math.floor(Math.random() * list.length)]);
  }
  return result;
}