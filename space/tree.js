function Tree(pos, dir) {
  const attraction_distance = 100;
  const kill_distance = 15;
  this.attractors = [];
  this.nodes = [];

  for (let i = 0; i < 150; i++) {
    this.attractors.push(new Attractor(random(width), random(height)));
  }

  const root = new Node(null, pos, dir);

  this.nodes.push(root);
  let current = root;
  let found = false;

  this.show = function () {
    for (let attractor of this.attractors) {
      attractor.show();
    }

    for (let node of this.nodes) {
      node.show();
    }
  };

  this.grow = function () {
    for (let attractor of this.attractors) {
      const closestNode = this.findClosestNode(attractor);

      if (closestNode != null) {
        var newDir = p5.Vector.sub(attractor.pos, closestNode.pos);
        newDir.normalize();

        closestNode.dir.add(newDir);
        closestNode.closestCount++;
      }

      this.attractors = this.attractors.filter((leaf) => !leaf.reached);

      this.addnodes();

      // for (let node of this.nodes) {
      //   for (let othernode of this.nodes) {
      //     if (node != othernode) {
      //       const dist = p5.Vector.dist(node.pos, othernode.pos);
      //       if (dist < 10) {
      //         // find opposite direction
      //         const opposite = p5.Vector.sub(node.pos, othernode.pos);
      //         opposite.normalize();
      //         opposite.mult(0.1);
      //         node.dir.add(opposite);
      //       }
      //     }
      //   }
      // }
    }
  };

  this.findClosestNode = function (attractor) {
    let record = attraction_distance;
    let closestnode = null;

    for (let node of this.nodes) {
      const dist = p5.Vector.dist(attractor.pos, node.pos);
      if (dist < kill_distance) {
        attractor.reached = true;
        closestnode = null;
        break;
      } else if (dist < record) {
        attractor.found = true;
        closestnode = node;
        record = dist;
      }
    }
    return closestnode;
  };

  this.addnodes = function () {
    let newnodes = [];
    for (let node of this.nodes.filter((n) => n.closestCount > 1)) {
      node.dir.div(node.closestCount + 1);
      newnodes.push(node.next());
      node.reset();
    }

    this.nodes = [...this.nodes, ...newnodes];
  };

  this.growTillWithinAttractionDistance = function () {
    while (!found) {
      for (let attractor of this.attractors) {
        const dist = p5.Vector.dist(current.pos, attractor.pos);

        if (dist < attraction_distance) {
          found = true;
        }
      }

      if (!found) {
        current = current.next();
        this.nodes.push(current);
      }
    }
  };
}
