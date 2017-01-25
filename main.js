var readData = function() {
  var rawData = $('#input').val();
  var rows = rawData.split('\n');

  var data = [];
  var longestRow = 0;
  for (var i = 0; i < rows.length; i++) {
    data.push(rows[i].split('\t'));
    longestRow = Math.max(longestRow, data[i].length);
  }

  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      if (!isNaN(parseInt(data[i][j]))) {
        data[i][j] = parseInt(data[i][j]);
      }
    }
    while (data[i].length < longestRow) {
      data[i].push('');
    }
  }
  return data;
};

var outputData = function(data) {
  var table = $('#outputtable');
  table.empty();

  for (var i = 0; i < data.length; i++) {
    var row = $('<tr/>');
    for (var j = 0; j < data[i].length; j++) {
      row.append('<td>' + data[i][j] + '</td>');
    }
    table.append(row);
  }
};

var link = function(buttonName, func, opt_param) {
  $('#' + buttonName + 'button').click(function() {
    outputData(func(readData(), opt_param));
  });
};

$(function() {
  // Fill in test data.
  var data = "String\tNumber1\tNumber2\nTAPE\t1\t3\nBEAT\t2\t3\nSASS\t3\t4\nSENT\t4\t1";
  $('#input').val(data);
  $('#rotateby').val(13);

  link('test', function(x) {return x;});
  link('index', crossIndex);
  link('rotate', rotateLetters, $('#rotateby').val());
});
