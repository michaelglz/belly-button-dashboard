function buildMetadata(sample) {
    d3.json('samples.json').then(data => {
        var metadata = data.metadata;

        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select('#sample-metadata');
        PANEL.html('');

        Object.entries(result).forEach(([key,value]) => {
            PANEL.append('h6').text(`${key}: ${value}`);
        });
        // buildGauge(result.wfreq);
    })
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var plotData = result;
  // @TODO: Build a Bubble Chart using the sample data
  d3.json(plotData).then(function(data){
    var x_axis = data.otu_ids;
    var y_axis = data.sample_values;
    var size = data.sample_values;
    var color = data.otu_ids;
    var texts = data.otu_labels;
  
    var bubble = {
      x: x_axis,
      y: y_axis,
      text: texts,
      mode: `markers`,
      marker: {
        size: size,
        color: color
      }
    };

    var data = [bubble];
    var layout = {
      title: "Belly Button Bacteria",
      xaxis: {title: "OTU ID"}
    };
    Plotly.newPlot("bubble", data, layout);

    // @TODO: Build a Pie Chart
    d3.json(plotData).then(function(data){
      var values = data.sample_values.slice(0,10);
      var labels = data.otu_ids.slice(0,10);
      var display = data.otu_labels.slice(0,10);

      var pie_chart = [{
        values: values,
        lables: labels,
        hovertext: display,
        type: "pie"
      }];
      Plotly.newPlot('pie',pie_chart);
    });
  });
};






// ============================
function init() {
    var selector = d3.select('#selDataset');

    d3.json('samples.json').then(data => {
        var sampleNames = data.names;

        sampleNames.forEach( name => {
            selector
                .append('option')
                .text(name)
                .property('value',name);
        });

        var firstSample = sampleNames[0];
        // buildCharts(firstSample);
        buildMetadata(firstSample);
    });
};

function optionChanged(newSample) {
  // buildCharts(newSample);
  buildMetadata(newSample);
}

init();