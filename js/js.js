
loadData = () => {
    var today = new Date();
    var day = today.toString().split(" ")[0];
    var month = today.toString().split(" ")[1];
    var date = today.toString().split(" ")[2];
    document.getElementById("date").innerText = `${day}, ${date} ${month}`;
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        "Geolocation is not supported by this browser.";
    }

    fetch("https://countriesnow.space/api/v0.1/countries/population/cities")
    .then((response) => response.json())
    .then((data) => {
        
        var element = document.getElementById("city-data");
        for(var i = 0; i < data.data.length; i++){
            var option = document.createElement("option");
            option.value = data.data[i].city;
            element.appendChild(option);
        }
        
    })
}
showPosition = (position) => {
    document.getElementById("lat").value = position.coords.latitude;
    document.getElementById("long").value = position.coords.longitude;
}

getWeatherDetails = (id) =>{
    
    var url;
    var cityName = document.getElementById("city-name").value;
    var latitude = document.getElementById("lat").value;
    var longitude = document.getElementById("long").value;
    
    id == "city-name" ? url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ac72c21d822b6d3591e0306a4f4110e6` :
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ac72c21d822b6d3591e0306a4f4110e6`

    
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        
        var regionNames = new Intl.DisplayNames([data.sys.country], {type: 'region'});
        var temp_c = (parseFloat(data.main.temp) - 273);
        var sunset = new Date(data.sys.sunset * 1000);
        var feels_like = (data.main.feels_like - 273);
        var weatherIconCode = data.weather[0].icon;
        var iconUrl = `http://openweathermap.org/img/w/${weatherIconCode}.png`;

        document.getElementById("curr-temp").innerText = `${temp_c.toFixed(0)}`;
        document.getElementById("city").innerText = data.name+", ";
        document.getElementById("country").innerText = regionNames.of(data.sys.country);
        document.getElementById("feels-like").innerText = feels_like.toFixed(2);
        document.getElementById("sunset").innerText = `${sunset.getHours()}:${sunset.getMinutes()}`;
        document.getElementById("speed-value").innerText = `${data.wind.speed} m/s`;
        document.getElementById("humidity").innerText = `${data.main.humidity}%`;
        document.getElementById("pressure-value").innerText = `${data.main.pressure} hPa`;
        $('#wicon').attr('src', iconUrl);
        document.getElementById("w-condition").innerText = `${data.weather[0].main}, ${data.weather[0].description}`;
        document.getElementById("main").style.display = 'block';
        
        
    })
}
darkMode = (id) => {
    var isChecked = document.getElementById(id).checked;

    document.getElementById("body-dark").classList.toggle("body-dark");
    document.getElementById("heading").classList.toggle("color-white");
    document.getElementById("sub-head").classList.toggle("color-white");
    document.getElementById("sub-head-2").classList.toggle("color-white");
    document.getElementById("border-right").classList.toggle("border-right-color");
    document.getElementById("main").classList.toggle("box-shadow");
    document.getElementById("moon").classList.toggle("hide");
    document.getElementById("sun").classList.toggle("d-block");
}