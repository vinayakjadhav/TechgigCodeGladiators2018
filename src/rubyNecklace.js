process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;
var output = 0;
var outputb = 0;
var outputr = 0;

// var myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);

process.stdin.on('data', function(data) {
  input_stdin += data;
});


process.stdin.on('end', function() {
  input_stdin_array = input_stdin.split("\r\n");

  console.log(input_stdin_array)
  var b = input_stdin_array[0];
  var r = input_stdin_array[1];
  var y = input_stdin_array[2];
  var g = input_stdin_array[3];

  //Write code here
  outputb = Number(b) + 1 + Number(g);

  if (Math.min((Number(r) - 1), (Number(y) - 1)) > 0)
    outputb += 2 * Math.min((Number(r) - 1), (Number(y) - 1));

  if ((Number(r) - 1) < Number(y))
    outputb = outputb + 1;


  outputr = 1 + Number(g) + 1 + Number(b);

  if (Math.min((Number(r) - 1), (Number(y) - 1)) > 0)
    outputr += 2 * Math.min((Number(r) - 1), (Number(y) - 1));

  if (Number(r) > Number(y))
    outputr = outputr + 1;

  if (outputb > outputr) {
    output = outputb;
  } else {
    output = outputr;
  }

  process.stdout.write("" + output + "");
});