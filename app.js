  
const express = require("express");
const app = express();
const https = require("https");
app.use(express.urlencoded({ extended: true })); // for parsing the HTTP request

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log("Post request received.");
  const query = req.body.cityName;
  const appId = "XXX";
  const units = "metric";
  const urlApi =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    appId +
    "&metric&units=" +
    units;

  https.get(urlApi, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data); 
      const temp = weatherData.main.temp; 
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(weatherDescription);
      res.write(
        "<p>The weather in " +  query + " is currently " +     weatherDescription +    "</p>" );
      res.write("<img src = '" + imageUrl + "' alt='Current weather'>");
      res.write("<h1>The temperature in the city is " + temp + " celcius</h1>");
      res.send();

 
  });
});

app.listen(3000, function() {
  console.log("Listening on port 3000.");
});

