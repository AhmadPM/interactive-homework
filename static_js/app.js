
function createCharts(id) {
  d3.json("data/samples.json").then((data) => {

  var samples = data.samples;
  console.log(samples);
  var result = samples.filter(sampleObject => sampleObject.id == id)[0]
    //  Create the Traces
    var trace1 = [{
      x: result.sample_values.slice(0,10).reverse(),
      y: result.otu_ids.slice(0,10).map(otu_id => `OTU ${otu_id}`).reverse(),
      type: "bar",
      text: result.otu_labels.slice(0,10).reverse(),
      orientation: "h",
    }];

var trace2 = [{
  x: result.otu_ids,
  y: result.sample_values,
  text: result.otu_labels,
  mode: 'markers',
  marker: {
    color:result.otu_ids,
    size: result.sample_values,
  }
}]


    // Define the plot layout
    var layout = {
      title: "Belly Button Biodiversity",
    };

    var layout2 = {
      title: "Bubble Chart",
      xaxis: {title: "OTU ID"},
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", trace1, layout);

    Plotly.newPlot("bubble", trace2, layout2);

  });
}
function showDemographics(id) {
  d3.json("data/samples.json").then((data) => {

  var metadata = data.metadata;
  var result = metadata.filter(metadataObject => metadataObject.id == id)[0];
  var div = d3.select("#sample-metadata");
  div.html("");
  Object.entries(result).forEach(([key,value]) => {
    div.append("p").text(`${key} : ${value}`);

  });

});
}
function init() {
var dropdown = d3.select("#selDataset");
  d3.json("data/samples.json").then((data) => {

  var names = data.names;
  names.forEach((item) => {
    dropdown.append("option").text(item).property("value", item);

  });

  var id = names[0];
  createCharts(id);
  showDemographics(id)
    });
}

init()

function optionChanged(newSample) {
  createCharts(newSample)
  showDemographics(newSample)
}
