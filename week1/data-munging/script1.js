(function(d3){
    d3.json('./data/output/crimeAssaultJson.json', function(resp){
        const data1 = [];
        const data2 = [];

        for (let key in resp) {
            if (resp.hasOwnProperty(key)) {
                let obj1 = {
                    "year": key,
                    "crime": resp[key].arrested
                };
                let obj2 = {
                    "year": key,
                    "crime": resp[key].notArrested
                };
                data1.push(obj1);
                data2.push(obj2);
            }
        }

        const vis = d3.select("#visualisation"),
            WIDTH = 1000,
            HEIGHT = 500,
            MARGINS = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 50
            },

            xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2001, 2018]),

            yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([1000, 25000]),


            xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom"),

            yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        vis.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
            .call(xAxis);

        vis.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (MARGINS.left) + ",0)")
            .call(yAxis);

        const lineGen = d3.svg.line()
            .x(function (d) {
                return xScale(d.year);
            })
            .y(function (d) {
                return yScale(d.crime);
            })
            .interpolate("basis");

        vis.append('svg:path')
            .attr('d', lineGen(data1))
            .attr('stroke', 'green')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

        vis.append('svg:path')
            .attr('d', lineGen(data2))
            .attr('stroke', 'blue')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

    });

})(d3);