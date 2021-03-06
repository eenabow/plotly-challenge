function getData(id) {
// Fetch the JSON data and console log it
d3.json("samples.json").then(function(sampleData) {
  console.log(sampleData);
  var sample_values = sampleData.samples[0].sample_values.slice(0,10).reverse();
  console.log(sampleValues);
  var otu_ids = sampleData.samples[0].otu_ids;
  console.log(otu_ids);
  var otu_labels = sampleData.samples[0].otu_labels.slice(0,10);
  console.log(otu_labels)
});

// Clear any existing sample data 
sampleData.html("");

};