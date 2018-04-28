import React from 'react';
import axios from 'axios';
import c3 from 'c3';
import jStat from 'jStat';
const d3 = require('d3');

function Random_normal_Dist(mean, sd, min_x, max_x, weight) {
    let data = [];
    for (var i = (min_x === undefined? (mean - 4 * sd) : 0); i < (max_x === undefined? (mean + 4 * sd): max_x); i += 0.01) {
        let q = i
        let p = weight * jStat.normal.pdf(i, mean, sd);
        let arr = {
            "q": q,
            "p": p
        }
        data.push(arr);
    };
    return data;
}

function plot_gmm_data(means, sds, weights, X, hardClusters) {
    let normals = means
        .map((m, i) => (Random_normal_Dist(m, sds[i], 0, 10, weights[i])));
    let data = X.map((x_i, i) => ({
        time: x_i,
        color: hardClusters[i]
    }))
    plotNormals(normals, data)
}

function plotNormals(normals, data) {
    console.log('PLOTTING', normals, data);
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    min_d = d3.min(normals.map(arr => d3.min(arr, d => d.q)));
    max_d = d3.max(normals.map(arr => d3.max(arr, d => d.q)));
    max_p = d3.max(normals.map(arr => d3.max(arr, d => d.p)));

    var stack = d3.stack().keys(d3.range(normals.length)).value((d, key) => d[key].p)
    layers0 = stack(d3.transpose(normals));

    var x = d3.scaleLinear()
        .domain([min_d, max_d]).nice()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .domain([0, max_p])
        .range([height, 0]);

    var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var z = d3.interpolateCool;

    var stack_area = d3.area()
        .x((d, i) => x(i / 100))
        .y0(d => y(d[1]))
        .y1(d => y(d[0]));

    var area = d3.area()
        .x((d, i) => x(d.q))
        .y0(y(0))
        .y1(d => y(d.p));

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll("path")
        .data(layers0)
        .enter().append("path")
        .attr("d", stack_area)
        .attr("fill", (d, i) => colorScale(i));

    var gX = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var gY = svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    var line = d3.line()
        .x(function (d) { return x(d.q); })
        .y(function (d) { return y(d.p); });

    normals.forEach((arr, i) => {
        svg.append("path")
            .datum(arr)
            .attr("fill", "none")
            .attr("d", line)
            .attr('stroke', 'gray')
            .attr('stroke-width', 2);
    });

    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", d => x(d.time))
        .attr("cy", d => y(0))
        .style('fill', d => colorScale(d.color))
        .style('opacity', 0.5)
        .style('stroke', 'black');
    svg.selectAll('dot')
        .data(data)
        .enter().append('line')
        .attr('x1', d => x(d.time))
        .attr('y1', y(1))
        .attr('x2', d => x(d.time))
        .attr('y2', y(1.1))
        .style('stroke', d => colorScale(d.color))
        .style('stroke-width', 2);
}

class Visualization extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  componentDidMount() {
    axios.get('http:/localhost:3000/vis-data')
    .then(res => {
        console.log('got data', res);
        let data = JSON.parse(res.data.toString());
        plot_gmm_data(data[0], data[1], data[2], data[3], data[4]);
    })
    .catch(err => {
        console.log('error getting data', err);
    });
  }

  render() {
    return (
        <svg width="960" height="500"/>
    );
  }

}
export default Visualization;

