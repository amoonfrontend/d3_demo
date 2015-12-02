import d3 from 'd3';
import d3tip from 'd3-tip';

import Dashednet from './dashednet';

import './spiderWeb.css';

class SpiderTier {
  constructor (canvas, tierNum, segments){
    this.canvas = canvas;
    this.r = this.canvas.info.tierR * tierNum;
    this.tierNum = tierNum;
    this.segments = segments;
    this.points = [];
    this.currentPoint = undefined;
    this.firstPoint = undefined;
  }

  addPoint () {
    let theta = ((2 * Math.PI) / this.segments) * this.points.length;
    let point = {
      x: this.r * Math.cos(theta),
      y: this.r * Math.sin(theta),
    };

    if (this.currentPoint) {
      point.prevPoint = this.currentPoint;
      this.connectNodes(point);
    } else {
      this.firstPoint = point;
    }

    this.points.push(point);
    this.currentPoint = point;

    if (this.fullNode()){
      this.firstPoint.prevPoint = this.currentPoint;
      this.connectNodes(this.firstPoint);
    }

    var bundle = this.canvas.bundle;
    point.point = bundle.append('circle')
      .attr('cx', point.x)
      .attr('cy', point.y)
      .attr('class', 'node-point')
      .attr('r', 5);

    point.number = this.points.length;
    this.addTip(point.point);
    this.clickEventListener(point.point, point);
  }

  addTip(element){
    this.canvas.tip && element.call(this.canvas.tip);
  }

  clickEventListener (element, object) {
    element.on('click', () => {
      console.log('Tier: %s; Point: %s;', this.tierNum, object.number);
      let index = (this.tierNum - 1) * this.segments + object.number;
      var name = 'NULL';
      if (this.canvas.data && index <= this.canvas.data.length) {
        let user = this.canvas.data[index - 1];
        name = user.name;
      }
      this.canvas.tip && () => {
        this.canvas.tip.html('<strong>Name: </strong>' + name + ';<br><strong>Tier: </strong>' + this.tierNum + '; <strong>Point: </strong>' + object.number + ';');
        this.canvas.tip.show();
      }();
    });
  }

  removePoint () {
    if (this.currentPoint.point){
      this.currentPoint.point.remove();
    }
    if (this.currentPoint.path){
      this.currentPoint.path.remove();
    }
    if (this.fullNode()) {
      this.firstPoint.path.remove();
    }

    this.points.pop();
    if (!this.nullNode()) {
      let lastPoint = this.points[this.points.length - 1];
      this.currentPoint = lastPoint;
    }
  }

  fullNode () {
    return this.points.length >= this.segments;
  }

  nullNode () {
    return this.points.length === 0;
  }

  connectNodes (point) {
    let bundle = this.canvas.bundle;
    point.path = bundle.append('path')
        .attr('d', 'M ' + point.x + ' ' + point.y + ' L ' + point.prevPoint.x + ' ' + point.prevPoint.y)
        .style('stroke', 'rgb(142, 135, 135)');
  }
}

class SpiderBranch {
  constructor (canvas, r, segments) {
    this.canvas = canvas;
    this.r = r;
    this.segments = segments;
    this.branchs = [];
  }

  createBranch () {
    var bundle = this.canvas.bundle;
    for (let i = 0; i < this.segments; i ++) {
      let theta = ((2 * Math.PI) / this.segments) * i;
      let point = {
        x: this.r * Math.cos(theta),
        y: this.r * Math.sin(theta),
      };
      let branch = bundle.append('path')
        .attr('d', 'M ' + point.x + ' ' + point.y + ' L 0 0')
        .style('stroke', 'rgb(133, 230, 157)');
      this.branchs.push(branch);
    }
  }
}

