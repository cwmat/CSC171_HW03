'use strict';

(function(window, document) {
  /* Load data
   *    Load the external data and generate the d3 chart.
   *
   *    return: undefined
  */



  /* Load data
   *    Load the external data and generate the d3 chart.
   *
   *    return: undefined
  */
  d3.csv("data/buildings.csv", function(error, data) {
    // Filter data
    // var filtered = data.filter(function(item) {
    //   if (item.eu) {
    //     return item
    //   }
    // });
    if (error) {
      console.log("Data did not load properly!");
      console.log(error.responseURL + " " + error.status + " " + error.statusText);
    } else {
      console.log("Data loaded!");
      // generate(data);
    }
  });

  /* End IIFE */
})(window, document);
