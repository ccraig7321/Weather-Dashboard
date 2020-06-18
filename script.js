    // Retrieved the API key from Open Weather Map
    var apiKey = "2acc363cfb6095bf3adabfe6e8c42cc3"
    // var queryURL = "api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}"


    // Array of cities that user will add searches to
    var cities = ["New York", "Los Angeles", "Boston"]

    getWeatherForCity("boston")
    // Calls API using method "GET"
    function getWeatherForCity(cityName) {
        // Calls info from open weather map and then adds personal apiKey to address
        var todayQueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
        // Calls info from open weather map for 5 day forecast
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey

        $.ajax({
            url: todayQueryURL,
            method: "GET"
            // Runs function to process response from API data
        }).then(function (response) {
            console.log(todayQueryURL)
            console.log(response)
            populateToday(response)
            // DATE, Weather Icon, Temp, Humdity
        })

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL)
            console.log(response)

            // Filters through the 3 hours blocks listed in the API
            var fiveDay = response.list.filter(function (item) {
                // Returns T/F for each time block. If T, it returns to the array, if F, it does not.
                return item.dt_txt.includes("12:00:00")
            })
            console.log(fiveDay)
            // DATE, Weather Icon, Temp, Humdity
            displayPanel(fiveDay)
        })
    }


    // Variables for HTML elements
    var cityList = $("#cityList")
    var search = $("#search")
    var searchBtn = $("#searchBtn")
    var today = $("#today")
    var forecast = $("#forecast")

    // Loops through cities array
    for (i = 0; i < cities.length; i++) {
        console.log(cities[i])
        // <li class="list-group-item">City 1</li>

        // Create div, add class "getCity", collect data, then appends it to the cityList
        $("<li>").addClass("getCity list-group-item").text(cities[i]).data("location", cities[i]).appendTo(cityList)
    }
    // If any times in the cityList also have the class of getCity, they will be able to be clicked
    $(cityList).on("click", ".getCity", function (event) {
        $("#weatherPanels").empty()
        console.log($(this).data("location"))
        getWeatherForCity($(this).data("location"))
    })


    function populateToday(data) {
        getUV(data.coord.lat, data.coord.lon)

        
        $("#todayLocation").text(data.name);
        $("#todayTime").text(moment().format("MMMM DD YYYY"));
        $("#todayHumidity").text(data.main.humidity)
        $("#todayWindSpeed").text(data.wind.speed)
        $("#todayTemp").text((data.main.temp - 273.15) * 1.80 + 32).toFixed(2) + " &deg;" + "F";
        // $(fTemp).html(fTemp.toFixed(2) + "&deg;");

        // $("#todayTemp").text(data.main.temp - 273.15) * 1.80 + 32;
        // fTemp = 

        //    lead = ((data.main.temp - 273.15) * 1.80 + 32).toFixed(2) + " &deg;" + "F"
        // $("#todayHumidity").text(data.main.humidity)
        // $("#todayWindSpeed").text(data.wind.speed)
        // $("#todayUV").text()

        // base: "stations"
        // clouds: {all: 75}
        // cod: 200
        // coord: {lon: -75.16, lat: 39.95}
        // dt: 1592345346
        // id: 4560349
        // main: {temp: 296.9, feels_like: 290.84, temp_min: 295.93, temp_max: 298.15, pressure: 1026, …}
        // name: "Philadelphia"
        // sys: {type: 1, id: 5344, country: "US", sunrise: 1592299891, sunset: 1592353887}
        // timezone: -14400
        // visibility: 16093
        // weather: [{…}]
        // wind: {speed: 8.2, deg: 80, gust: 10.8}
    }

    function getUV(lat, lon) {

        var query = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`

        $.ajax({
            url: query,
            method: "GET"
            // Runs function to process response from API data
        }).then(function (response) {
            console.log(query)
            console.log(response)
            $("#todayUV").text(response.value)

        })
    }
    //////////////////////////////////////////////////////////////

    function displayPanel(data) {
        console.log(data)

        for (i = 0; i < data.length; i++) {
            // var panelTemp = $("#panelTemp")
            // var displayPanelArray = [1, 2, 3, 4, 5]

            createPanel(data[i])


        }

        // Defines how to obtain the time, task, save button, and planner row elements


        function createPanel(dataPoint) {
            var panel = $("<div>").addClass("panel panel-default")
            var panelDate = $("<div>").addClass("panel-body").text(moment().format("MMMM DD YYYY"))
            var panelTemp = $("<div>").addClass("panel-body").text(dataPoint.main.temp)
            var fTemp = (dataPoint.main.temp - 273.15) * 1.80 + 32;

            panelTemp = fTemp.toFixed(2) + " &deg;" + "F"
            $(fTemp).html(fTemp.toFixed(2) + "&deg;");
            var panelImg = $("<img>");

            panelImg.attr("src", dataPoint.weather[0].icon)

    //   // Creating an image tag
    //   var personImage = $("<img>");

    //   // Giving the image tag an src attribute of a proprty pulled off the
    //   // result item
    //   personImage.attr("src", results[i].images.fixed_height.url);


            var panelHumidity = $("<div>").addClass("panel-body").text(dataPoint.main.humidity)


            panel.append(panelDate, panelTemp, panelImg, panelHumidity).appendTo($("#weatherPanels"))

        }

        // F = (K - 273.15) * 1.80 + 32
        // var fTemp = (weatherData.main.temp - 273.15) * 1.80 + 32;

        // <div class="panel panel-default">
        // <div class="panel-body">A Basic Panel</div>
        // </div>

        // console.log(panelDate)
    }
// citiesButton()
// $(".saveBtn").on("click", function(event){
//     var el = $(this)
//     var theTime = el.data("time")

//     citiesButton(theTime)
//     console.log("click")
// })

// function storeData(data, //cityName???// ){
//     // Moving items to local storage after they've been saved
//     localStorage.setItem(name, JSON.stringify(data));
// }

// // Function that will take data out of local storage and parse it
// function retrieveData(name){
//     return JSON.parse(localStorage.getItem(name))
// }


// // If not time array, set it to default TimeArray
// var timeArray = retrieveData("timeArray") || defaultTimeArray

// // Will be hours on scheduler
// var timeBlock = $("#timeBlock")
// // Using moment JS to format date from military time to standard time
// var displayTime = moment().format("h a")
// console.log(moment().format("dddd MMMM DD YYYY"))
// // Retrieving date from the current day
// $("#currentDay").text(moment().format("dddd MMMM DD YYYY"))

// // Using moment JS to retrieve current time for planning blocks
// var currentHour = moment().format("HH")

// Search button icon
// var saveBtn = $("<div></div>").addClass("saveBtn col-1 ").data("time", timeObj.time).append("<i class='fa fa-save'></i>"); //appends save icon to save button area
/* <i class="fa fa-search" aria-hidden="true"></i> */