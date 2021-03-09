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
console.log(getData)

// locate the test subject id 
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

// Create a bubble chart that displays each sample.
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.



// Demographic Info- Display each key-value pair from the metadata JSON object somewhere on the page.
function populateDemographic(optionSelected) {
    d3.json("samples.json").then(function (samplesData) {
        // Locate demographics in samples.json
        var demoList = samplesData.metadata
        // Filter demographics list to Id selected by user
        var filteredDemo = demoList.filter( subject => subject.id == optionSelected)
        console.log(filteredDemo)
        // Select demographic panel to input data
        var idDemographics = d3.select("#sample-metadata")
        // Append demographic to panel 
        Object.entries

// append a p tag, a text value, etc. 
    });
};

// "id": 940,
// "ethnicity": "Caucasian",
// "gender": "F",
// "age": 24.0,
// "location": "Beaufort/NC",
// "bbtype": "I",
// "wfreq": 2.0

// Function to select ID 
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


// Update all of the plots any time that a new sample is selected.
function optionChanged(optionSelected) {
    populateDemographic(optionSelected)

};



populateSelector();