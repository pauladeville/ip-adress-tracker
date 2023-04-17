let map;
const tileLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
});
let ipAddress = "";
let domainName = "";
const submitButton = document.querySelector("#submit");
const inputArea = document.querySelector("input");
//VISITOR IP BY DEFAULT
fetch("https://api.ipify.org/?format=json").then((res)=>res.json()).then((data)=>{
    getCoordinates(data.ip);
}).catch((error)=>{
    console.error(error);
});
//GET LATITUDE AND LONGITUDE
async function getCoordinates(inputValue) {
    if (/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(inputValue)) {
        ipAddress = inputValue;
        inputArea.classList.remove("error");
    } else if (/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(inputValue)) {
        inputArea.classList.remove("error");
        domainName = inputValue;
    } else inputArea.classList.add("error");
    try {
        const res = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_dfH8tDzTsnI6Fb3ulm1ilJVI7g7qd&ipAddress=" + ipAddress + "&domain=" + domainName);
        const data = await res.json();
        updateResult(data);
        const { lat , lng  } = data.location;
        updateMap(lat, lng);
    } catch (error) {
        console.log(error);
    }
}
//UPDATE MAP
async function updateMap(latitude, longitude) {
    try {
        if (map) map.remove();
        const spinner = document.querySelector("#spinner");
        spinner.style.display = "none";
        map = L.map("map").setView([
            latitude,
            longitude
        ], 14);
        tileLayer.addTo(map);
        L.marker([
            latitude,
            longitude
        ]).addTo(map);
    } catch (error) {
        console.log(error);
    }
}
//UPDATE RESULT
const addressResult = document.querySelector(".result__item--address p");
const locationResult = document.querySelector(".result__item--location p");
const timezoneResult = document.querySelector(".result__item--timezone p");
const ispResult = document.querySelector(".result__item--isp p");
async function updateResult(data) {
    addressResult.textContent = data.ip;
    locationResult.textContent = data.location.city;
    timezoneResult.textContent = "UTC " + data.location.timezone;
    ispResult.textContent = data.isp;
}
//SUBMIT FORM
submitButton.addEventListener("click", ()=>{
    getCoordinates(inputArea.value);
});
document.addEventListener("keypress", (e)=>{
    if (e.key === "Enter") getCoordinates(inputArea.value);
});

//# sourceMappingURL=index.7c0ccee6.js.map
