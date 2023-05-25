const contenedor = document.getElementById("ctn-user");
const DEFAULT_COORDS = [-35.724287724994156, -59.36129840931141];
let map = L.map("map", {
  center: DEFAULT_COORDS,
  zoom: 5,
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 10,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marker = L.marker([-99999, -99999]);

async function getCharacter() {
  map.removeLayer(marker);
  const randomNumber = Math.floor(Math.random() * 826);
  const request = await fetch(
    `https://rickandmortyapi.com/api/character/${randomNumber}`
  );
  const character = await request.json();

  return character;
}

async function getUser() {
  const userRequest = await fetch("https://randomuser.me/api/?id=");
  const userResponse = await userRequest.json();
  const user = userResponse.results[0];
  return user;
}

async function buscar() {
  const user = await getUser();
  const character = await getCharacter();

  let result = "";

  if (character.gender.toLowerCase() === user.gender.toLowerCase()) {
    result = `<div class="coincidence yes">
    <img src="img/check.png"><h2>Hay Coincidencia!</h2>
    </div>`;
  } else {
    result = `<div class="coincidence no">
    <img src="img/cross.png"><h2>No Hay Coincidencia!</h2>
    </div>`;
  }

  contenedor.innerHTML = `<div class="card-user ${
    user.gender.toLowerCase() === "female" ? "female" : "male"
  }">
        <img src="${user.picture.large}">
        <p>${user.name.title} ${user.name.first} ${user.name.last}</p>
        <p>${user.id.name} ${user.id.value}</p>
        <p>${user.gender}</p>
        <p>
            Lat: ${user.location.coordinates.latitude}<br>
            Lng: ${user.location.coordinates.longitude}
        </p>
        </div>
        ${result}
        <div class="card-user ${
          character.gender.toLowerCase() === "female" ? "female" : "male"
        }">
            <img src="${character.image}">
            <p>${character.name}</p>
            <p>${character.status} ${character.species}</p>
            <p>${character.gender}</p>
        </div>`;

  const userLat = user.location.coordinates.latitude;
  const userLng = user.location.coordinates.longitude;

  const myIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25613.png",
    iconSize: [38, 40],
  });
  marker = L.marker([userLat, userLng], { icon: myIcon }).addTo(map);
  marker
    .bindPopup(`<b>${user.name.first + " " + user.name.last}</b>`)
    .openPopup();
  map.panTo(new L.LatLng(userLat, userLng));
}
