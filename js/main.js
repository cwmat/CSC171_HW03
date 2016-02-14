'use strict';

(function(window, document) {
  /* Global
   *
   */
  // var maxChar = 0;


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
      barStart = 250;

    // Make svg
    var svg = d3.select("#content-charts").append("svg")
      .attr("width", 700)
      .attr("height", (barWidth + barSpacer) * data.length);

    // Draw bar chart
    var bar = svg.selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function(d, i) {
        return "translate(0," + (i * (barWidth + barSpacer)) + ")";
      })
      .on("click", function(d) {
        updateContent(d);
      });

    // Draw rectangles
    bar.append("rect")
      .attr("class", "building-rect")
      .attr("x", barStart)
      // .attr("y", function(d, i) {return (i * barWidth)})
      .attr("height", barWidth - barSpacer)
      .attr("width", function(d) {
        return d.height_px;
      });

    // Write text Label
    bar.append("text")
      .attr("x", 210) // Not sure why I had to add this offset...
      .attr("y", barWidth / 2)
      .attr("text-anchor", "end")
      .attr("fill", "black")
      .attr("align", "right")
      .text(function(d) {
        return d.building
      });

    // Write text Label
    bar.append("text")
      .attr("x", function(d) {
        return (d.height_px - labelSpacer) + barStart
      })
      .attr("y", barWidth / 2)
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .text(function(d) {
        return d.height_m
      });
  }

  /* Find Max
   *    Find the maximum number of characters in an array.
   *
   *    return: Max number of characters of array elements.
   */
  function findMax(input, key) {
    var maxChar = 0;
    if (input) {
      // Cycle through elements in array if it exists
      input.forEach(function(element) {
        // If the element's length is greater than the current max, update max
        if (element[key].length > maxChar) {
          maxChar = element[key].length;
        }
      });
      // Return the greatest number of characters of the array elements
      return maxChar;
    } else {
      return 0;
    }
  }

  /* Update Content
   *    Update information in #content-tables (generally called form a click
   *    event)
   *
   *    return: undefined
   */
  function updateContent(data) {
    if (data) {
    var name = data.building,
        height = data.height_m + " m (" + parseInt(data.height_ft).toLocaleString("en-US") + " ft)",
        city = data.city,
        country = data.country,
        floors = data.floors,
        year = data.completed,
        imgSrc = "img/" + data.image;

    // Update table
    $('#bld-name').text(name);
    $('#bld-height').text(height);
    $('#bld-city').text(city);
    $('#bld-country').text(country);
    $('#bld-floors').text(floors);
    $('#bld-year').text(year);
    $('#bld-img').attr("src", imgSrc);

    } else {
      return undefined;
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
      // maxChar = findMax(data, "building");
      var sorted = data.sort(function(a, b) {
        return b.height_m - a.height_m;
      });
      updateContent(sorted[0]);
      generate(sorted);
    }
  });

  /* End IIFE */
})(window, document);
