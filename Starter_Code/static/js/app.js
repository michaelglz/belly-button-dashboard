function buildMetadata(sample) {
    d3.json('samples.json').then(xdat => {
        var metadata = xdat.metadata;

        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select('#sample-metadata');
        PANEL.html('');

        Object.entries(result).forEach(([key,value]) => {
            PANEL.append('h6').text(`${key}: ${value}`);
        });

    })
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var plotData = `/samples/${sample}`;
  // @TODO: Build a Bubble Chart using the sample data
  d3.json('samples.json').then(function(data) {
      var xsamples = data.samples
      console.log(data)
      console.log(xsamples)
    var x_axis = xsamples.otu_ids;
    var y_axis = xsamples.sample_values;
    var size = xsamples.sample_values;
    var color = xsamples.otu_ids;
    var texts = xsamples.otu_labels;
  
    var bubble = {
      x: x_axis,
      y: y_axis,
      text: texts,
      mode: `markers`,
      marker: {
        size: size,
        color: color,
      }
    };

    var ndata = [bubble];
    var layout = {
      xaxis: {title: "OTU ID"}
    };
    Plotly.newPlot("bubble", ndata, layout);

    // @TODO: Build a bar chart
    d3.json('samples.json').then(xsamples => {
      var values = xsamples.sample_values.slice(0,10);
      var labels = xsamples.otu_ids.slice(0,10);
      var display = xsamples.otu_labels.slice(0,10);

      var layout = [{
        values: values,
        lables: labels,
        hovertext: display,
        type: 'bar',
        orientation: 'h'
      }];
      Plotly.newPlot('bar',data, layout);
    });
  });
};






// ============================
function init() {
    var selector = d3.select('#selDataset');

    d3.json('samples.json').then(xdata => {
        var sampleNames = xdata.names;

        sampleNames.forEach( name => {
            selector
                .append('option')
                .text(name)
                .property('value',name);
        });

        var firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
};

function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

init();