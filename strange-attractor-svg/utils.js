function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function savePng() {
  saveCanvas(`${attractorName}-${new Date()}`, "png");
}

function saveGcode() {
  if (save) {
    const points = allPoints[0].map((point) =>
      point ? { x: point.x, y: point.y, z: point.z } : undefined
    );

    console.log(points);

    fetch("http://localhost:4004/vector", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        outputBounds: {
          x: { min: 0, max: 300 },
          y: { min: 0, max: 300 },
          z: { min: -2, max: 0 },
        },
        vectors: points,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        download(
          `${attractorName}strange-attractor-2d-${new Date()}.gcode`,
          response
        );
      });
  }
}

function getUiValues() {
  const values = {};
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    values[input.id] = input.value;
  });
  return values;
}
