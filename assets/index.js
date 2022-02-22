const app = {
    init: () => {
        document
        .getElementById('searchBtn')
        .addEventListener('click', app.getWeather);
        // document
        // .getElementById('searchBtn')
        // .addEventListener('click', app.get5Day);

    },
    getWeather: (ev) =>{
        let city = document.getElementById('cityInput').value;
        let key = '9dd2102ab00251bf95475e58c5ecfec5';
        let units = 'imperial';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${key}`;
        
        fetch(url)
        .then(resp=>{
            if(!resp.ok) throw new Error(resp.statusText);
            return resp.json();
        })
        .then((data)=>{
            console.log(data)
            app.get5Day(data.coord.lat, data.coord.lon)
            app.showWeather(data);
        })
        .catch(console.error)
    },
    get5Day: (lat, lon) => {
        
        let key = '9dd2102ab00251bf95475e58c5ecfec5';
        let Oneurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${key}`;
        fetch(Oneurl)
        .then(resp=>{
            if(!resp.ok) throw new Error(resp.statusText);
            return resp.json();
        })
        .then((data)=>{
            console.log(data);
            app.show5Day(data);
        })
        .catch(console.error)
    },
    showWeather: (data)=> {
        var city = data.name;
        $('#yourCity').text("City:" + " " + city);
        var temp = data.main.temp;
        $('#temp').text("Temp:" + " " + temp + " degrees");
        var tempIcon= data.weather[0].icon;
        $('#tempIcon').attr('src', `https://openweathermap.org/img/wn/${tempIcon}@4x.png`);
        var humid = data.main.temp;
        $('#humid').text("Humidity:" + " " + humid + "%");
        var wind = data.wind.speed;
        $('#wind').text("Wind speed:" + " " + wind + " mph");
    },
    show5Day: (data)=> {
        // console.log(data);
       
        for(i=0; i<5;i++){
            var forecastDate =moment.unix(data.daily[i].dt).format('dddd, MM/DD/YYYY');
            $('#forecastDate' + i).text(forecastDate);
            var dayIcon =data.daily[i].weather[0].icon
            $('#weatherIcon' + i).attr('src','https://openweathermap.org/img/wn/' + dayIcon + '@2x.png');
            var temp1 =data.daily[i].temp.day
            $('#tempFore' + i).text("temp: " + temp1 + " degrees");
            var windyFore = data.daily[i].wind_speed
            $('#windyFore' + i).text("Wind speed: " + windyFore + " mph");
            var humidityFore = data.daily[i].humidity
            $('#humidityFore' + i).text("Humidity: " + humidityFore + "%");
            
            // hoisted to current day and city card or func showWeather
            var uv = data.current.uvi
            $('#uv').text("UV Index: " + uv);
            // var currentDayIcon = data.current.weather.icon
            // $('#tempIcon').attr("test" + currentDayIcon);
        }
    }
}

app.init();

var bAPIKey = "f96fdb87a2d230037fd794660dc95fbd";
var city;
var recentLocations = [];
// city search container
var searchContainer = document.getElementById('citySearch');
var citySearchBar = document.getElementById('cityInput');
var searchBtn = document.getElementById('searchBtn');

var dateEl = document.getElementById('date')
var today = moment().format("dddd, MMM Do YY");
dateEl.textContent = today;

// function cityClick(){
//  document.getElementById('searchBtn')
//  .addEventListener('click', storeCity);
// }

var recentLocations = [];
var pastCity = "";

// function storeCity(){
//     document.getElementById('searchBtn')
//     .addEventListener('click', storeCity);
//     pastCity = $('#cityInput').val().trim();
//     var cityList = $('<li>');
//     var cityBtn = $('<button>');
//     $('#').text(pastCity);

//     if (recentLocations.indexOf(pastCity) === -1){
//         cityBtn.addClass('title btn-large');
//         cityBtn.text(pastCity);
//         cityList.append(cityBtn);
//         $('#cityBank').append(cityList);
//         recentLocations.push(pastCity);
//     }

// }
// storeCity();

function cityClick(){
 document.getElementById('searchBtn')
 .addEventListener('click', cityClick);
recentLocations.push($('#cityInput').val());
    $('#cityInput').val("");
    $('#cityBank').text("");

    $.each(recentLocations, function (index, value){
        $('#cityBank').append("<li><button class='recentCity' onclick='addtotextbox(" + index +")'>" + value + '</button></li>');
    });
}

function addtotextbox(id){
    $('#cityInput').val(recentLocations[id]);
}

cityClick();


