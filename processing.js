/* Functions in this file should have no knowledge of the HTML. I'm hoping to
 * eventually port this as a script for Google Sheets as well, and separating
 * these functions should make that a lot easier.
 */

var genericHeader = function(num) {
  var gen = [];
  for (var i = 0; i < num; i++) {
    // TODO: support past Z (i=26)
    gen.push(String.fromCharCode(65 + i));
  }
  return gen;
};

/**
 * Gets headers if they exist and returns a lettering otherwise.
 * @param {!array} data
 * @param {bool} opt_remove If true, remove headers. Default is false.
 * @returns {!array} The header if found, generic lettering otherwise.
 */
var getHeaders = function(data, opt_remove) {
  if (data.length == 0) { return false; }
  var remove = opt_remove || false;
  var labels = labelCols(data);

  // TODO: Add option to manually override finding headers.
  var foundHeaders = false;
  for (var j = 0; j < data[0].length; j++) {
    if (labels[j] == 'number' && typeof data[0][j] != 'number') {
      foundHeaders = true;
      break;
    }
  }
  if (remove && foundHeaders) {
    return data.splice(0, 1)[0];
  }
  if (foundHeaders) {
    return data[0];
  } else {
    return genericHeader(data[0].length);
  }
};

var groupCols = function(data) {
  var labels = labelCols(data);
  var groups = [[], []]; // First is number, second is string.
  for (var i = 0; i < labels.length; i++) {
    if (labels[i] == 'number') {
      groups[0].push(i);
    } else {
      groups[1].push(i);
    }
  }
  return groups;
};

/**
 * Labels columns as number or string columns.
 */
var labelCols = function(data) {
  if (data.length == 0) { return []; }
  var labelVotes = [];
  for (var j = 0; j < data[0].length; j++) {
    labelVotes.push([0, 0]);  // First is number, second is string.
  }

  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      if (typeof data[i][j] == 'number') {
        labelVotes[j][0]++;
      } else {
        labelVotes[j][1]++;
      }
    }
  }

  var labels = [];
  for (var j = 0; j < labelVotes.length; j++) {
    if (labelVotes[j][0] > labelVotes[j][1]) {
      labels.push('number');
    } else {
      labels.push('string');
    }
  }
  return labels;
};
