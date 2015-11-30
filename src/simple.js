import d3 from 'd3';
import $ from 'jquery';

var scene = d3.select('#spider');



function getPoints(radius, segments, levels) {
          var points = {
            all: [],
            byLevel: [],
            bySegment: [],
          };

              points.bySegment[j].push(point);

          for (let i = 0; i < levels; i++) {
            var r = (radius/levels) * (i + 1);
            points.byLevel[i] = [];
            for (let j = 0; j < segments; j++) {
              if (points.bySegment[j] === undefined) {
                points.bySegment[j] = [];
              }
              let theta = ((2 * Math.PI) / segments) * j;
              let point = {
                r: r,
                theta: theta,
                x: r * Math.cos(theta),
                y: r * Math.sin(theta),
                level: i
              };
              points.all.push(point);
              points.byLevel[i].push(point);
              points.bySegment[j].push(point);
            }
          }
          return points;
      }

      var svg = scene.append('svg').style('width', '1000px').style('height', '700px'),
          vis = svg.append('g'),
          width = 500,
          segments = 8,
          levels = 4,
          points = getPoints(width / 2, segments, levels);

      vis.attr('transform', 'translate(' + $(window).width() / 2 + ', ' + $(window).height() / 2 + ')');
      vis.selectAll('circle')
          .data(points.all)
        .enter().append('circle')
          .attr('cx', function(d) {
             return d.x;
           })
          .attr('cy', function(d) {
             return d.y;
           })
          .attr('r', 5)
          .attr('class', function(d) {
              return 'level-' + d.level;
           });

      for (let level = 0; level < levels; level++) {
         for (let j = 0; j < segments; j++) {
            let point = points.byLevel[level][j];
            var nextIdx = j + 1 < segments ? j + 1 : 0;
            var nextPoint = points.byLevel[level][nextIdx];
            vis.append('path')
              .attr('d', 'M ' + point.x + ' ' + point.y + ' L ' + nextPoint.x + ' ' + nextPoint.y)
              .style('stroke', '#000');
         }
      }

      for (let segment = 0; segment < segments; segment++) {
        console.debug(points.bySegment[segment]);
        var start = points.bySegment[segment][0];
        var end = points.bySegment[segment][levels - 1];
        vis.append('path')
          .attr('d', 'M ' + start.x + ' ' + start.y + ' L ' + end.x + ' ' + end.y)
          .style('stroke', '#000');
      }
