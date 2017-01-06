var data = [4, 8, 15, 16, 23, 42];
      var x = d3.scale.linear()
          .domain([0, d3.max(data)])
          .range([0, 420]);

      d3.select("#barh")
          .selectAll("div")
        .data(data)
          .enter().append("div")
          .attr("class", "horbar")
          .style("width", function(d) { return x(d) + "px"; })
          .text(function(d) { return d; });