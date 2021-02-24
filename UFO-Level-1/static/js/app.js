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

// Part 1: Use a date form in your HTML document and write JavaScript code that will listen for events and search through the date/time column to find rows that match user input.


submit.on("click", function() {


d3.select("tbody").html("");


d3.event.preventDefault();

var dateTime = d3.select("#datetime").property("#text");
console.log(dateTime);


var filteredData = (tableData).filter(function() { ((tableData).toggle((tableData).text().indexOf(dateTime) > -1))});
console.log(filteredData)


filteredData.forEach(appendTable);

});

// Part 2: Using multiple input tags and/or select dropdowns, write JavaScript code so the user can set multiple filters and search for UFO sightings using the following criteria based on the table columns: date/time, city, state, country, shape



var countries = [];
tableData.forEach(record => {
    if (!(countries.includes(record.country))) {
        countries.push(record.country)
    }
});
var countryMenu = d3.select('#countryDropdown');
countries.forEach(country => {
    var item = countryMenu.append("option");
    item.text(country.toUpperCase())
})


var shapes = [];
tableData.forEach(record => {
    if (!(shapes.includes(record.shape))) {
        shapes.push(record.shape)
    }
});
var shapeMenu = d3.select('#shapeDropdown');
shapes.forEach(shape => {
    var item = shapeMenu.append("option");
    item.text(shape)
})


countryMenu.on('change', function(){

    
    var selectedCountry = d3.select(this).property("value").toLowerCase();
    // var selectedCountry = d3.event.target.value;
  
     var tableDataCountry = tableData.filter(record => record.country === selectedCountry);
    var states = [];
    tableDataCountry.forEach(record => {
        if (!(states.includes(record.state))) {
            states.push(record.state)
        }
    });
    var stateMenu = d3.select('#stateDropdown');
    stateMenu.html('<option class="optionPlaceholder">all</option>')
    states.forEach(state => {
        var item = stateMenu.append("option");
        item.text(state.toUpperCase())
    })
    var cityMenu = d3.select('#cityDropdown');
    cityMenu.html('<option class="optionPlaceholder">all</option>')

    
    stateMenu.on('change', function(){

       
        var selectedState = d3.select(this).property("value").toLowerCase();
    
        
        var tableDataState = tableDataCountry.filter(record => record.state === selectedState);
        var cities = [];
        tableDataState.forEach(record => {
            if (!(cities.includes(record.city))) {
                cities.push(record.city)
            }
        });
        cityMenu.html('<option class="optionPlaceholder">all</option>')
        cities.forEach(city => {
            var item = cityMenu.append("option");
            item.text(city)
        })
    });
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
    var selectedCountry = d3.select("#countryDropdown").property("value").toLowerCase();
    console.log(`Country: ${selectedCountry}`);
    var selectedState = d3.select("#stateDropdown").property("value").toLowerCase();
    console.log(`State: ${selectedState}`);
    var selectedCity = d3.select("#cityDropdown").property("value").toLowerCase();
    console.log(`City: ${selectedCity}`);
    var selectedShape = d3.select("#shapeDropdown").property("value").toLowerCase();
    console.log(`Shape: ${selectedShape}`);

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
    if (selectedCountry !== "all") {
        filteredData = filterData(filteredData, 'country', selectedCountry)
    }
    if (selectedState !== "all") {
        filteredData = filterData(filteredData, 'state', selectedState)
    }
    if (selectedCity !== "all") {
        filteredData = filterData(filteredData, 'city', selectedCity)
    }
    if (selectedShape !== "all") {
        filteredData = filterData(filteredData, 'shape', selectedShape)
    }

    // Display the filtered dataset
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