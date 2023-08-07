const app = {
    init: () => {
        document
            .getElementById('searchBtn')
            .addEventListener('click', function (event) {
                let city = document.getElementById('cityInput').value;
                app.getWeather(city)
            });


    },
    getWeather: (city) => {
        let key = '9dd2102ab00251bf95475e58c5ecfec5';
        let units = 'imperial';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${key}`;

        fetch(url)
            .then(resp => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then((data) => {
                console.log(data)
                app.get5Day(data.coord.lat, data.coord.lon)
                app.showWeather(data);
                app.storeCity(data.name);
                // app.makeBtn(data, data.name);
            })
            .catch(console.error)
    },
    get5Day: (lat, lon) => {

        let key = '9dd2102ab00251bf95475e58c5ecfec5';
        let Oneurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${key}`;
        fetch(Oneurl)
            .then(resp => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then((data2) => {
                console.log(data2);
                app.show5Day(data2);
                // app.makeBtn(data2);
            })
            .catch(console.error)
    },
    showWeather: (data) => {
        var city = data.name;
        $('#yourCity').text("City:" + " " + city);
        var temp = data.main.temp;
        $('#temp').text("Temp:" + " " + temp + " degrees");
        var tempIcon = data.weather[0].icon;
        $('#tempIcon').attr('src', `https://openweathermap.org/img/wn/${tempIcon}@4x.png`);
        var humid = data.main.humidity;
        $('#humid').text("Humidity:" + " " + humid + "%");
        var wind = data.wind.speed;
        $('#wind').text("Wind speed:" + " " + wind + " mph");

        localStorage.setItem("pastCity", JSON.stringify(data));
    },
    show5Day: (data2) => {
        console.log(data2);

        for (i = 0; i < 5; i++) {

            var forecastDate = moment.unix(data2.daily[i].dt).format('ddd, MM/DD/YYYY');
            $('#forecastDate' + i).text(forecastDate);
            var dayIcon = data2.daily[i].weather[0].icon
            $('#weatherIcon' + i).attr('src', 'https://openweathermap.org/img/wn/' + dayIcon + '@2x.png');
            var temp1 = data2.daily[i].temp.day
            $('#tempFore' + i).text("temp: " + temp1 + " degrees");
            var windyFore = data2.daily[i].wind_speed
            $('#windyFore' + i).text("Wind speed: " + windyFore + " mph");
            var humidityFore = data2.daily[i].humidity
            $('#humidityFore' + i).text("Humidity: " + humidityFore + "%");

            // hoisted to current day and city card or func showWeather
            var uv = data2.current.uvi
            $('#uv').text("UV Index: " + uv);

            if (uv < 2) {
                document.getElementById("uv").style.color = "green";
            }
            if (uv > 2 && uv <= 5) {
                document.getElementById("uv").style.color = "yellow";
            }
            if (uv > 5 && uv <= 7) {
                document.getElementById("uv").style.color = "orange";
            }
            if (uv > 7) {
                document.getElementById("uv").style.color = "red";
            }
            localStorage.setItem("fiveDay", JSON.stringify(data2));
        }

    },
    storeCity: (name) => { 
        // save multiple locations to an empty array for a click on callback of data
        // after they are appended below the search bar
        var recentLocations = [];
        if (localStorage.getItem("history")) {
            recentLocations = JSON.parse(localStorage.getItem('history'))
        }

        if (!recentLocations.includes(name.toLowerCase())) {
            recentLocations.push(name.toLowerCase());
        }

        localStorage.setItem("history", JSON.stringify(recentLocations));
        app.makeBtn(recentLocations)
    },
    makeBtn: (arr) => {
        var add = document.getElementById('cityBank');
        add.innerHTML = "";

        for (i = 0; i < arr.length; i++) {
            var addLi = document.createElement('li');
            var addBtn = document.createElement('button');
            addBtn.innerHTML = arr[i];
            addLi.append(addBtn);

            addLi.addEventListener("click", function (ev) {
                console.log(ev.target.textContent)
                app.getWeather(ev.target.textContent)
            })
            add.append(addLi);
        }
    }
}

app.init();


var bAPIKey = "f96fdb87a2d230037fd794660dc95fbd";
var city;
var recentLocations = [];
if (localStorage.getItem("history")) {
    recentLocations = JSON.parse(localStorage.getItem('history'))
}
app.makeBtn(recentLocations)

var searchContainer = document.getElementById('citySearch');
var citySearchBar = document.getElementById('cityInput');
var searchBtn = document.getElementById('searchBtn');

var dateEl = document.getElementById('date')
var today = moment().format("dddd, MMM Do YY");
dateEl.textContent = today;

var recentLocations = [];
var pastCity = "";



// graveyard:

// function storeCity(){
//     var recentLocations = [];
//     pastCity = document.getElementById('cityInput').value;
//     console.log(pastCity);
//     var addLi = $("<li>");
//     var cityBtn = $('<button>');
//     $('#citySearch').text(pastCity);

//     if (recentLocations.indexOf(pastCity) === -1){
//         cityBtn.addClass('title btn-large');
//         cityBtn.text(pastCity);
//         addLi.append(cityBtn);
//         $('#buttonList').append(addLi);
//         recentLocations.push(pastCity);
//     }
//     // document.getElementById('searchBtn')
//     // .addEventListener('click', storeCity());
//     // $('#searchBtn').click(function (event){
//     //     event.preventDefault();
//     //     storeCity();
//     // })
//     storeCity();
// }


// function cityClick(){
//  document.getElementById('searchBtn')
//  .addEventListener('click', cityClick);
// recentLocations.push($('#cityInput').val());
//     $('#cityInput').val("");
//     $('#cityBank').text("");

//     $.each(recentLocations, function (index, value){
//         $('#cityBank').append("<li><button class='recentCity' onclick='addtotextbox(" + index +")'>" + value + '</button></li>');
//     });
// }

// function addtotextbox(id){
//     $('#cityInput').val(recentLocations[id]);
// }

// cityClick();


