process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;
var output;

var noOfConstituencies = 0;
var congressContituencies = [];
var bjpConstituencies = [];
var belts = []

process.stdin.on('data', function(data) {
  input_stdin += data;
});


process.stdin.on('end', function() {
  input_stdin_array = input_stdin.split("\r\n");
  noOfConstituencies = Number(input_stdin_array[0]);

  for (var i = 1; i <= noOfConstituencies; i++) {
    var temp = input_stdin_array[i].split(" ");
    if (temp[2] == "C") {
      congressContituencies.push({
        x: Number(temp[0]),
        y: Number(temp[1])
      })
    } else {
      bjpConstituencies.push({
        x: Number(temp[0]),
        y: Number(temp[1])
      })
    }
  }
  ////a // console.log(congressContituencies, bjpConstituencies)
  //Write code here
  getAllWithSameX();
  getAllWithSameY();

  belts.forEach(function(value, index, array, thisArg) {
    //a // console.log(value)
  });

  strongestBelt()

  function strongestBelt() {
    var noOfStrongestConsts = Math.max.apply(Math, belts.map(function(o) {
      return o.total;
    }));
    // console.log("noOfStrongestConsts", noOfStrongestConsts);

    var filteredbelts = belts.filter(function(value, index, array, thisArg) {
      return value.total == noOfStrongestConsts;
    });
    // console.log("filteredbelts", filteredbelts);

    var newBelts = [];
    theArea = 0;
    // console.log("filteredbeltsLength", filteredbelts.length);
    for (var d = 0; d < filteredbelts.length; d++) {
      var a = Object.assign({}, filteredbelts[d]);
      var b = Object.assign({}, filteredbelts[d]);
      var c = Object.assign({}, filteredbelts[d]);
      //// console.log(a, b, c)
      var minX = b.consts.reduce(function(prev, current) {
        return (prev.x < current.x) ? prev : current
      }) //returns object
      var maxX = b.consts.reduce(function(prev, current) {
        return (prev.x > current.x) ? prev : current
      })
      var l = maxX.x - minX.x;
      // console.log("length", l);

      var minY = a.consts.reduce(function(prev, current) {
        return (prev.y < current.y) ? prev : current
      }) //returns object
      var maxY = a.consts.reduce(function(prev, current) {
        return (prev.y > current.y) ? prev : current
      })

      var br = maxY.y - minY.y;
      // console.log("breadth", br);

      var area = l * br;
      c.area = area;
      newBelts.push(c);
    }

    // console.log("newBelts", newBelts);
    var theBelts = newBelts.slice();
    var minArea1 = newBelts.reduce(function(prev, current) {
      return (prev.area < current.area) ? prev : current
    }, 0) //returns object
    // console.log(minArea1)

    theBelt = minArea1;
    //a // console.log("theBelt", theBelt);
    if (theBelt) {
      output1 = theBelt.total;
      output2 = theBelt.area;
    } else {
      output1 = 1;
      output2 = 0;
    }
  }

  function getAllWithSameX() {
    for (var j = 0; j < congressContituencies.length; j++) {
      var startAt = congressContituencies[j];
      var totalTemp = 1;
      var constsTemp = [startAt];
      for (var k = j + 1; k < congressContituencies.length; k++) {
        if (startAt.x == congressContituencies[k].x) {
          var bjpPresent = false;
          for (var t = startAt.x = 1; t < congressContituencies[k].x; t++) {
            if (bjpConstituencies)
              if (bjpConstituencies.filter(function(e) {
                  return e.x == t
                }).length > 0) {
                /* vendors contains the element we're looking for */
                bjpPresent = true;
              }
          }
          if (!bjpPresent) {
            totalTemp++;
            constsTemp.push(congressContituencies[k]);
            //a // console.log(constsTemp)
            continue;
          }
        }
      }
      belts.push({
        total: totalTemp,
        consts: constsTemp
      })
    }
  }


  function getAllWithSameY() {
    for (var j = 0; j < congressContituencies.length; j++) {
      var startAt = congressContituencies[j];
      var totalTemp = 1;
      var constsTemp = [startAt]
      for (var k = j + 1; k < congressContituencies.length; k++) {
        if (startAt.y == congressContituencies[k].y) {

          var bjpPresent = false;
          for (var t = startAt.y = 1; t < congressContituencies[k].y; t++) {
            if (bjpConstituencies)
              if (bjpConstituencies.filter(function(e) {
                  return e.y == t
                }).length > 0) {
                /* vendors contains the element we're looking for */
                bjpPresent = true;
              }
          }


          if (!bjpPresent) {
            totalTemp++;
            constsTemp.push(congressContituencies[k])
            continue;
          }
        }
      }
      belts.push({
        total: totalTemp,
        consts: constsTemp
      })
    }
  }

  process.stdout.write("" + output1 + "\r\n");
  process.stdout.write("" + output2 + "");
});