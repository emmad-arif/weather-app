  /*
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(160, 120);
  let lat, lon;
   const button = document.getElementById('submit');

  button.addEventListener('click', async event => {
    const mood = document.getElementById('mood').value;
    video.loadPixels();
    const image64 = video.canvas.toDataURL();
    const data = { lat, lon, mood, image64 };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
  });
  */
  if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
      console.log(position)
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      console.log(lat, lon);
      var latitude = lat.toString();
      var longitude = lon.toString();
      document.getElementById('latitude').textContent = latitude.substring(0,9);
      document.getElementById('longitude').textContent = longitude.substring(0,9);

      const data = { lat, lon};
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const stream = await fetch('/api', options);
      const response = await stream.json();
      console.log(response);
      updateWeather(response);
      });

    }
    else {
    console.log('geolocation not available');
  }

function updateWeather(weather) {
  timeZone = weather.weather.timezone;
  console.log(weather.weather.current.dt)
  var currentTime = new Date(weather.weather.current.dt * 1000).toLocaleString("en-US", {timeZone: timeZone}).split(", ")[1];
  var sunrise = new Date(weather.weather.current.sunrise * 1000).toLocaleString("en-US", {timeZone: timeZone}).split(", ")[1];
  var sunset = new Date(weather.weather.current.sunset * 1000).toLocaleString("en-US", {timeZone: timeZone}).split(", ")[1];

  document.getElementById('sunrise').textContent = sunrise;
  document.getElementById('sunset').textContent = sunset;
  document.getElementById('temp').textContent = weather.weather.current.temp;
  document.getElementById('clouds').textContent = weather.weather.current.clouds;
  document.getElementById('uvi').textContent = weather.weather.current.uvi;
  document.getElementById('dew_point').textContent = weather.weather.current.dew_point;
  document.getElementById('feels_like').textContent = weather.weather.current.feels_like;
  document.getElementById('humidity').textContent = weather.weather.current.humidity;
  document.getElementById('pressure').textContent = weather.weather.current.pressure;
  document.getElementById('visibility').textContent = weather.weather.current.visibility;
  document.getElementById('description').textContent = weather.weather.current.weather[0].description;

  console.log(currentTime);
}
