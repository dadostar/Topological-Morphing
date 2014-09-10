



d3.json("data/skips.json", function(err, data) {


var i = 0;

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
        .data(data.nodes)
        .enter().append("g").attr("class", "node")
        .attr("transform", function(d) { return "translate("+d[0].x+","+d[0].y+")"; })


    nodes.append("circle")
        .attr("class", "node")
        .attr("r", 20);

    nodes.append("text")
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d[0].name;
        }).style("fill","White");



    var anim = function (index, duration) {
        edges.transition()
            .duration(duration)
            .attr("d", function(datum) { return datum[index].d; })
            .each("end",function() {d3.select(this).style("stroke","Black")});



        nodes.transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate("+d[index].x+","+d[index].y+")"; })
            .each("end",function() {d3.select(this).style("fill","Black")});

        if(index < data.ops) {
            setTimeout(function () {
                animate(index + 1, duration);
            }, 3000);
        }

    }


    var animate = function(index, duration) {

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