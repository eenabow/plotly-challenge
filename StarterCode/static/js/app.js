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
function barChart(optionSelected) {
    d3.json("samples.json").then(function (samplesData) {
        // Locate samples in samples.json
        var sampleList = samplesData.samples;
        // Filter Bacteria samples list to Id selected by user
        var filteredSample = sampleList.filter(subject => subject.id == optionSelected)[0];
        console.log(filteredSample)

        // @TODO FIND TOP 10 SAMPLES 
        // @TODO SET TO X AND Y VALUES 
        // @TODO CREATE GRAPH 
        // var data = [{
        //     type: 'bar',
        //     x: [20, 14, 23],
        //     y: ['giraffes', 'orangutans', 'monkeys'],
        //     orientation: 'h'
        // }];

        // Plotly.newPlot('myDiv', data);
    });
    
};

// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.









// Update all of the plots any time that a new sample is selected.
function optionChanged(optionSelected) {
    populateDemographic(optionSelected)
    barChart(optionSelected)
};



populateSelector();