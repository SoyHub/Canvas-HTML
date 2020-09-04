const element = document.querySelector(".container");

// let instance= panzoom(element, {
//   minZoom: 0.5,
//   maxZoom: 1,
//   bounds: true,
//   boundsPadding: 1,
//   transformOrigin: {x: 0.5, y: 0.5}
// })

panzoom(element, {
    maxZoom: 3,
    minZoom: 0.7,
    bounds: true,
    boundsPadding: 1
  }).zoomAbs(
    -5000, // initial x position
    -3000, // initial y position
    0.5  // initial zoom 
  );
// panzoom(element, {
//   transformOrigin:{ x:2, y: 2 } ,
//   minZoom: 1,
//   maxZoom: 1,
//   zoomDoubleClickSpeed: 1,
//   bounds: true,
//   boundsPadding: 1,
// }).zoomAbs(
//     5000, // initial x position
//     500, // initial y position
//     0.2  // initial zoom
//   );

