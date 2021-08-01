process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

var noOfHills = 0;
var noOfRoads = 0;

var roads = [] //[{  u: 0,  v: 0,  t: 0,  h: 0}


var output = "";

process.stdin.on('data', function(data) {
  input_stdin += data;
});


process.stdin.on('end', function() {
  input_stdin_array = input_stdin.split("\r\n");
  //console.log(input_stdin_array)
  //Write code here
  noOfHills = Number(input_stdin_array[0].split(" ")[0])
  noOfRoads = Number(input_stdin_array[0].split(" ")[1])

  //console.log("noOfHills, noOfRoads", noOfHills, noOfRoads);

  for (var i = 1; i <= noOfRoads; i++) {
    var temps = input_stdin_array[i].split(" ")
    roads.push({
      u: Number(temps[0]),
      v: Number(temps[1]),
      t: Number(temps[2]),
      h: Number(temps[3])
    })
  }

  //console.log(roads);

  var rl1 = getRoadsOfLength1()
  //var rl2 = getRoadsOfLength2()

  //console.log("Roadl1", rl1);

  var margins = [];
  for (var i = 0; i < rl1.length; i++) {
    margin = (rl1[i][0].h + rl1[i][1].h) - (rl1[i][0].t + rl1[i][1].t);
    margins.push(margin)
  }
  //console.log("margin", margins)
  maxMargin1 = Math.max.apply(this, margins);

  //console.log("Bigmargin", maxMargin1);
  margins = []



  var newRoutes = findRoutes();

  var ms = [];
  var bm = 0;
  var hh = 0;
  for (var i = 0; i < newRoutes.length; i++) {
    var a = newRoutes[i];
    //console.log("a", a)
    //  for (var j = 0; j < a.length; j++) {
    marging11 = getMargins(a);
    //console.log("margin11", marging11)
    ms.push((marging11));
    if (bm < marging11) {
      bm = marging11;
      hh = a.length
    }
    //  }

  }
  migMargin1 = Math.max.apply(this, ms);

  //console.log("migMargin1", migMargin1);
  //console.log("hills", hh);

  if (rl1.length > 0) {
    maxMargin = maxMargin1
    output = rl1[0].length + " " + maxMargin;
  } else {

    output = hh + " " + migMargin1;
  }

  function getMargins(rs) {
    var ts = 0;
    var hs = 0;
    for (var i = 0; i < rs.length; i++) {
      ts = ts + rs[i].t;
      hs = hs + rs[i].h;
    }
    return (hs - ts);
  }

  function findRoutes() {
    var Routes = []
    for (var i = 0; i < roads.length; i++) {
      var tempRoad = roads[i];
      var endRouteHills = [];
      var endHill = tempRoad.v;
      for (var j = i + 1; j < roads.length; j++) {
        var item = roads[j];
        //endRouteHill = Object.assign({}, tempRoad);
        //console.log(tempRoad, item)
        if (endHill == item.u) {
          //console.log(" u== v", endHill, item.u)
          endRouteHills.push(item);
          endHill = item.v;
          continue;
        }
      }
      if (endRouteHills && endHill == tempRoad.u) {
        endRouteHills.unshift(tempRoad);
        Routes.push.apply(Routes, [endRouteHills]);
      }

    }
    //console.log("Routes", Routes);

    return Routes;
  }









  function getRoadsOfLength1() {
    var roadsOfLength1 = []
    for (var i = 0; i < roads.length; i++) {
      var tempRoad = roads[i];
      var RoadsOfLength1 = []
      for (var j = i + 1; j < roads.length; j++) {
        var item = roads[j];
        if (tempRoad.u == item.v && tempRoad.v == item.u) {
          RoadsOfLength1 = [tempRoad, item];
          break;;
        }
      }
      if (RoadsOfLength1.length > 0)
        roadsOfLength1.push(RoadsOfLength1)
    }
    return roadsOfLength1;
  }



  //console.log("output")
  process.stdout.write("" + output + "\n");
});