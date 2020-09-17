const app = {};


// To get the city with API
app.getcity = function (city) {

    $.ajax({
        url: `http://api.weatherstack.com/current?access_key=70bd66af19453c9bba14abb4f37df79f&query=${city}`,
        method: 'GET',
        dataType: 'jsonp'
    }).then(function (result) {
        console.log(result);
        //Local Date & Time
        const dateTime = moment(result.location.localtime);
        //Formatting date
        const formatDate = dateTime.format('MMM Do YYYY');
        $('.localTime .date').html(formatDate);
        //Formatting Time
        const formatTime = dateTime.format('hh:mm A')
        $('.time').html(formatTime);

        const test = result.current.weather_descriptions[0]
        //Weather Description
        $('.weatherInfo p').html(`${result.current.weather_descriptions[0]}`);
        //Location Info
        $('.cityResult').html(`${result.location.name}, ${result.location.region}, ${result.location.country}`);
        //Local Temp.
        $('.temperatureResult').html(`${result.current.temperature} &#8451`);
        //Local Humidity
        $('.humidityResult').html(`${result.current.humidity} %`);
        //Local Feels like
        $('.feelsLikeResult').html(`${result.current.feelslike} &#8451`);


        //Shows if day or night
        const dayNight = (result.current.is_day);
        if (dayNight === "no") {
            //Night
            console.log('Its Night');
            $('body').removeClass('day');
            $("video").remove();
            $('body').addClass('night');
            $('.temperature').css('color', '#39abb0');
            $('h1').css('color', '#05aebf');
            $('.search,.search input,.localTime,.weatherInfo').css('color', '#05AEBF')
        } else {
            //Day
            console.log('Its day');
            $('body').removeClass('night');
            $("video").remove();
            $('body').addClass('day');
            $('.temperature').css('color', '#0e2e6c');
            $('h1').css('color', '#000');
            $('.search,.search input,.localTime,.weatherInfo').css('color', '#000');
        }
    })

}

app.init = function () {

    $('.search').on('submit', function (event) {
        event.preventDefault();
        const city = $('#cityName').val();
        app.getcity(city);
    })
}

$(function () {
    app.init();
});

