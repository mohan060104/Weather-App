document.addEventListener('DOMContentLoaded', function() {
    const citySelect = document.getElementById('city');
    const getWeatherBtn = document.getElementById('getWeather');
   

    const forecastCards = document.getElementById('forecastCards');
   


    async function getWeatherData(latitude, longitude) {
        const response = await fetch(`https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`);
        const data = await response.json();
        return data;
    }

    async function populateCitiesFromCSV() {
        const response = await fetch('city_coordinates.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n');

        lines.forEach(line => {
            const [latitude, longitude, city, country] = line.split(',');

            const option = document.createElement('option');
            option.value = `${latitude},${longitude}`;
            option.textContent = `${city}`;

            citySelect.appendChild(option);
        });
    }
    
    city.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) { // Check if Enter key is pressed
            event.preventDefault(); // Prevent the default action of the Enter key (submitting a form)
            getWeatherBtn.click(); // Programmatically trigger a click on the "Get Weather" button
        }
    });
    
    function createForecastCard(day) {
        const card = document.createElement('div');
        card.classList.add('forecast-card');
    
        const weatherIcon = document.createElement('img');
        weatherIcon.src = getWeatherIcon(day.weather);
        weatherIcon.alt = day.weather; // Provide an alternative text for accessibility
        card.appendChild(weatherIcon);
    
        const dateElement = document.createElement('p');
        dateElement.textContent = `Date: ${day.date}`;
        card.appendChild(dateElement);
    
        const weatherElement = document.createElement('p');
        weatherElement.textContent = `Weather: ${day.weather}`;
        card.appendChild(weatherElement);
    
        const maxTempElement = document.createElement('p');
        maxTempElement.textContent = `Max Temperature: ${day.temp2m.max}°C`;
        card.appendChild(maxTempElement);
    
        const minTempElement = document.createElement('p');
        minTempElement.textContent = `Min Temperature: ${day.temp2m.min}°C`;
        card.appendChild(minTempElement);
    
        const windElement = document.createElement('p');
        windElement.textContent = `Max Wind Speed: ${day.wind10m_max} m/s`;
        card.appendChild(windElement);
    
        // Set background image based on weather type
        card.style.backgroundImage = `url(${getWeatherGif(day.weather)})`;

        return card;
    }
        

        function getWeatherIcon(weather) {
            switch (weather) {
                case 'lightrain':
                    return 'images/lightrain.png';
                case 'clearsky':
                    return 'images/clear.png';
                case 'pcloudy':
                    return 'images/pcloudy.png';
                case 'cloudy':
                    return 'images/cloudy.png';
                case 'fog':
                    return 'images/fog.png';
                case 'snow':
                    return 'images/snow.png';
                case 'showers':
                    return 'images/showers.png';
                case 'rain':
                    return 'images/rain.png';
                case 'thunderstorm':
                    return 'images/tstorm.png';
                case 'humid':
                        return 'images/humid.png';
                case 'occasionalshower':
                        return 'images/oshower.png';
                case 'rainsnow':
                        return 'images/rainsnow.png';
                case 'thunderstormrain':
                        return 'images/tsrain.png';
                case 'windy':
                        return 'images/windy.png';
                case 'isolatedshower':
                        return 'images/ishower.png';    
                default:
                    return 'images/mcloudy.png';
            }
        }
        function getWeatherGif(weather) {
            switch (weather) {
                case 'lightrain':
                    return 'gifs/lightrain.gif';
                case 'clear':
                    return 'gifs/clear.gif';
                case 'pcloudy':
                    return 'gifs/partlycloudy.gif';
                case 'cloudy':
                    return 'gifs/cloudy.gif';
                case 'verycloudy':
                    return 'gifs/verycloudy.gif';
                case 'fog':
                    return 'gifs/fog.gif';
                case 'snow':
                    return 'gifs/snow.gif';
                case 'showers':
                    return 'gifs/showers.gif';
                case 'rain':
                    return 'gifs/rain.gif';
                case 'tstorm':
                    return 'gifs/thunderstorm.gif';
                case 'humid':
                    return 'gifs/humid.gif';
                case 'oshower':
                    return 'gifs/oshower.gif';
                case 'rainsnow':
                    return 'gifs/rainsnow.gif';
                case 'tsrain':
                    return 'gifs/tsrain.gif';
                case 'windy':
                    return 'gifs/windy.gif';
                case 'ishower':
                    return 'gifs/ishower.gif';    
                default:
                    return 'gifs/default.gif';
            }
        }
        
        function addCardToDOM(card) {
            forecastCards.appendChild(card);
        }
    
        async function displayWeatherInfo(weatherData) {
            const dataseries = weatherData.dataseries;
    
            dataseries.forEach(day => {
                const card = createForecastCard(day);
                addCardToDOM(card);
            });
        }
    
      async function getWeather() {
        const selectedCity = citySelect.value;
        const [latitude, longitude] = selectedCity.split(',');
    
        const weatherData = await getWeatherData(latitude, longitude);
    
        // Clear previous forecasts
        forecastCards.innerHTML = '';
    
        displayWeatherInfo(weatherData);
    }
    
    getWeatherBtn.addEventListener('click', getWeather);

    populateCitiesFromCSV();
});








