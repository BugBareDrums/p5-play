function Tree(pos, dir) {
  this.attractors = [];
  this.endNodes = [];
  this.nodes = [];
  this.complete = false;

  for (let i = 0; i < 150; i++) {
    this.attractors.push(new Attractor(random(width), random(height)));
  }

  const root = new Node(null, pos, dir);

  this.nodes.push(root);
  this.endNodes.push(root);
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

      if (this.attractors.length < 10) {
        this.complete = true;
      } else {
        this.addnodes();
      }
    }
  };

  this.findClosestNode = function (attractor) {
    let record = CONFIG.attractionDistance;
    let closestnode = null;

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const dist = p5.Vector.dist(attractor.pos, node.pos);
      if (dist < CONFIG.killDistance) {
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
    let newNodes = [];
    for (let node of this.nodes.filter((n) => n.closestCount > 1)) {
      node.dir.div(node.closestCount + 1);
      newNodes.push(node.next());
      node.reset();
    }

    if (newNodes.length > 0) {
      this.nodes = [...this.nodes, ...newNodes];
    }
  };

  this.getEndNodes = function () {
    return this.nodes.filter((n) => n.child == null);
  };

  this.growTillWithinAttractionDistance = function () {
    while (!found) {
      for (let attractor of this.attractors) {
        const dist = p5.Vector.dist(current.pos, attractor.pos);

        if (dist < CONFIG.attractionDistance) {
          found = true;
        }
      }

      if (!found) {
        current = current.next();

        this.nodes.push(current);
        this.endNodes = [current];
      }
    }
  };
}
