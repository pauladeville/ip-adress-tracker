let map;
const tileLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19
});
//VISITOR IP BY DEFAULT
fetch("https://api.ipify.org/?format=json").then((res)=>res.json()).then((data)=>{
    let ipAdress = data.ip;
    getCoordinates(ipAdress);
}).catch((error)=>{
    console.error(error);
});
//GET LATITUDE AND LONGITUDE
async function getCoordinates(inputValue) {
    try {
        const res = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_dfH8tDzTsnI6Fb3ulm1ilJVI7g7qd&ipAddress=" + inputValue);
        const data = await res.json();
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
        // const spinner = document.querySelector("#spinner");
        // spinner.style.display = "block";
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
//FORM
const submitButton = document.querySelector("#submit");
const inputArea = document.querySelector("input");
submitButton.addEventListener("click", ()=>{
    getCoordinates(inputArea.value);
});
document.addEventListener("keypress", (e)=>{
    if (e.key === "Enter") getCoordinates(inputArea.value);
});

//# sourceMappingURL=index.7c0ccee6.js.map
