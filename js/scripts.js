 var price=[];
 var capacity=[];
 var restaurant=[];
 var pAvg=0.0;
 var cAvg=0;
 var nCount=0;
 var yCount=0;
 var naCount=0;
 var conutry=[];
 var scatterData=[];
 var barData=[];

 var latlong = {};

			latlong["BE"] = {
				"latitude": 50.8333,
				"longitude": 4
			};
			
			latlong["CH"] = {
				"latitude": 47,
				"longitude": 8
			};
			latlong["CN"] = {
				"latitude": 35,
				"longitude": 105
			};
	
			latlong["DE"] = {
				"latitude": 51,
				"longitude": 9
			};
		
			latlong["DK"] = {
				"latitude": 56,
				"longitude": 10
			};
			
			latlong["ES"] = {
				"latitude": 40,
				"longitude": -4
			};
			
			latlong["FR"] = {
				"latitude": 46,
				"longitude": 2
			};
			latlong["MO"] = {
				"latitude": 43,
				"longitude": 7
			};
			latlong["GB"] = {
				"latitude": 54,
				"longitude": -2
			};
			
			latlong["IT"] = {
				"latitude": 42.8333,
				"longitude": 12.8333
			};
			latlong["JP"] = {
				"latitude": 36,
				"longitude": 138
			};
			
			latlong["KR"] = {
				"latitude": 37,
				"longitude": 127.5
			};
			
			latlong["NL"] = {
				"latitude": 52.5,
				"longitude": 5.75
			};
			latlong["NO"] = {
				"latitude": 62,
				"longitude": 10
			};
			
			latlong["SG"] = {
				"latitude": 1.3667,
				"longitude": 103.8
			};
			
			latlong["US"] = {
				"latitude": 38,
				"longitude": -97
			};
			
			var mapData = [{
				"code": "BE",
				"name": "Belgium",
				"value": 2,
				"color": "#eea638"
			}, 
			{
				"code": "CN",
				"name": "China",
				"value": 10,
				"color": "#eea638"
			},
			
			 {
				"code": "DK",
				"name": "Denmark",
				"value": 1,
				"color": "#eea638"
			}, 
			{
				"code": "NL",
				"name": "Netherlands",
				"value": 2,
				"color": "#eea638"
			},
			 {
				"code": "FR",
				"name": "France",
				"value": 26,
				"color": "#eea638"
			}, 
			{
				"code": "MO",
				"name": "Monaco",
				"value": 1,
				"color": "#eea638"
			}, 
			{
				"code": "DE",
				"name": "Germany",
				"value": 10,
				"color": "#eea638"
			},
			{
				"code": "IT",
				"name": "Italy",
				"value": 8,
				"color": "#eea638"
			}, 
			{
				"code": "JP",
				"name": "Japan",
				"value": 31,
				"color": "#eea638"
			}, 
			{
				"code": "KR",
				"name": "Korea, Dem. Rep.",
				"value": 2,
				"color": "#eea638"
			}, 
			{
				"code": "NO",
				"name": "Norway",
				"value": 1,
				"color": "#eea638"
			}, 
			{
				"code": "SG",
				"name": "Singapore",
				"value": 1,
				"color": "#eea638"
			}, 
			 {
				"code": "ES",
				"name": "Spain",
				"value": 9,
				"color": "#eea638"
			}, 
			 {
				"code": "CH",
				"name": "Switzerland",
				"value": 3,
				"color": "#eea638"
			}, 
			 {
				"code": "GB",
				"name": "United Kingdom",
				"value": 5,
				"color": "#eea638"
			},
			 {
				"code": "US",
				"name": "United States",
				"value": 14,
				"color": "#eea638"
			}];

			var map;
			var minBulletSize = 20;
			var maxBulletSize = 60;
			var min = Infinity;
			var max = -Infinity;

			AmCharts.theme = AmCharts.themes.black;

			// get min and max values
			for (var i = 0; i < mapData.length; i++) {
				var value = mapData[i].value;
				if (value < min) {
					min = value;
				}
				if (value > max) {
					max = value;
				}
			}
			AmCharts.ready(function() {
				map = new AmCharts.AmMap();
				map.projection = "winkel3";

				map.addTitle("Michelin 3-Star Restaurants Location", 14);
				map.addTitle("source: Gapminder", 11);
				map.areasSettings = {
					unlistedAreasColor: "#FFFFFF",
					unlistedAreasAlpha: 0.1
				};
				map.imagesSettings = {
					balloonText: "<span style='font-size:14px;'><b>[[title]]</b>: [[value]]</span>",
					alpha: 0.6
				}

				var dataProvider = {
					mapVar: AmCharts.maps.worldLow,
					images: []
				}

				// create circle for each country

				// it's better to use circle square to show difference between values, not a radius
				var maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
				var minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

				// create circle for each country
				for (var i = 0; i < mapData.length; i++) {
					var dataItem = mapData[i];
					var value = dataItem.value;
					// calculate size of a bubble
					var square = (value - min) / (max - min) * (maxSquare - minSquare) + minSquare;
					if (square < minSquare) {
						square = minSquare;
					}
					var size = Math.sqrt(square / (Math.PI * 2));
					var id = dataItem.code;

					dataProvider.images.push({
						type: "circle",
						width: size,
						height: size,
						color: dataItem.color,
						longitude: latlong[id].longitude,
						latitude: latlong[id].latitude,
						title: dataItem.name,
						value: value
					});
					console.log(id);
				}



				// the following code uses circle radius to show the difference
				/*
				for (var i = 0; i < mapData.length; i++) {
					var dataItem = mapData[i];
					var value = dataItem.value;
					// calculate size of a bubble
					var size = (value - min) / (max - min) * (maxBulletSize - minBulletSize) + minBulletSize;
					if (size < minBulletSize) {
						size = minBulletSize;
					}
					var id = dataItem.code;

					dataProvider.images.push({
						type: "circle",
						width: size,
						height: size,
						color: dataItem.color,
						longitude: latlong[id].longitude,
						latitude: latlong[id].latitude,
						title: dataItem.name,
						value: value
					});
				}*/



				map.dataProvider = dataProvider;

				map.write("mapdiv");
			});


