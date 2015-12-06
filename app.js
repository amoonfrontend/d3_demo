// import d3 from 'd3';
import Canvas from './src/spiderWeb';

var canvas = new Canvas('spider', 600, 600);

var data = [
  {name: '张1'},{name: '王2'},{name: '李3'},{name: '张4'},{name: '王5'},{name: '李6'},{name: '张7'},
  {name: '王8'},{name: '李9'},{name: '张10'},{name: '王11'},{name: '李12'},{name: '张13'},{name: '王14'},{name: '李15'},
  {name: '张16'},{name: '王17'},{name: '李18'},{name: '张19'},{name: '王20'},{name: '李21'},{name: '张22'},{name: '王23'},
  {name: '李24'},{name: '张25'},{name: '王26'},{name: '李27'},{name: '李28'},{name: '张29'},{name: '王30'},{name: '张31'},
  {name: '王32'},{name: '李33'},{name: '张34'},{name: '王35'},{name: '李36'},{name: '张37'},{name: '王38'},{name: '李39'}
];

canvas.dataLoader(data);
canvas.bashednetGenerator();
