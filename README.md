# simple-grapher

Simple-grapher is a graphing utily that sketches graphs of equations only using HTML canvas and mathjs library.

**Github**: https://github.com/etasbasi/simple-grapher

## Installation

```
npm i simple-grapher
```

## Examples

### Drawing on the graph

```html
<canvas></canvas>
```

```javascript
const Graph = require("simple-grapher");

const MyGraph = new Graph(document.querySelector("canvas"), {
  height: 320,
  width: 420,
  enableCoords: false
});

MyGraph.drawGraph("x^2");
```

![](https://github.com/etasbasi/simple-grapher/blob/gh-pages/snapshots/example.png?raw=true "Example 1")

Graph constructor accepts two parameters `new Graph(canvas element, options)`
Options can include:

- width: (number, specifies canvas' width) - default: 520
- height (number, specifies canvas' height) - default: 520
- enableCoords (boolean, when true, the x - y coordinates of the graph will be visible when hovered) - default: true

drawGraph() accepts a string or array of strings to draw on the graph.

### Binding an input element to the graph

```html
<canvas></canvas><input style="display:block;" type="text" id="input-1" />
```

```javascript
const Graph = require("simple-grapher");

const MyGraph = new Graph(document.querySelector("canvas"), {
  width: 200,
  height: 200,
  enableCoords: false
});

MyGraph.bindInput(document.querySelector("input"), err => {
  if (err) console.log(err);
});
```

![](https://github.com/etasbasi/simple-grapher/blob/gh-pages/snapshots/example2.png?raw=true "Example 2")

bindInput() takes an input element or an array of input elements as the first parameter. **Each input element has to have an id**. The second parameter is the error callback. When the given equation has syntax mistakes the err value will return an object with the input's id as the key and the error as the value.

## Contributing

Fork the repo and check the issues tab, to start contributing.
