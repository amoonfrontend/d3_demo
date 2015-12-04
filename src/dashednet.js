


class Dashednet {
  constructor (canvas) {
    this.canvas = canvas;
    this.dashedBranchBundle = undefined;
    this.dashedTierBundle = undefined;
    this.elements = {
      branchLines: [],
      tierLines: [],
      nodes: []
    };
  }

  dashedCreator () {
    this.dashedBranchBundle = this.bundleCreator();
    this.dashedBranchCreator();

    this.dashedTierBundle = this.bundleCreator();
    this.dashedTierCreator();

    this.dashedPointBundle = this.bundleCreator();
    this.dashedPointCreator();
  }

  bundleCreator () {
    let width = this.canvas.info.width;
    let height = this.canvas.info.height;
    var bundle = this.canvas.svg.append('g')
      .attr('class', 'polyline')
      .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')');
    return bundle;
  }

  dashedBranchCreator () {
    var branchPosititions = this.canvas.posititions.branchs;
    var nodePosititions = this.canvas.posititions.nodes;
    var segements = this.canvas.info.segments;
    var tiers = this.canvas.info.tiers;
    var lines = [];
    for ( var i = 0; i < segements; i ++ ) {
      var branchPositition = branchPosititions[i];
      var prevPosition = {x: 0, y: 0};
      for (let pos = 0; pos < tiers; pos ++) {
        var position = nodePosititions[pos][i];
        let line = this.dashednetBeelineCreator(prevPosition, position);
        lines.push(line);
        prevPosition = position;
      }
      let line = this.dashednetBeelineCreator(prevPosition, branchPositition);
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
    for (var tierPositions of nodePosititions) {
      var prevPosition = tierPositions[0];
      var isFisrt = true;
      for (let position of tierPositions) {
        if (!isFisrt) {
          let line = this.dashednetBeelineCreator(prevPosition, position);
          prevPosition = position;
          lines.push(line);
        } else {
          isFisrt = false;
        }
      }
      let line = this.dashednetBeelineCreator(tierPositions[0], tierPositions[tierPositions.length - 1]);
      lines.push(line);
    }
    this.elements.tierLines = lines;

    // this.dashedTierBundle.selectAll('polyline').data(nodePosititions)
    //   .enter()
    //   .append('polyline')
    //   .attr('points', function (d){
    //     var positions = [];
    //     for (let pos of d) {
    //       positions.push([pos.x, pos.y]);
    //     }
    //     positions.push([d[0].x, d[0].y]);
    //     return positions;
    //   });
  }

  dashednetBeelineCreator (prevPosition, position) {
    let line = {
      one: prevPosition,
      two: position,
      path: this.dashedBranchBundle.append('polyline')
              .attr('points', [[prevPosition.x, prevPosition.y], 
                               [position.x, position.y]])
    };
    return line;
  }

  dashednetNodeCreator (position) {
    let node = {
      position: position,
      point: this.dashedBranchBundle.append('circle')
        .attr('class', 'dashednet-node')
        .attr('cx', position.x)
        .attr('cy', position.y)
        .attr('r', 5)
    };
    return node;
  }

  illumineNode (number) {
    console.log(number);

  }

  illumineTierLine (number) {
    //let tierLines = this.elements.tierLines;
    console.log(number);
  }

  illumineBranchLine (number) {
    //let branchLines = this.elements.branchLines;
    console.log(number);
  }

  dashedPointCreator () {
    let nodePosititions = this.canvas.posititions.nodes;
    var allPosititions = [];
    for (let pos of nodePosititions){
      allPosititions = allPosititions.concat(pos);
    }
    var nodes = [];
    for (let position of allPosititions) {
      let node = this.dashednetNodeCreator(position);
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
}

export default Dashednet;


