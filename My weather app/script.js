setImage = (url) => {
  return "<img src='" + url + "'>";
};
resetOldWeather = () => {
  document.getElementById("tableForWeather").innerHTML =
    "<tr>" +
    "<th>" +
    "City" +
    "</th>" +
    "<th>" +
    "Country" +
    "</th>" +
    "<th>" +
    "Local time" +
    "</th>" +
    "<th>" +
    "Temperature" +
    "</th>" +
    "<th>" +
    "Feels like" +
    "</th>" +
    "<th>" +
    "Condition" +
    "</th>" +
    "<th>" +
    "Outside" +
    "</th>" +
    "<th>" +
    "Wind speed" +
    "</th>" +
    "<th>" +
    "Humidity" +
    "</th>" +
    "</tr>";
};
//Old non async code:

// getWeather=()=>{
//     let city=document.getElementById("city").value;
//     let url="http://api.weatherapi.com/v1/current.json?key=4154b597c4f44a42926143608212707&q="+city+"&aqi=no";
//     fetch(url).then(
//         response=>{
//             if (response.status!==200){
//                 alert("There has been an error on the server, please reload the website !");
//                 return;
//             }
//             else{
//                 response.json().then(
//                     weather=>{
//                         resetOldWeather();
//                         var newRow=(
//                             "<tr>"+
//                             "<th>"+ weather.location.name+"</th>"+
//                             "<th>"+weather.location.country +"</th>"+
//                             "<th>"+ new Date(weather.location.localtime).toLocaleTimeString()+"</th>"+
//                             "<th>"+ weather.current.temp_c+" °C"+ "/" + weather.current.temp_f+" F"+"</th>"+
//                             "<th>"+weather.current.feelslike_c +" °C"+"/"+weather.current.feelslike_f+" F"+"</th>"+
//                             "<th>"+weather.current.condition.text+"</th>"+
//                             "<th>"+ setImage(weather.current.condition.icon)+"</th>"+
//                             "<th>"+weather.current.wind_kph +" kph/"+weather.current.wind_mph+" mph"+"</th>"+
//                             "<th>"+ weather.current.humidity + "%"+"</th>"+
//                             "</tr>"
//                         );
//                         document.getElementById("tableForWeather").innerHTML+=newRow;
//                         document.getElementById("footer").style.display="block";
//                     }
//                 );
//             }
//         }
//     ).catch(
//         error=>{
//             alert("An unknown error ocurred " + error);
//         }
//     )
// }

document.onkeydown = (button) => {
  if (button.key == "Enter") putWeatherInfoInTable();
};

//Doing all the same but with async and await:

gettingWeatherFromAPI = () => {
  let city = document.getElementById("city").value;
  let url =
    "//api.weatherapi.com/v1/current.json?key=4154b597c4f44a42926143608212707&q=" +city+"&aqi=no";
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      if (response.status !== 200)
        reject("Oops, an error occurred on the server...");
      resolve(response.json());
    });
  });
};

let putWeatherInfoInTable = async () => {
  try {
    let weatherInfo = await gettingWeatherFromAPI();
    resetOldWeather();
    var newRow ="<tr>" +"<th>" +weatherInfo.location.name +"</th>" +
      "<th>" + weatherInfo.location.country +"</th>"
       +"<th>" + new Date(weatherInfo.location.localtime).toLocaleTimeString() +"</th>" +
      "<th>" +weatherInfo.current.temp_c +" °C" +"|" +weatherInfo.current.temp_f + " F" +"</th>" +
      "<th>" +weatherInfo.current.feelslike_c + " °C" + "|" +weatherInfo.current.feelslike_f + " F" +
      "</th>" +"<th>" + weatherInfo.current.condition.text + "</th>" + "<th>" + setImage(weatherInfo.current.condition.icon) +
      "</th>" +"<th>" +weatherInfo.current.wind_kph +" kph|" + weatherInfo.current.wind_mph + " mph" +
      "</th>" + "<th>" + weatherInfo.current.humidity + "%" + "</th>" +
      "</tr>";
    document.getElementById("tableForWeather").innerHTML += newRow;
    document.getElementById("footer").style.display = "block";
  } catch (error) {
    console.log(error);
  }
};
