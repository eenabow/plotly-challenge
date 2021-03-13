// READ SAMPLES.JSON 
function getData(id) {
    // Fetch the JSON data and console log it
    d3.json("samples.json").then(function (sampleData) {
        console.log(sampleData);
        var sample_values = sampleData.samples[0].sample_values.slice(0, 10).reverse();
        console.log(sampleValues);
        var otu_ids = sampleData.samples[0].otu_ids;
        console.log(otu_ids);
        var otu_labels = sampleData.samples[0].otu_labels.slice(0, 10);
        console.log(otu_labels)
    });

    // Clear any existing sample data 
    sampleData.html("");
};

// FUNCTION TO SELECT ID 
function populateSelector() {
    // Find Select tag in HTML 
    var idSelector = d3.select("#selDataset");
    d3.json("samples.json").then(function (samplesData) {
        // Locate names in samples.json
        var idNames = samplesData.names
        // Create a list and append the list as options under the select tag in html 
        idNames.forEach((name) => {
            idSelector.append("option").text(name).property("value", name)
        })
    });
};

// DEMOGRAPHIC INFO - DISPLAY EACH KEY-VALUE PAIR BASED ON SELECT ID 
function populateDemographic(optionSelected) {
    d3.json("samples.json").then(function (samplesData) {
        // Locate demographics in samples.json
        var demoList = samplesData.metadata;
        // Filter demographics list to Id selected by user
        var filteredDemo = demoList.filter(subject => subject.id == optionSelected)[0];
        console.log(filteredDemo)
        // Select demographic panel to input data
        var idDemographics = d3.select("#sample-metadata");
        // Clear existing demographic info 
        idDemographics.html("");
        // Append demographic to panel 
        Object.entries(filteredDemo).forEach(function ([key, value]) {
            idDemographics.append("h5").text(`${key}:${value}`);
        });
    });
};


// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

function buildCharts(optionSelected) {
    d3.json("samples.json").then(function (samplesData) {
        // Locate samples in samples.json
        var sampleList = samplesData.samples;

        // Filter Bacteria samples list to Id selected by user
        var filteredSample = sampleList.filter(subject => subject.id == optionSelected)[0];

        // Slice top ten samples for barchart and build bar graph
        var barData = [{
            type: 'bar',
            x: filteredSample['sample_values'].slice(0, 10).reverse(),
            y: filteredSample['otu_ids'].slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            orientation: 'h',
            marker: { size: 13 },
            text: filteredSample['otu_labels'].slice(0, 10).reverse()


        }];
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            xaxis: { title: "Bacteria sample values" },
            yaxis: { title: "Bacteria ID", }
        };

        Plotly.newPlot('bar', barData, barLayout);



        // Create a bubble chart that displays each sample.
        // Use otu_ids for the x values.
        // Use sample_values for the y values.
        // Use sample_values for the marker size.
        // Use otu_ids for the marker colors.
        // Use otu_labels for the text values.
        // set the dimensions and margins of the graph
        
        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30}
          };
          var bubbleData = [
            {
              x: filteredSample['otu_ids'].map(otuID => `OTU ${otuID}`).reverse(),
              y: filteredSample['sample_values'].reverse(),
              text: filteredSample['otu_labels'].reverse(),
              mode: "markers",
              marker: {
                size: filteredSample['sample_values'].reverse(),
                color: filteredSample['otu_ids'].map(otuID => `OTU ${otuID}`).reverse(),
                colorscale: "rainbow"
              }
            }
          ];
      
          Plotly.newPlot("bubble", bubbleData, bubbleLayout);
      
    })

};





// Update all of the plots any time that a new sample is selected.
function optionChanged(optionSelected) {
    populateDemographic(optionSelected)
    buildCharts(optionSelected)
};



populateSelector();