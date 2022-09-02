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

async function createCard(){
  const newCard = document.createElement('div');
  newCard.id = `_${cardCounter}`;
  console.log(cardCounter);
  const country = searchInput.value;
  const newInfo = await getData(country);
  
  newCard.className = 'cards-container__card';
  //newCard.id = 'card';
  newCard.innerHTML = `<p class="card__city-name" id="cardName">${newInfo.name} 
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