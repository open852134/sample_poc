var data = [{
    title: 'A',
    count: 100
  },
  {
    title: 'BB',
    count: 300
  },
  {
    title: 'C',
    count: 170
  },
  {
    title: 'D',
    count: 220
  },
  {
    title: 'E',
    count: 120
  },
];


/* 基本參數定義 */
var margin = {
  top: 15,
  right: 20,
  bottom: 15,
  left: 20
};
var width = $('#svg').parent().width() - 30,
  height = $('#svg').parent().height() - 30;



//定義縮放比例
var scaleX = d3.scalePoint()
  .padding(1)
  .domain(
    d3.map(data, function (it) {
      return it.title;
    }).keys()
  )
  .range([0, width])

var scaleY = d3.scaleLinear()
  .domain([0, d3.max(data, (function (d) {
    return d.count;
  }))])
  .range([height - 50, 0])

//定義資料顯示
var axisX = d3.axisBottom(scaleX)

var axisY = d3.axisLeft(scaleY).ticks(5)





/* 選取物件 */
var s = d3.select('#svg');

/* 選取tooltip物件 */
var div = d3.select(".show-block")
  .attr("class", "tooltip")
  .style("opacity", 0);


/*  繪製SVG */
s.attrs({
  'width': width,
  'height': height,
})



var g = s.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


g.selectAll('rect.bar2')
  .data(data)
  .enter()
  .append('rect')
  .attrs({
    'fill': '#00778B',
    'height': function (d) {
      return (height - 50) - scaleY(d.count);
    },
    'width': 30,
    'x': function (d) {
      return scaleX(d.title) + 5
    },
    'y': function (d) {
      return scaleY(d.count);
    }
  })

g.append('g')
  .call(axisX)
  .attrs({
    transform: `translate(${margin.left},${height - 50})`
  })

g.append('g')
  .call(axisY)
  .attrs({
    transform: `translate(${margin.left},0)`
  })