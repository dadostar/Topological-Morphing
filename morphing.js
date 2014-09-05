



d3.json("data/skips.json", function(err, data) {




    var svg = d3.select("body").append("svg")
        .attr("width", 1200)
        .attr("height", 1200);

    var edges = svg.selectAll(".edge")
        .data(data.edges).enter().append("svg:path")
        .classed("edge", true)
        .attr("d", function(datum) { return datum[0].d; })
        .style("fill-opacity", 0)
        .style("stroke", "Black")
        .style('stroke-width', '3px');

    var nodes = svg.selectAll(".node")
        .data(data.nodes).enter().append("svg:circle")
        .classed("node", true)
        .attr("r", 15)
        .attr("cx", function(d) { return d[0].x; })
        .attr("cy", function(d) { return d[0].y; });

    var anim = function (index, duration) {
        edges.transition()
            .duration(duration)
            .attr("d", function(datum) { return datum[index].d; })
            .each("end",function() {d3.select(this).style("stroke","Black")});



        nodes.transition()
            .duration(duration)
            .attr("cx", function(d) { return d[index].x; })
            .attr("cy", function(d) { return d[index].y; })
            .each("end",function() {d3.select(this).style("fill","Black")});

        if(index < data.ops) {
            setTimeout(function () {
                animate(index + 1, duration);
            }, 3000);
        }

    }


    var animate = function(index, duration) {

        //.attr("d", function(datum) { return datum[index].d; })

        console.log(index)

        edges.style("stroke",function(datum){return datum[index].color});
        nodes.style("fill",function(d){return d[index].color;})


        setTimeout(function() {
            anim(index,duration);
        }, 1500)




    };


    d3.select("#btplay")
        .on("click", function() {
            setTimeout(function() {
                animate(1, 2000);
            }, 500);
            d3.select("#btplay")
                .attr("disabled", true);
    })









});