const key = '28b0799543359e8e6ed8330d199b4ccc';


const weatherForm = document.querySelector('.weather-form');
const weatherDiv = document.querySelector('.weatherDiv');
const error = document.querySelector('.error');


weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const weatherVal = weatherForm.city.value.trim();
    if (weatherVal !== '') {
        getCity(weatherVal)
            .then(data => getWeather(data.city.id))
            .then(data => renderWeather(data))
            .catch(err => showError())
        weatherForm.reset();
    } else {
        showError();
    }

  

})


const getCity = async (city) => {

        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=5&&lang=ru&appid=${key}`)
        const data = await res.json();
        console.log(data)
        return data;
}

const getWeather = async (id) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&cnt=5&&lang=ru&appid=${key}`)
        const data = await res.json();
        console.log(data)
        return data;

       
}




const renderWeather = (data) => {

    weatherDiv.innerHTML = '';
    weatherDiv.innerHTML += `<h2>${data.city.name}</h2>`;
    weatherDiv.innerHTML += `<div class="weather-unit-wrapper row"></div>`;
    let weatherUnitWrapper = document.querySelector('.weather-unit-wrapper');

    for (var i = 0; i < 5; i++) {
        let imgId = data.list[i].weather[0].icon;

        const template = `
            <div class="weather-unit col s12 m6 l2">
                <h5>${data.list[i].dt_txt.slice(-8,-3)}</h5>
                <h5>${data.list[i].main.temp}&deg;</h5>
                <p>${data.list[i].weather[0].description}</p>
                <img src="http://openweathermap.org/img/w/${imgId}.png">
            </div>
        `
        weatherUnitWrapper.innerHTML += template;
    }
        weatherDiv.innerHTML += `<button onclick = "clearWeather()" class="btn green clearWeatherButton" style="display: block; margin: auto;">Очистить</button>`;

    
}


const clearWeather = () => {

    weatherDiv.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            weatherDiv.innerHTML = '';
        }
    })
}

const showError = () => {
        error.innerHTML = `<h6>Город не найден. Проверьте правильность написания!</h6>`;
        error.classList.add('error-styling');
        setTimeout(() => {
            error.innerHTML = '';
            error.classList.remove('error-styling');
        }, 3000)
}




