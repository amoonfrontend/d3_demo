


class Dashednet {
  constructor (canvas) {
    this.canvas = canvas;
    this.dashedBranchBundle = undefined;
    this.dashedTierBundle = undefined;
    this.elements = {
      branchLines: [],
      tierLines: [],
      nodes: [],
      center: undefined,
      pitchon: 0,
      addButton: undefined
    };
  }

  dashedCreator () {
    this.dashedBranchBundle = this.bundleCreator();
    this.dashedBranchCreator();

    this.dashedTierBundle = this.bundleCreator();
    this.dashedTierCreator();

    this.dashedPointBundle = this.bundleCreator();
    this.dashedPointCreator();

    this.dashednetCenterCreator();

    this.initData();

    this.addButtonNode();
  }

  bundleCreator () {
    let width = this.canvas.info.width;
    let height = this.canvas.info.height;
    var bundle = this.canvas.svg.append('g')
      .attr('class', 'polyline')
      .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')');
    return bundle;
  }

  initData () {
    for (let i = 0; i < this.canvas.data.length; i ++) {
      this.addPitchonNode();
    }
  }

  dashedBranchCreator () {
    var branchPosititions = this.canvas.posititions.branchs;
    var nodePosititions = this.canvas.posititions.nodes;
    var segments = this.canvas.info.segments;
    var tiers = this.canvas.info.tiers;
    var lines = [];

    for ( var i = 0; i < tiers; i ++ ) {
      for (let pos = 0; pos < segments; pos ++) {
        let prevPositition = (i === 0) ? {x: 0, y: 0}
          : nodePosititions[i - 1][pos];
        let positition = nodePosititions[i][pos];
        let line = this.dashednetBeelineCreator(prevPositition, positition);
        lines.push(line);
      }
    }

    var lastTier = nodePosititions[nodePosititions.length - 1];
    for (let pos = 0; pos < segments; pos ++) {
      let prevPositition = lastTier[pos];
      let positition = branchPosititions[pos];
      let line = this.dashednetBeelineCreator(prevPositition, positition);
      lines.push(line);
    }

    this.elements.branchLines = lines;

    // this.dashedBranchBundle.selectAll('polyline').data(branchPosititions)
    //   .enter()
    //   .append('polyline')
    //   .attr('points', (d) => {
    //     return [[0, 0], [d.x, d.y]];
    //   });
  }

  dashedTierCreator () {
    let nodePosititions = this.canvas.posititions.nodes;
    var lines = [];
    for (var tierPosititions of nodePosititions) {
      var prevPositition = tierPosititions[0];
      var isFisrt = true;
      for (let positition of tierPosititions) {
        if (!isFisrt) {
          let line = this.dashednetBeelineCreator(prevPositition, positition);
          prevPositition = positition;
          lines.push(line);
        } else {
          isFisrt = false;
        }
      }
      let line = this.dashednetBeelineCreator(tierPosititions[0], tierPosititions[tierPosititions.length - 1]);
      lines.push(line);
    }
    this.elements.tierLines = lines;

    // this.dashedTierBundle.selectAll('polyline').data(nodePosititions)
    //   .enter()
    //   .append('polyline')
    //   .attr('points', function (d){
    //     var posititions = [];
    //     for (let pos of d) {
    //       posititions.push([pos.x, pos.y]);
    //     }
    //     posititions.push([d[0].x, d[0].y]);
    //     return posititions;
    //   });
  }

  dashednetBeelineCreator (prevPositition, positition) {
    let line = {
      one: prevPositition,
      two: positition,
      path: this.dashedBranchBundle.append('polyline')
              .attr('points', [[prevPositition.x, prevPositition.y], 
                               [positition.x, positition.y]])
    };
    return line;
  }

  dashedPointCreator () {
    let nodePosititions = this.canvas.posititions.nodes;
    var allPosititions = [];
    for (let pos of nodePosititions){
      allPosititions = allPosititions.concat(pos);
    }
    var nodes = [];
    for (let positition of allPosititions) {
      let node = this.dashednetNodeCreator(positition);
      nodes.push(node);
    }
    this.elements.nodes = nodes;

    // this.dashedPointBundle.selectAll('circle').data(allPosititions)
    //   .enter()
    //   .append('circle')
    //   .attr('class', 'dashednet-Point')
    //   .attr('cx', (d) => {
    //     return d.x;
    //   })
    //   .attr('cy', (d) => {
    //     return d.y;
    //   })
    //   .attr('r', 5);
  }

  dashednetNodeCreator (positition) {
    let node = {
      positition: positition,
      point: this.dashedBranchBundle.append('circle')
        .attr('class', 'node-dashednet')
        .attr('cx', positition.x)
        .attr('cy', positition.y)
        .attr('r', 5)
    };
    return node;
  }

  dashednetCenterCreator () {
    var positition = this.canvas.posititions.center;
    let node = this.dashednetNodeCreator(positition);
    node.point
      .attr('class', 'node-center')
      .attr('r', 8);
    this.elements.center = node;
  }

  illumineNode (number) {
    // let posititions = this.canvas.posititions.nodes;
    // let tier = parseInt(number / this.canvas.info.segments);
    // let no = number % this.canvas.info.segments;
    // return posititions[tier][no];
    // number >= 1 && ( () => {
    //   let node = this.elements.nodes[number - 1];
    //   node && node.point && func(node);
    // })();
    if (number >= 1 && number <= this.elements.nodes.length) {
      let node = this.elements.nodes[number - 1];
      return node;
    }
  }

  illumineTierLine (number) {
    //let tierLines = this.elements.tierLines;
    if (number >= 1 && number <= this.elements.tierLines.length) {
      let line = this.elements.tierLines[number - 1];
      return line;
    }
    // number >= 1 && ( () => {
    //   let line = this.elements.tierLines[number - 1];
    //   line && line.path && func(line);
    // })();
  }

  illumineBranchLine (number) {
    //let branchLines = this.elements.branchLines;
    if (number >= 1 && number <= this.elements.branchLines.length) {
      let line = this.elements.branchLines[number - 1];
      return line;
    }
  }

  addButtonNode () {
    let node = this.illumineNode(this.elements.pitchon + 1);
    node.point
        .attr('class', 'node-add')
        .attr('r', 8)
        .on('click', () => {
          this.addPitchonNode();
          this.addButtonNode();
        });
  }

  addPitchonNode () {
    let node = this.illumineNode(this.elements.pitchon + 1);
    node.point
      .attr('class', 'node-pitchon')
      .attr('r', 6)
      .on('click', () => {
        this.showTip(node.point);
      });
    //this.illumineNode(this.elements.pitchon + 1, (node) => {
      // node.point
      //   .attr('class', 'node-pitchon')
      //   .attr('r', 6)
      //   .on('click', () => {
      //     console.log('------');
      //   });
    // });

    this.elements.pitchon = this.elements.pitchon + 1;
    let tierline = this.illumineTierLine(this.elements.pitchon);
    tierline && tierline.path.attr('class', 'line-pitchon');

    let branchline = this.illumineBranchLine(this.elements.pitchon);
    branchline && branchline.path.attr('class', 'line-pitchon');

  }

  removeButtonNode (number) {
    //let addButton = this.elements.addButton;
    console.log(number);
  }

  showTip (element) {
    var index = this.elements.pitchon;
    var name = 'tester';
    if (this.canvas.data.length > index) {
      name = this.canvas.data[index].name;
    }
    this.canvas.tip && element.call(this.canvas.tip);
    var tier = parseInt(index / this.canvas.info.segments);
    var numb = index % this.canvas.info.segments;
    this.canvas.tip && () => {
        this.canvas.tip.html('<strong>Name: </strong>' + name + ';<br><strong>Tier: </strong>' + tier + '; <strong>Point: </strong>' + numb + ';');
        this.canvas.tip.show();
      }();
  }

}
export default Dashednet;


