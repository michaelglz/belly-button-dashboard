function buildMetadata(sample) {
    d3.json('samples.json').then(xdat => {
        var metadata = xdat.metadata;

        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select('#sample-metadata');
        PANEL.html('');

        Object.entries(result).forEach(([key,value]) => {
            PANEL.append('h6').text(`${key.toUpperCase()}: ${value}`);
        });

    })
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // @TODO: Build a Bubble Chart using the sample data
  d3.json('samples.json').then(function(data) {
      var samples = data.samples.filter(obj => obj.id == sample)[0];

    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      margin: { t: 0 },
      hovermode: 'closest',
      xaxis: { title: 'OTU ID' },
      margin: { t: 30 }
    };

    var bubbleData = [
      {
        x: samples.otu_ids,
        y: samples.sample_values,
        text: samples.otu_labels,
        mode: `markers`,
        marker: {
          size: samples.sample_values,
          color: samples.otu_ids,
          colorscale: 'Earth'
        }
      }
    ];
    
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
      
      var yticks = samples.otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

      var barData = [{
        y: yticks,
        x: samples.sample_values.slice(0,10).reverse(),
        text: samples.otu_labels.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h'
      }];

      var barLayout = {
        title: 'Top 10 Bacteria Cultures Found',
        margin: { t: 30, l: 150 }
      };
      Plotly.newPlot('bar', barData, barLayout);
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
        buildCharts(sampleNames[0]);
        buildMetadata(sampleNames[0]);
    });
};

function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

init();