class Canvas {
  constructor (id, width, height){
    this.info = {
      width: width,
      height: height,
      tierR: 30,
      r: width /2,
      segments: 12,
      defaultTierR: 30,
      defaultTiers: 10
    };
    this.posititions = this.posititionGenerator();
    this.scene = d3.select('#spider');
    this.svg = this.scene.append('svg').style('width', width + 'px').style('height', height + 'px').style('color', '#000');
    this.bundle = this.svg.append('g').attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')');
    var x = d3.scale.linear()
    .domain([0, width])
    .range([0, width]);

    var y = d3.scale.linear()
    .domain([0, height])
    .range([height, 0]);

    this.bundle.call(d3.behavior.zoom().x(x).y(y).scaleExtent([1, 8]).on('zoom', () => {
    }));
    this.tiers = [];
    this.currentTier = undefined;
    this.createTip();

    this.test();
  }

  test () {
    this.bashednetGenerator();
  }

  /**
   * Get all the posititions for the spider web.
   */
  posititionGenerator () {
    // Default posititions
    var posititions = {
      center : {x: 0, y: 0},
      branchs : [],
      nodes: []
    };


    // Get branch top positition
    for (let i = 0; i < this.info.segments; i ++) {
      let theta = ((2 * Math.PI) / this.info.segments) * i;
      let branchPosi = {
        x: this.info.r * Math.cos(theta),
        y: this.info.r * Math.sin(theta),
      };
      posititions.branchs.push(branchPosi);
    }

    /**
     * Get node from net.
     *
     *   [
     *       [{}, {}, {}, {}, {}, {}, {}, {}]
     *
     *       this.info.defaultTiers
     *
     *       [{}, {}, {}, {}, {}, {}, {}, {}]
     *   ]
     */
    var tiers = ( this.info.r - this.info.defaultTierR) / this.info.tierR;
    for (let i = 0; i < tiers; i ++) {
      var tierPosi = [];
      var tierR = this.info.tierR * i + this.info.defaultTierR;
      for (let j = 0; j < this.info.segments; j ++) {
        let theta = ((2 * Math.PI) / this.info.segments) * j;
        let nodePosi = {
          x: tierR * Math.cos(theta),
          y: tierR * Math.sin(theta),
        };
        tierPosi.push(nodePosi);
      }
      posititions.nodes.push(tierPosi);
    }
    return posititions;
  }

  /*
   * Draw the bashed net
   */
  bashednetGenerator () {
    var dashednet = new Dashednet(this);
    return dashednet;
  }

  dataLoader (data) {
    this.data = data;
    this.addNodes(data.length);
  }

  createCenter () {
    this.center = this.bundle.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 5)
      .attr('class', 'node-point');
    this.center.call(this.tip);
    this.center.on('click', () => {
      this.tip.html('<strong>Spider Web Center</strong>');
      this.tip.show();
    });
  }

  createBranch () {
    this.branch = new SpiderBranch(this, this.info.r, this.info.segments);
    this.branch.createBranch();
  }

  createTip () {
    this.tip = d3tip()
      .attr('class', 'd3-tip')
      .offset([0, 0])
      .html(function(d) {
        return '<strong>Frequency:</strong> <span style="color:red">' + d + '</span>';
      });
  }

  addNode () {
    if (this.currentTier === undefined || this.currentTier.fullNode()) {
      let tier = new SpiderTier(this, this.tiers.length + 1, this.info.segments);
      this.tiers.push(tier);
      this.currentTier = tier;
    }

    this.currentTier.addPoint();
  }

  addNodes (num) {
    num = num > 1 ? num : 1;
    for ( let i = 0; i < num; i ++) {
      this.addNode();
    }
  }

  removeNode () {
    if (this.currentTier === undefined) {
      return;
    }
    this.currentTier.removePoint();
    console.log(this.currentTier.nullNode());
    console.log(this.tiers.length);
    if (this.currentTier.nullNode()) {
      this.tiers.pop();
      console.log(this.tiers.length);
      this.currentTier = this.tiers.length > 0 ? this.tiers[this.tiers.length - 1] : undefined;
      console.log(this.currentTier);
    }

    console.log(this.currentTier);
  }
}

export default Canvas;






