
// Επιλογή στοιχείων της φόρμας, πεδίου και κάρτας εμφάνισης
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
// const apiKey = process.env.API_KEY; //Παίρνω το APIKEY απο τις περιβαλλοντικές μεταβλητές
 const apiKey = "";
//Προσθήκη ακροατή γεγονότων για την υποβολή της φόρμας.
weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try {
            const weatherData = await getWeatherData(city); // Λήψη δεδομένων καιρού για την εισαγόμενη πόλη
            displayWeatherInfo(weatherData); //Εμφάνιση δεδομένων
        } catch (error) {
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

//Κατασκευή μιας ασύγχρονής συνάρτησης για τη λήψη δεδομένων καιρού απο API 
async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl); // Κλήση του API

    if (!response.ok) {
        throw new Error("City not found");
    }

    const data = await response.json(); //Μετατροπή της απάντησης σε μορφή JSON
    return data;
}

//Κατασκευή συνάρτησης για την απεικόνιση των δεδομένων καιρού
function displayWeatherInfo(data){

    const {name: city,
           main: {temp, humidity},
           weather: [{description, id}]} = data;

           card.textContent = "";
           card.style.display = "flex";

           const cityDisplay = document.createElement("h1");
           const tempDisplay = document.createElement("p");
           const humidityDisplay = document.createElement("p");
           const descDisplay = document.createElement("p");
           const weatherEmoji = document.createElement("p");

           cityDisplay.textContent = city;
           tempDisplay.textContent = `${temp}°C`;
           humidityDisplay.textContent = `Humidity: ${humidity}%`;
           descDisplay.textContent = description;
           weatherEmoji.textContent = getWeatherEmoji(id);
           
            cityDisplay.classList.add("cityDisplay");
            tempDisplay.classList.add("tempDisplay");
            humidityDisplay.classList.add("humidityDisplay");
            descDisplay.classList.add("descDisplay");
            weatherEmoji.classList.add("weatherEmoji");
           //Προσθήκη περιεχομένων στο DOM με τη χρήση της μεθόδου appendChild 
           card.appendChild(cityDisplay);
           card.appendChild(tempDisplay);
           card.appendChild(humidityDisplay);
           card.appendChild(descDisplay);
           card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){

    switch(true){
        case(weatherId >= 200 && weatherId <300):
            return "⛈";
        case(weatherId >= 300 && weatherId <400):
            return "🌧";
        case(weatherId >= 500 && weatherId <600):
            return "🌧";
        case(weatherId >= 600 && weatherId <700):
            return "❄";
         case(weatherId >= 700 && weatherId <800):
            return "🌫";
        case(weatherId === 800):
            return "☀";
        case(weatherId >= 801 && weatherId < 810):
            return "☁";
            default:
                return "👾";
    }
    }


function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}