const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening at port ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));
app.post('/api', async (request, response) => {
  console.log(request.body);

  API_KEY = "2163ce1b70c9d08e42b943a5b83ae1e9";
  const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + request.body.lat + "&lon=" + request.body.lon +  "&exclude=minutely,hourly,daily&units=metric&appid=" + API_KEY
  const weather = await fetch(url);
  const json = await weather.json();
  console.log(json)
  response.json({
    weather: json,
    lat: request.body.lat,
    lon: request.body.lon
  });

});
