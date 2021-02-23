// from data.js
var tableData = data;

// YOUR CODE HERE!
var button = d3.select("#filter-btn");

button.on("click", function() {
var Parent = document.getElementById("ufo-table");

for(var i = Parent.rows.length - 1; i > 0; i--)
{
    Parent.deleteRow(i);
};

var inputElement_date = d3.select("#datetime");


var inputValue_date = inputElement_date.property("value");

var filteredData = tableData.filter(tData => tData.datetime === inputValue_date);
    console.log(filteredData);


var tbody = d3.select("tbody");


var table = d3.select("table");

table.attr("class", "table table-striped");
    

filteredData.forEach((tabData) => {

  var row = tbody.append("tr");

 Object.entries(tabData).forEach(([key, value]) => {
    var cell = row.append("td");
    cell.text(value);
  });
});

});