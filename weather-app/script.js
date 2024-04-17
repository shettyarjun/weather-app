const weatherform = document.querySelector('.weatherform');
const search = document.querySelector('input');
const card = document.querySelector('.card');
const citydisplay = document.querySelector('.city');
const tempdisplay = document.querySelector('.temp');
const weatherdisplay = document.querySelector('.weather');
const humiditydisplay = document.querySelector('.humidity');
const winddisplay = document.querySelector('.wind');
const emojidisplay = document.querySelector('.emoji');
const errordisplay = document.querySelector('.errordisp');

weatherform.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        try {
            const weatherdata = await getWeather(city);
            displayweatherinfo(weatherdata);

        } catch (error) {

            displayerror('enter a valid city');
        }
    }
    else {
        displayerror('enter a city name');

    }

});

async function getWeather(city) {

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b6bcaf6840mshf75e803279530bbp136e5djsn49350b2d4dc3',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Could not fetch the data');
        }
        return await response.json();
    } catch (error) {
        displayerror("Please enter a valid city");
        console.error(error);
    }
}

function displayweatherinfo(data) {
    console.log(data);
    const { location, current } = data;
    card.textContent = '';

    citydisplay.textContent = location.name;
    tempdisplay.textContent = `${current.temp_c}℃ `;
    weatherdisplay.textContent = current.condition.text;
    humiditydisplay.textContent = `Humidity: ${current.humidity}%`;
    winddisplay.textContent = `Wind: ${current.wind_kph} km/h`;
    const emoji = displaytheemoji(current.condition.text);
    emojidisplay.textContent = emoji;
    card.style.display = 'block';
    card.append(citydisplay);
    card.append(tempdisplay);
    card.append(weatherdisplay);
    card.append(humiditydisplay);
    card.append(winddisplay);
    card.append(emojidisplay);


}

function displayerror(message) {
    errordisplay.textContent = message;
    card.textContent = '';
    errordisplay.style.display = 'block';
    card.style.display = 'block';
    card.appendChild(errordisplay);

}

function displaytheemoji(weather) {
    let emoji = '';
    switch (weather) {
        case 'Sunny':
            emoji = '☀️';
            break;
        case 'Rain':
            emoji = '🌧️';
            break;
        case 'Cloudy':
            emoji = '☁️';
            break;
        case 'Snow':
            emoji = '❄️';
            break;
        case 'Fog':
        case 'Mist':
        case 'Haze':
            emoji = '🌫️';
            break;
        case 'Thunderstorm':
            emoji = '⛈️';
            break;
        case 'Clear':
            emoji = '☀️';
            break;
        case 'Partly cloudy':
            emoji = '⛅';
            break;
        default:
            emoji = '🤷';
            break;
    }

    return emoji;
}