$(document).ready(function(){
	loadData();
	 // $('#noRes').DataTable({
  //   	 "ajax": 'noR.txt'
  //   });
    $('#myTable').DataTable({
    	 "ajax": 'data.txt'
    });

});

function loadData(){
    $.ajax({
            type:"GET",
            url:"dataDic.json",
            dataType:"json",
            success: parseData
});


}

function parseData(data){
	console.log(data);



	for (var i = 0, len = data.length; i < len; ++i) {
            //sets data to arrays for charts
            price.push(parseInt(data[i]["average price"]));
            capacity.push(parseInt(data[i]["eating capacity"]));
            restaurant.push(data[i]["restaurant"]);

            // console.log(balance);
            var tempCountry=data[i]["location"].split(", ");
            tempCountry=tempCountry[tempCountry.length-1]

            if(!conutry.includes(tempCountry)){
            	conutry.push(tempCountry);
            }

            if (data[i]["reservation required"] == "N") {
                nCount++;
            }else if (data[i]["reservation required"] == "Y") {
                yCount++;
            }else{
            	naCount++;
            }


     };
     
     for(var i=0;i<conutry.length;i++){
     	var tempX=[''+conutry[i].toLowerCase().replace(" ","")+'_x'];
        var tempY=[''+conutry[i].toLowerCase().replace(" ","")+''];
        var bar=[conutry[i].toLowerCase().replace(" ","")]
     	for (var j = 0, len = data.length; j < len; j++) {
     		var tempCountry=data[j]["location"].split(", ");
            tempCountry=tempCountry[tempCountry.length-1]
            	//x is capacity, y is price 	
            if(tempCountry==conutry[i]){
            	tempX.push(parseInt(data[j]["average price"]));
            	tempY.push(parseInt(data[j]["seating capacity"]));
            }
     	};
	     scatterData.push(tempX);
	     scatterData.push(tempY);
 	}
     console.log(scatterData);


     var pSum=0;
     for(var i=0;i<price.length;i++){
     	pSum+=price[i];
     	// console.log(restaurant[i],pSum);
     }
     // var pSum = price.reduce((previous, current) => current += previous);
     // var pSum=;
     pAvg = pSum / price.length;
     // console.log(pAvg,price.length);

     // console.log(nCount);
     // console.log(yCount);
     buildChart();
}



function buildChart(){
// var chart = c3.generate({
//     bindto: '#price-chart',
//     data: {
//         json: {
//             Price:price,
//             Capacity:capacity
//             // Restaurant: restaurant

//         }
//     }
// });

var piechart = c3.generate({
    bindto: '#pie-chart',
    data: {
        json: {
            "Reservation Not Required": nCount,
            "Reservation Required":yCount,
            "Reservation Advisable": naCount
        },

        type:'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    }
});

var scatter = c3.generate({
	bindto:"#scatter",
    data: {
        xs: {
            unitedkingdom: 'unitedkingdom_x',
            germany: 'germany_x',
            italy: 'italy_x',
            japan: 'japan_x',
            // monaco: 'monaco_x',
            // netherlands: 'netherlands_x',
            // norway: 'norway_x',
            // singapore: 'singapore_x',
            france: 'france_x',
            // denmark: 'denmark_x',
            china: 'china_x',
            // belgium: 'belgium_x',
            // southkorea: 'southkorea_x',
            spain: 'spain_x',
            // switzerland: 'switzerland_x',
            unitedstates: 'unitedstates_x',
        },
        columns: [
        scatterData[0],
        scatterData[1],
        scatterData[2],
        scatterData[3],
        scatterData[4],
        scatterData[5],
        scatterData[6],
        scatterData[7],
        scatterData[16],
        scatterData[17],
        scatterData[20],
        scatterData[21],
        scatterData[26],
        scatterData[27],
        scatterData[30],
        scatterData[31]
        ],
        type: 'scatter'
    },
    point: {
      r: 5
    },
    grid:{
    	x: {
    show: true
  }
    },
    axis: {
        x: {
            label: 'Average Price in USD',
            tick: {
                fit: false
            }
        },
        y: {
            label: 'Seating Capacity'
        }
    }
});

var bar = c3.generate({
	bindto:"#bar",
    data: {
        columns: [
            ['Number of Restaurants', 12, 33, 50, 23, 5, 2, 1]
        ],
        type: 'bar'
    },
    axis: {
        x: {
            type: 'category',
            categories: ['$49 ~ $123', '$123 ~ $197', '$197 ~ $271', '$271 ~ $345', '$345 ~ $419', '$419 ~ $493', '$491 ~ $567']
        }
    },
    bar: {
        width: {
            ratio: 0.9 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    }


});

var barC = c3.generate({
	bindto:"#barC",
    data: {
        columns: [
            ['Number of Restaurants', 50, 47, 18, 3, 7, 0, 1]
        ],
        type: 'bar'
    },
    axis: {
        x: {
            type: 'category',
            categories: ['6 ~ 31 Seats', '31 ~ 56 Seats', '56 ~ 81 Seats', '81 ~ 106 Seats', '106 ~ 131 Seats', '131 ~ 156 Seats', '156 ~ 182 Seats']
        }
    },
    bar: {
        width: {
            ratio: 0.9 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    }


});
	}