


class Dashednet {
  constructor (canvas) {
    this.canvas = canvas;
    this.bundle = this.bundleCreator();
    this.dashedBranchCreator();
    this.dashedTierCreator();
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
    this.bundle.selectAll('polyline').data(branchPosititions)
      .enter()
      .append('polyline')
      .attr('points', (d) => {
        return [[0, 0], [d.x, d.y]];
      });
  }

  dashedTierCreator () {
    let nodePosititions = this.canvas.posititions.nodes;
    var bundle = this.bundleCreator();
    bundle.selectAll('polyline').data(nodePosititions)
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
}

export default Dashednet;


