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
        var margin = { top: 10, right: 20, bottom: 30, left: 50 },
            width = 500 - margin.left - margin.right,
            height = 420 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#bubble")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        //Set variables for chart
        var x_bubble = filteredSample['otu_ids']
        // var y_bubble = filteredSample['sample_values'],
        // var markerSize = filteredSample['sample_values'],
        // var markerColor = filteredSample['otu_ids'],
        // var labelBubble = filteredSample['otu_labels']

        console.log("x_bubble")

        data.forEach(function (data) {
            data.sample_values = +data.sample_values;
        });


        // Add X axis
        var x = d3.scaleBand()
            .domain(x_bubble)
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain(d3.extent(data, d => d.sample_values))
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add a scale for bubble size
        var z = d3.scaleLinear()
            .domain(d3.extent(data, d => d.sample_values))
            .range([1, 40]);

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(filteredSample)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.otu_ids); })
            .attr("cy", function (d) { return y(d.sample_values); })
            .attr("r", function (d) { return z(d.sample_values); })
            .style("fill", "#69b3a2")
            .style("opacity", "0.7")
            .attr("stroke", "black")


        var axis_labels = svg.append('g').classed('axis-label', true);

        axis_labels.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("GDP");


        axis_labels.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Happiness");

    })

};





// Update all of the plots any time that a new sample is selected.
function optionChanged(optionSelected) {
    populateDemographic(optionSelected)
    buildCharts(optionSelected)
};



populateSelector();