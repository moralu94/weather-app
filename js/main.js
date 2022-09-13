const ubiContainer = document.querySelector('.ubication-container')
const weaContainer = document.querySelector('.weather-container')
const back = document.querySelector('#back')
const btnGeolocation = document.querySelector('#btn-geolocation')
const spinner = document.querySelector('.spinner')

weaContainer.style.display = 'none'
ubiContainer.style.display = 'block'
const api_key = '393d89c18ec222fbaeea1d230c4accc5'

const input = document.querySelector('input')
let inputLocation = document.querySelector('#input-location')
input.addEventListener('keyup', (e) => {
     if (e.key == 'Enter' && inputLocation.value != '') {
          let url = (`https://api.openweathermap.org/data/2.5/weather?q=${inputLocation.value}&units=metric&appid=${api_key}`);
          request(url)
     };
})

back.addEventListener('click' , () => { changeContainer() })
btnGeolocation.addEventListener('click' , () => { 
     navigator.geolocation.getCurrentPosition(success, error)

     function success(position){
          let lon = position.coords.longitude
          let lat = position.coords.latitude
          let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=393d89c18ec222fbaeea1d230c4accc5`
          request (url)
     }
     function error (err) {
          if (err.code == err.PERMISSION_DENIED) { window.alert('Geolocation Denied. Check your settings.') }
     }
})

function request (url){
     const urlResponse = fetch (url)
     urlResponse
     .then ( response => {
          return response.json()
     })
     .then ( data =>{
          if (data.message == 'city not found') window.alert('City not found. Please check the field.')
          else {
               console.log(data);
               changeContainer()
               loadData(data)
          }
     })
     .catch ( err => {
          console.error(err)
     })

}

function changeContainer() {
     if (weaContainer.style.display == 'none'){
          ubiContainer.style.display = 'none'
          spinner.style.display = 'block'
          setTimeout(function(){
               spinner.style.display = 'none'
               weaContainer.style.display = 'block'
          },3000);
     } else {
          weaContainer.style.display = 'none'
          ubiContainer.style.display = 'block'
     }
}

function loadData(data) {
     let weatherIcon = document.getElementById('weather-icon')
     let temperature = document.getElementById('temperature')
     let description = document.getElementById('description')
     let place = document.getElementById('place')
     let feelsLike = document.getElementById('fe-temp')
     let humidity = document.getElementById('humidity')

     weatherIcon.src = selectIcon(data)
     temperature.textContent = `${Math.round(data.main.temp)}°C`
     description.textContent = capitalize(data.weather[0].description)
     place.textContent = data.name
     feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`
     humidity.textContent = `${data.main.humidity}%`
}

function selectIcon(data) {
     switch (data.weather[0].icon){
          case '01d': 
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/clear-day.svg'
          case '01n':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/clear-night.svg'
          case '02d':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/partly-cloudy-day.svg'
          case '02n':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/partly-cloudy-night.svg'
          case '03d': 
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/cloudy.svg'
          case '03n':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/cloudy.svg'
          case '04d':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/overcast-day.svg'
          case '04n':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/overcast-night.svg'
          case '09d':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/overcast-rain.svg'
          case '09n':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/overcast-rain.svg'
          case '10d':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/overcast-day-rain.svg'
          case '10n':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/overcast-night-rain.svg'
          case '11d':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/thunderstorms.svg'
          case '11n':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/thunderstorms.svg'
          case '13d':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/snow.svg'
          case '13n':
               return 'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/snow.svg'
          case '50d':
               return'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/mist.svg'
          case '50n':
               return'https://raw.githubusercontent.com/basmilius/weather-icons/87a143a3ca6a50d8e9cbd0f38eb3f31d7cf48053/production/fill/svg/mist.svg'
     }
}

function capitalize(string) {
     return string[0].toUpperCase() + string.slice(1);
}