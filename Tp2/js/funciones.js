const id = document.getElementById("id");
const nombre = document.getElementById("nombre");
const estado = document.getElementById("estado");
const episodios = document.getElementById("episodios");
const imagen = document.getElementById("imagen");

const getCharacter = async () => {
  const request = await fetch(
    `https://rickandmortyapi.com/api/character/${id.value}`
  );
  const character = await request.json();

  const episodes = character.episode;
  const episodesId = episodes.map((episodio) => {
    let aux = episodio.split("/");
    let id = aux[aux.length - 1];
    return id;
  });

  const ids = episodesId.toString();

  const requestEpisodes = await fetch(
    "https://rickandmortyapi.com/api/episode/" + ids
  );

  const episodesResponse = await requestEpisodes.json();
  nombre.textContent = character.name;
  estado.textContent = character.status;
  especie.textContent = character.species;
  estado.textContent = character.status;
  if (episodesResponse.length > 0) {
    const elementos = episodesResponse
      .map(
        (ep) => `<li>
      <h4><span class="ep">${ep.episode}:</span> ${ep.name}</h4>
      </li>`
      )
      .join("");

    episodios.innerHTML = elementos;
  } else {
    episodios.innerHTML = `<h4><span class="ep">${episodesResponse.episode}:</span> ${episodesResponse.name}</h4>`;
  }
  imagen.src = character.image;
  if (character.status === "Alive") {
    estado.classList = "alive";
  } else if (character.status === "Dead") {
    estado.classList = "dead";
  } else {
    estado.classList = "unknown";
  }
};
