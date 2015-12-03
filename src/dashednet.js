


class Dashednet {
  constructor (canvas) {
    this.canvas = canvas;
    this.dashedBranchBundle = undefined;
    this.dashedTierBundle = undefined;
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
    let branchPosititions = this.canvas.posititions.branchs;
    this.dashedBranchBundle.selectAll('polyline').data(branchPosititions)
      .enter()
      .append('polyline')
      .attr('points', (d) => {
        return [[0, 0], [d.x, d.y]];
      });
  }

  dashedTierCreator () {
    let nodePosititions = this.canvas.posititions.nodes;
    // var lines = [];
    // for (var tierPositions of nodePosititions) {
    //   var prevPosition = tierPositions[0];
    //   var isFisrt = true;
    //   for (let position of tierPositions) {
    //     if (!isFisrt) {
    //       let line = this.lineCreator(prevPosition, position);
    //       prevPosition = position;
    //       lines.push(line);
    //     } else {
    //       isFisrt = false;
    //     }
    //   }
    //   let line = this.lineCreator(tierPositions[0], tierPositions[tierPositions.length - 1]);
    //   lines.push(line);
    // }

    this.dashedTierBundle.selectAll('polyline').data(nodePosititions)
      .enter()
      .append('polyline')
      .attr('points', function (d){
        var positions = [];
        for (let pos of d) {
          positions.push([pos.x, pos.y]);
        }
        positions.push([d[0].x, d[0].y]);
        return positions;
      });
  }

  lineCreator (prevPosition, position) {
    let line = {
      one: prevPosition,
      two: position,
      path: this.dashedBranchBundle.append('polyline')
              .attr('points', [[prevPosition.x, prevPosition.y], 
                               [position.x, position.y]])
    };
    return line;
  }

  dashedPointCreator () {
    let nodePosititions = this.canvas.posititions.nodes;
    var allPosititions = [];
    for (let pos of nodePosititions){
      allPosititions = allPosititions.concat(pos);
    }
    this.dashedPointBundle.selectAll('circle').data(allPosititions)
      .enter()
      .append('circle')
      .attr('class', 'dashednet-Point')
      .attr('cx', (d) => {
        return d.x;
      })
      .attr('cy', (d) => {
        return d.y;
      })
      .attr('r', 5);
  }
}

export default Dashednet;


