class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  constructor(x, y, halfWidth, halfHeight) {
    this.x = x;
    this.y = y;
    this.halfWidth = halfWidth;
    this.halfHeight = halfHeight;
  }
}

class QTNode {

  constructor(nw, ne, sw, se, capacity) {
    this.capacity = capacity;
    this.points = [];

  }

  divide() {
    this.nw = new QTNode();
    this.ne = new QTNode();
    this.sw = new QTNode();
    this.se = new QTNode();
  }

  insert(point) {
    if (this.points.length < this.capacity) {
      this.points.push(point);
    } else {
      this.divide();
    }
  }
}