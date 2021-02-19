// from data.js
var tableData = data;

// YOUR CODE HERE!
var button = d3.select("#filter-btn");

button.on("click", function() {
var Parent = document.getElementById("ufo-table");
//Cleaning table everytime when new search is performed.
for(var i = Parent.rows.length - 1; i > 0; i--)
{
    Parent.deleteRow(i);
};
// Select the input element for different search
var inputElement_date = d3.select("#datetime");

// Get the value property of the input element
var inputValue_date = inputElement_date.property("value");
//Condition for each input search
//Check if city is null and load only date
var filteredData = tableData.filter(tData => tData.datetime === inputValue_date);
    console.log(filteredData);

// Use D3 to select the table body
var tbody = d3.select("tbody");

// Use D3 to select the table
var table = d3.select("table");
// Use D3 to set the table class to `table table-striped`
table.attr("class", "table table-striped");
    
// Iterate through each student/grade pair
filteredData.forEach((tabData) => {
//
//  // Append one table row per input
  var row = tbody.append("tr");

 Object.entries(tabData).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
});

});