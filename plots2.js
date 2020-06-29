function init() {
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  });}
  
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }
  function page(item) {
    d3.json("samples.json").then((data) => {
      buildMetadata(952);
      buildCharts(952);
  });
  }
  window.onload = page();

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
      
      Object.entries(result).forEach(([key, value]) => {
        metadata = metadata.filter(row => row[key] === value);
      });
      //Javascript syntax for .text function 
      PANEL.html("");  
        Object.entries(result).forEach(function([filtering,value]){
          PANEL.append("h6").text(`${filtering}: ${value}`);});
      });
  }
function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var otu_id = result.otu_ids;
        var sample_values = result.sample_values;
        var otu_labels = result.otu_labels;
        var trace = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_id.slice(0,10).map(input=>`otu_${input}`).reverse(),
            type: "bar", 
            orientation: "h"

          };
          var data = [trace];
          var layout = {
            title: "Belly Button",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "Otu_Id"}
          };
          Plotly.newPlot("bar", data, layout);
        var trace1 = {
            x: otu_id,
            y: sample_values,
            type: "bubble", 
            mode: 'markers',
            text: otu_labels,
            marker: {
              color: otu_id,  
              size: sample_values,
              
            }

            };
            var data1 = [trace1];
            var layout = {
            xaxis: { title: "Otu_Id" },
            yaxis: { title: "Sample Values"}
          };
          Plotly.newPlot("bubble", data1, layout);
    });

}
init();