const apiKey = "da1aaa19e59535cc3822f9eaf64976a2";

const baseURL = 'https://api.openweathermap.org/';

let cardCounter = 1;

function convertirKaC(kelvin) {
  return Math.floor(kelvin - 273.15);
}

async function getData(city){

  const api = `${baseURL}data/2.5/weather?q=${city}&appid=${apiKey}&lang=sp`;

  
  const data = await fetch(api);
  
  const json = await data.json();

  return json;
};

function comprobarNombre(nombreCandidato){

  const arrayDeNodos = [...cardsContainer.childNodes];
  let contadorfinal = 0;

  arrayDeNodos.forEach((nodocard) => {
    if (nodocard.childNodes[1].childNodes[1].textContent == nombreCandidato){
      contadorfinal++;
    } 
    
  })
  return contadorfinal;
}
  //to do: Averiguar por qué no valida todas las repeticiones. D:

  /*
  for (let i = 0; i < cantidadDeNodos; i++) {
    if (cardsContainer.childNodes[i].childNodes[1] && cardsContainer.childNodes[i].childNodes[1].childNodes[1].textContent === nombreCandidato){
      console.log(`Valor de i: ${i}`);
      return true;
    } else {
      return false;
    }
  } */


async function createCard(){
  const newCard = document.createElement('div');
  newCard.id = `_${cardCounter}`;
  console.log(cardCounter);
  const country = searchInput.value;
  const newInfo = await getData(country);
  
  
  if (newInfo.cod == 404) {
    searchInput.classList.add('form__input--error');
    searchInput.value = '';
    searchInput.placeholder = 'Ciudad no encontrada';

    return;
//true
  } else if (comprobarNombre(newInfo.name)){
    searchInput.classList.add('form__input--error');
    searchInput.value = '';
    searchInput.placeholder = 'Esa ciudad ya fue buscada';
    
    return 0;

  } else {
      searchInput.classList.remove('form__input--error');
      searchInput.placeholder = 'Ingresa una ciudad';
    
      newCard.className = 'cards-container__card';
      //newCard.id = 'card';
      newCard.innerHTML = `<p class="card__city-name" id="cardName">
                                                            <span class='cardInfo'>${newInfo.name}</span> 
                            <span class="card__country-tag">${newInfo.sys.country}</span>
                          </p>
                          <span class="card__temperature"><span class="cardTemp" id="cardTemp">${convertirKaC(newInfo.main.temp)}</span>°c</span>
                          <img class="card__weather-img" id="cardImg" src="https://openweathermap.org/img/wn/${newInfo.weather[0].icon}@2x.png">
                          <p class="card__weather-description" id="cardDesc"> ${newInfo.weather[0].description} </p>`;
      
      const equis = document.createElement('span');
      equis.id = `${cardCounter}${0}`;
      equis.className = 'card__x';
      equis.innerHTML = `X`;
      equis.addEventListener('click', () => {
        const nodoToRemove = document.getElementById(`_${equis.id / 10}`);
        nodoToRemove.remove();
      });

      newCard.insertAdjacentElement('afterbegin',equis);

      cardsContainer.appendChild(newCard);

      cardCounter++;
  }

  

  return;
};

function deleteCard(idX) {
  const idCard = idX/10;
  const cardToDelete = document.getElementById(idCard);
  cardToDelete.remove();
  return;
}

searchButton.addEventListener('click', createCard);

/*
  TO DO:
    Poner validaciones la barra de búsqueda.
    Manejar excepciones en codigo Javascript.
    Optimizar el código.
*/