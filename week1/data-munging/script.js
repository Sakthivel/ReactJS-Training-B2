var finalArry = []; // ajax calls 
$.ajax({
        type: 'GET',
        url: './data/output/crimeJson.json'
    })
    .done(function (data) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                let obj = {
                    "year": key,
                    "redDelicious": data[key].theftOver500,
                    "mcintosh": data[key].theftUnder500
                };
                finalArry.push(obj);
            }
        }
        loadChart(finalArry);
    });
// end

function loadChart(data) {
    var margin = {
        top: 20,
        right: 160,
        bottom: 35,
        left: 30
    };

    var width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parse = d3.time.format("%Y").parse;


    // Transpose the data into layers
    var dataset = d3.layout.stack()(["redDelicious", "mcintosh"].map(function (fruit) {
        return data.map(function (d) {
            return {
                x: parse(d.year),
                y: +d[fruit]
            };
        });
    }));


    // Set x, y and colors
    var x = d3.scale.ordinal()
        .domain(dataset[0].map(function (d) {
            return d.x;
        }))
        .rangeRoundBands([10, width - 10], 0.02);

    var y = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d3.max(d, function (d) {
                return d.y0 + d.y;
            });
        })])
        .range([height, 0]);

    var colors = ["b33040", "#d25c4d"];


    // Define and draw axes
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
        .tickSize(-width, 0, 0)
        .tickFormat(function (d) {
            return d
        });

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y"));

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


    // Create groups for each series, rects for each segment 
    var groups = svg.selectAll("g.cost")
        .data(dataset)
        .enter().append("g")
        .attr("class", "cost")
        .style("fill", function (d, i) {
            return colors[i];
        });

    var rect = groups.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("y", function (d) {
            return y(d.y0 + d.y);
        })
        .attr("height", function (d) {
            return y(d.y0) - y(d.y0 + d.y);
        })
        .attr("width", x.rangeBand());


    // Draw legend
    var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(30," + i * 19 + ")";
        });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d, i) {
            return colors.slice().reverse()[i];
        });

    legend.append("text")
        .attr("x", width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function (d, i) {
            switch (i) {
                case 0:
                    return "Theft Under $500";
                case 1:
                    return "Theft Over $500";
            }
        });
}