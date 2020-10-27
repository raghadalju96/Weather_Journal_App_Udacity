/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=841d8ce26c9ec8e048f0178f0fdc38cd&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("genrate").addEventListener("click", performance);

function performance(e) {
  e.preventDefault();
  const feeling = document.getElementById("feelings").value;
  const zip = document.getElementById("zip").value;

  getWeather(baseURL, zip, apiKey)
    .then(function (data) {
      console.log(data);
      postData("/postAllData", {
        feeling: feeling,
        temp: data.main.temp,
        date: newDate,
      });
    })
    .then(function () {
      updateUI();
    });
}

const getWeather = async (baseURL, zip, apiKey) => {
  const req = await fetch(baseURL + zip + apiKey);
  try {
    const weatherData = await req.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log("Error", error);
  }
};

//POST Async
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};

const updateUI = async () => {
  const req = await fetch("/all");

  try {
    const updatedData = await req.json();
    document.getElementById("title").innerHTML = "Most Recent Entry";
    document.getElementById("date").innerHTML = "Date: " + updatedData.date;
    document.getElementById("temp").innerHTML = updatedData.temp;
    document.getElementById("content").innerHTML =
      "Feelings: " + updatedData.feeling;
  } catch (error) {
    console.log("Error", error);
  }
};
