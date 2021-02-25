// from data.js
var tableData = data;


function appendTable(report) {
    var tbody = d3.select("tbody");

    var row = tbody.append("tr");

  
    Object.entries(report).forEach(([key, value]) => {

        
        var cell = row.append("td");
        cell.text(value);

        
        if (key === "comments") {
            cell.attr("class", "record-comments")
        }
    });
}

tableData.forEach(appendTable);


var submit = d3.select("#filter-btn");



submit.on("click", function() {


d3.select("tbody").html("");


d3.event.preventDefault();

var dateTime = d3.select("#datetime").property("#text");
console.log(dateTime);



function _filter(row) {
    var text = row.textContent, val = dateTime.value;
    row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
    }
tableData.forEach.call(tableData.rows, _filter);


});



// Filter data when clicking
submit.on("click", function() {

     // Remove existing table
    d3.select("tbody").html("");

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Get the value property of the input element
    var dateTime = d3.select("#datetime").property("value");
    console.log(`Date: ${dateTime}`);

    // Define filter function
    function filterData(data, key, selectedValue) {
        var filteredData = data.filter(record => 
            record[key] === selectedValue
        );
        return filteredData
    }

    // Filter reports
    var filteredData = tableData;
    if (dateTime) {
        filteredData = filterData(filteredData, 'datetime', dateTime)
    }
    
    var flag = d3.select("#no-matching-flag");
    flag.html("");
    if (filteredData.length === 0) {
        var row = flag.append("h3");
        row.text("No matching record.")
    }
    else {
        filteredData.forEach(appendTable);
    }
});