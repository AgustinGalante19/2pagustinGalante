const id1 = document.getElementById("id1");
const id2 = document.getElementById("id2");
const nombre = document.getElementById("nombre");
const estado = document.getElementById("estado");
const episodios = document.getElementById("episodios");
const imagen = document.getElementById("imagen");
const charactersContainer = document.getElementById("characters-container");
const ctnResultado = document.getElementById("resultado");

const getCharacter = async () => {
  console.log(id1.value, id2.value);
  if (id1.value !== "" && id2.value !== "") {
    const request = await fetch(
      `https://rickandmortyapi.com/api/character/${id1.value},${id2.value}`
    );
    const characters = await request.json();

    let element = "";
    characters.forEach((character) => {
      element += `<div class="character-card">
        <div class="character-image">
          <img id="imagen" src="${character.image}" />
        </div>
        <div class="card-body">
          <h2 id="nombre">${character.name}</h2>
          <p id="especie" >${character.species}</p>
          <p id="estado" class="${
            character.status === "Alive"
              ? "alive"
              : character.status === "Dead"
              ? "dead"
              : "unkown"
          }">${character.status}</p>
          <p id="episodios">Episodios: ${character.episode.length}</p>
        </div>
      </div>`;
    });

    charactersContainer.innerHTML = element;

    let resultado = "";
    const char1 = characters[0];
    const char2 = characters[1];

    if (char1.episode.length > char2.episode.length) {
      resultado = `${char1.name}(${char1.episode.length}) tiene más episodios que ${char2.name}(${char2.episode.length})`;
    } else if (char2.episode.length > char1.episode.length) {
      resultado = `${char2.name}(${char2.episode.length}) tiene más episodios que ${char1.name}(${char1.episode.length})`;
    } else {
      resultado = `${char1.name} y ${char2.name} tienen la misma cantidad de episodios(${char1.episode.length}).`;
    }

    ctnResultado.innerHTML = `<div class="result">${resultado}</div>`;
  } else {
    ctnResultado.innerHTML = `<div class="error-alert">⚠️ Se tienen que ingresar si o si 2 id's</div>`;
    setTimeout(() => {
      ctnResultado.innerHTML = "";
    }, 5000);
  }
};
