(function(d3){

    const margin = {
        top: 20,
        right: 160,
        bottom: 35,
        left: 30
    };

    const width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const parse = d3.time.format("%Y").parse;

    d3.json('./data/output/crimeJson.json', function(resp){
        const data = [];
        for (let key in resp) {
            if (resp.hasOwnProperty(key)) {
                let obj = {
                    "year": key,
                    "redDelicious": resp[key].theftOver500,
                    "mcintosh": resp[key].theftUnder500
                };
                data.push(obj);
            }
        }

        // Transpose the data into layers
        const dataset = d3.layout.stack()(["redDelicious", "mcintosh"].map(function (fruit) {
            return data.map(function (d) {
                return {
                    x: parse(d.year),
                    y: +d[fruit]
                };
            });
        }));


        // Set x, y and colors
        const x = d3.scale.ordinal()
            .domain(dataset[0].map(function (d) {
                return d.x;
            }))
            .rangeRoundBands([10, width - 10], 0.02);

        const y = d3.scale.linear()
            .domain([0, d3.max(dataset, function (d) {
                return d3.max(d, function (d) {
                    return d.y0 + d.y;
                });
            })])
            .range([height, 0]);

        const colors = ["b33040", "#d25c4d"];


        // Define and draw axes
        const yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5)
            .tickSize(-width, 0, 0)
            .tickFormat(function (d) {
                return d
            });

        const xAxis = d3.svg.axis()
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
        const groups = svg.selectAll("g.cost")
            .data(dataset)
            .enter().append("g")
            .attr("class", "cost")
            .style("fill", function (d, i) {
                return colors[i];
            });

        let rect = groups.selectAll("rect")
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
        let legend = svg.selectAll(".legend")
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
    });
})(d3);