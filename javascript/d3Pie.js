var w = 500,                        //width
h = 500,                            //height
r = 200,                            //radius
//color = d3.scale.category20c();     //builtin range of colors

data = [{"label":"Maths", "value":20}, 
        {"label":"Language", "value":20}, 
        {"label":"English", "value":30},
        {"label":"Botany", "value":15},
        {"label":"Zoology", "value":20},
        {"label":"Social", "value":10},
        {"label":"Physics", "value":25},
        {"label":"Chemistry", "value":30}];

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#FE642E", "#82FA58", "#a05d56", "#d0743c", "#ff8c00"]);
var svg = d3.select("#pie")
    .append("svg")              //create the SVG element inside the specified id
    .data([data])                   //associate our data with the document
    .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
    .attr("height", h)
    .append("g")                //make a group to hold our pie chart
    .attr("transform", "translate(" + 250 + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
    .outerRadius(r)
    .innerRadius(0);                //If inner radius is given as 0, it is pie chart.  Value greater than 1 will make it a donut chart

var pie = d3.layout.pie()           //this will create arc data for us given a list of values
    .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

var arcs = svg.selectAll(".arc")     //this selects all <g> elements with class slice (there aren't any yet)
    .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
    .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection.                                      The result is creating a <g> for every object in the data array
    .append("g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
     .attr("class", "arc");    //allow us to style things in the slices (like text)

    arcs.append("path")
            .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
            .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("text")                                     //add a label to each slice
            .attr("transform", function(d) {                    //set the label's origin to the center of the arc
            //we have to make sure to set these before calling arc.centroid
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function(d, i) { return data[i].label; });        //get the label from our original data array