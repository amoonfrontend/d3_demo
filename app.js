// import d3 from 'd3';
import Canvas from './src/spiderWeb';
import $ from 'jquery';

var canvas = new Canvas('spider', 600, 600);
canvas.createBranch();
canvas.createCenter();

var data = [
  {name: '张1'},
  {name: '王2'},
  {name: '李3'},
  {name: '张4'},
  {name: '王5'},
  {name: '李6'},
  {name: '张7'},
  {name: '王8'},
  {name: '李9'},
  {name: '张10'},
  {name: '王11'},
  {name: '李12'},
  {name: '张13'},
  {name: '王14'},
  {name: '李15'},
  {name: '张16'},
  {name: '王17'},
  {name: '李18'},
  {name: '张19'},
  {name: '王20'},
  {name: '李21'},
  {name: '张22'},
  {name: '王23'},
  {name: '李24'},
  {name: '张25'},
  {name: '王26'},
  {name: '李27'},
  {name: '李28'},
  {name: '张29'},
  {name: '王30'},
  {name: '张31'},
  {name: '王32'},
  {name: '李33'},
  {name: '张34'},
  {name: '王35'},
  {name: '李36'},
  {name: '张37'},
  {name: '王38'},
  {name: '李39'}
];

canvas.dataLoader(data);

$('#plus-node').unbind().bind('click', () => {
  canvas.addNode();
});
$('#minus-node').unbind().bind('click', () => {
  canvas.removeNode();
});
// class SpiderTier {
//   constructor (canvas, r, segments){
//     this.canvas = canvas;
//     this.r = r;
//     this.segments = segments;
//     this.points = [];
//     this.currentPoint = undefined;
//     this.firstPoint = undefined;
//   }

//   nextNode () {
//     let theta = ((2 * Math.PI) / this.segments) * this.points.length;
//     let point = {
//       x: this.r * Math.cos(theta),
//       y: this.r * Math.sin(theta),
//     };

//     var bundle = this.canvas.bundle;
//     point.point = bundle.append('circle')
//       .attr('cx', point.x)
//       .attr('cy', point.y)
//       .attr('r', 5);

//     if (this.currentPoint) {
//       point.prevPoint = this.currentPoint;
//       this.connectNodes(point);
//     } else {
//       this.firstPoint = point;
//     }
//     this.points.push(point);
//     this.currentPoint = point;

//     if (this.fullNode()){
//       this.firstPoint.prevPoint = this.currentPoint;
//       this.connectNodes(this.firstPoint);
//     }

//   }

//   fullNode () {
//     return this.points.length >= this.segments;
//   }

//   connectNodes (point) {
//     let bundle = this.canvas.bundle;
//     point.path = bundle.append('path')
//         .attr('d', 'M ' + point.x + ' ' + point.y + ' L ' + point.prevPoint.x + ' ' + point.prevPoint.y)
//         .style('stroke', '#000');
//   }
// }

// class SpiderBranch {
//   constructor (canvas, r, segments) {
//     this.canvas = canvas;
//     this.r = r;
//     this.segments = segments;
//     this.branchs = [];
//   }

//   createBranch () {
//     var bundle = this.canvas.bundle;
//     for (let i = 0; i < this.segments; i ++) {
//       let theta = ((2 * Math.PI) / this.segments) * i;
//       let point = {
//         x: this.r * Math.cos(theta),
//         y: this.r * Math.sin(theta),
//       };
//       let branch = bundle.append('path')
//         .attr('d', 'M ' + point.x + ' ' + point.y + ' L 0 0')
//         .style('stroke', '#000');
//       this.branchs.push(branch);
//     }
//   }
// }

// class Canvas {
//   constructor (id, width, height){
//     this.tierR = 30;
//     this.r = width / 2;
//     this.segments = 8;
//     this.scene = d3.select('#spider');
//     this.svg = this.scene.append('svg').style('width', width + 'px').style('height', height + 'px').style('color', '#000');
//     this.bundle = this.svg.append('g').attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')');
//     this.tiers = [];
//     this.currentTier = undefined;
//   }

//   createCenter () {
//     this.center = this.bundle.append('circle')
//       .attr('cx', 0)
//       .attr('cy', 0)
//       .attr('r', 5);
//   }

//   createBranch () {
//     this.branch = new SpiderBranch(this, this.r, this.segments);
//     this.branch.createBranch();
//   }

//   addNode () {
//     if (this.currentTier === undefined || this.currentTier.fullNode()) {
//       let tierR = this.tierR * (this.tiers.length + 1);
//       let tier = new SpiderTier(this, tierR, this.segments);
//       this.tiers.push(tier);
//       this.currentTier = tier;
//     }

//     this.currentTier.nextNode();
//   }

//   addNodes (num) {
//     num = num > 1 ? num : 1;
//     for ( let i = 0; i < num; i ++) {
//       this.addNode();
//     }
//   }
// }

// var canvas = new Canvas('spider', 1000, 1000);
// canvas.createCenter();
// canvas.createBranch();
// canvas.addNodes(50);


// // var scene = d3.select('body');

// // let vis = scene.append('svg').style('width', '1000px').style('height', '700px')
// //   .append('g').attr('transform', 'translate(' + $(window).width() / 2 + ', ' + $(window).height() / 2 + ')');


// //   vis.append('circle').attr('cx', () => 0)
// //           .attr('cy', () => 0)
// //           .attr('r', 5)
// //           .attr('class', () => 'level-1' )
// //           .style('color', '#000');

// // function getBranchPoints(segments) {
// //   let points = [];
// //   let r = 500;
// //   for (let i = 0; i < segments; i ++) {
// //     let theta = ((2 * Math.PI) / segments) * i;
// //     let point = {
// //       x: r * Math.cos(theta),
// //       y: r * Math.sin(theta),
// //     };
// //     points.push(point);
// //   }
// //   return points;
// // }

// // var points = getBranchPoints(8);

// // for (let point of points) {
// //   vis.append('path')
// //               .attr('d', 'M ' + point.x + ' ' + point.y + ' L ' + 0 + ' ' + 0)
// //               .style('stroke', '#000');
// // }

// // var tier = new SpiderTier(20, 8);
// // let point = tier.nextNode();

// // vis.append('circle').attr('cx', () => point.x)
// //           .attr('cy', () => point.y)
// //           .attr('r', 5)
// //           .attr('class', () => 'level-1' )
// //           .style('color', '#000');




