const btn = document.getElementById("btn-submit");
let map = L.map("map").setView([0, 0], 13);
let marker = L.marker([0, 0]).addTo(map);

document.addEventListener("DOMContentLoaded", () => {
  fetchIP();
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.getElementById("input-ip").value;
  if (input) {
    fetchLocation(input);
  }
});

const fetchIP = async () => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    fetchLocation(data.ip);
    console.log(data.ip);
  } catch (error) {
    console.log(error);
  }
};

const fetchLocation = async (IP) => {
  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_HaqGFx8GmT0jKjp0O3ltwtGbiAqCW&ipAddress=${IP}`
    );
    const dataLocation = await res.json();
    mapa(dataLocation);
    setData(dataLocation);
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: "Inserte una IP valida ",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

const mapa = (dataLocation) => {
  let lat = dataLocation.location.lat;
  let lon = dataLocation.location.lng;
  map.off();
  map.remove();
  map = L.map("map").setView([lat, lon], 13);
  marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup(`<b>${lat}, ${lon}</b>`).openPopup();

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmJqc3oiLCJhIjoiY2wyeHVmbmNhMDBiMjNjbXh1cThqMnAwYyJ9.cNf6LzfzRoIfk6k4dzvLNw",
    {
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoicmJqc3oiLCJhIjoiY2wyeHVmbmNhMDBiMjNjbXh1cThqMnAwYyJ9.cNf6LzfzRoIfk6k4dzvLNw",
    }
  ).addTo(map);
};

const setData = (dataLocation) => {
  const address = (document.getElementById("address").innerHTML =
    dataLocation.ip);
  const direction = (document.getElementById("direction").innerHTML =
    dataLocation.location.city);
  const timezone = (document.getElementById("timezone").innerHTML =
    dataLocation.location.timezone);
  const isp = (document.getElementById("isp").innerHTML = dataLocation.isp);
};
