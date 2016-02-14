'use strict';

(function(window, document) {
  /* Global
   *
   */
  var maxChar = 0;


  /* Generate
   *    Create the d3 chart.
   *
   *    return: undefined
   */
   function generate(data) {
    // Local var
    var barWidth = 50,
        barSpacer = 10,
        labelSpacer = 10,
        defaultBarStart = 50,
        barStart = defaultBarStart + maxChar;

    // Make svg
    var svg = d3.select("#content-charts").append("svg")
     .attr("width", 500)
     .attr("height", (barWidth + barSpacer) * data.length);

    // Draw bar chart
    var bar = svg.selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d, i) { return "translate(0," + (i * (barWidth + barSpacer)) + ")"; });

    // Draw rectangles
    bar.append("rect")
      .attr("x", barStart)
      // .attr("y", function(d, i) {return (i * barWidth)})
      .attr("height", barWidth - barSpacer)
      .attr("width", function(d) {return d.height_px;});

    // Write text Label
    bar.append("text")
      .attr("x", 0)
      .attr("y", barWidth / 2)
      // .attr("text-anchor", "end")
      .attr("fill", "black")
      .text(function(d) {return d.building});

    // Write text Label
    bar.append("text")
      .attr("x", function(d) {return d.height_px - labelSpacer})
      .attr("y", barWidth / 2)
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .text(function(d) {return d.height_m});
   }

   /* Find Max
    *    Find the maximum number of characters in an array.
    *
    *    return: Max number of characters of array elements.
    */
    function findMax(input) {
      var maxChar = 0;
      console.log("Stuff");
      if (input) {
        // Cycle through elements in array if it exists
        input.forEach(function(element) {
          console.log(element);
          // If the element's length is greater than the current max, update max
          if (element.length > maxChar) {
            maxChar = element.length;
          }
        });
        // Return the greatest number of characters of the array elements
        return maxChar;
      } else {
        console.log("everytime");
        return 0;
      }
    }

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
      maxChar = findMax(data.building);
      generate(data);
    }
  });

  /* End IIFE */
})(window, document);
