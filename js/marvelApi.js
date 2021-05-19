//Credenciais para consulta da api
const timeStamp = '1621392494';
const apiKey = 'f5d32740b1f1ea1f8d00f7e39e2cebc7'; //public key
const hash = 'cec2c70e3caabc9f30e021dd400673f9';
const maxHerois = 1493;
const randomHerois = Math.floor((Math.random() * maxHerois) + 1)

/* api consulta herois*/
const linkApi = "http://gateway.marvel.com/v1/public/characters?ts=" + timeStamp +
  "&apikey=" + apiKey + "&hash=" + hash + "&limit=12&offset=" + randomHerois

//selecionando a div que vai mostrar o resultado
const container = document.querySelector('#heroResults');
let contentHTML = '';
let contentSearchHTML = ''

//função para trazer o resultado da api e criaçao do html 
async function herosMarvel(url) {
  const response = await fetch(url)
  const json = await response.json()
  result = json.data.results
  console.log(result)
  result.forEach(hero => {
    heroID = hero.id
    heroName = hero.name
    contentHTML += ` 
    <div class="heroCard">
    <img class="heroImg" src="${hero.thumbnail.path}.${hero.thumbnail.extension}">
    <div class="cardInfo">
    <div class="heroName">Nome: ${hero.name}</div>
    <div id="heroId" class="heroID">ID: ${heroID}</div>
    </div>
    </div>
    `
    heroEvents(heroID)
    container.innerHTML = contentHTML;
  })
}

//função responavel busca eventos dos personagens listados OBS: SERÁ INCREMENTADO NA V2
async function heroEvents(id) {
  const url = `http://gateway.marvel.com/v1/public/characters/${id}/events?ts=${timeStamp}&apikey=${apiKey}&hash=${hash}&limit=5&`
  const response = await fetch(url)
  const json = await response.json()
  const events = json.data.results
  events.forEach(events => {
    console.log(events.title)
  })
}

//função responsavel pela busca dos personagens
async function heroSearch(value) {
  const link = 'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' + value + '&ts=' + timeStamp + '&apikey=' + apiKey + '&hash=' + hash
  const response = await fetch(link)
  const json = await response.json()
  result = json.data.results
  console.log(result)
  if (json.data.results[0] == undefined) {
    contentSearchHTML += ` 
    <div class="heroNotFound">
    <h1 class="notFoundLabel">Desculpe... Não foi possível encontrar sua pesquisa ):</h1>
    <div class="teste">
    <img class="notFoundImg" src="img/groot.gif">
    </div> 
    </div>`
    container.innerHTML = contentSearchHTML;
  } else {
    result.forEach(hero => {
      heroFoundID = hero.id
      heroFoundName = hero.name
      contentSearchHTML += ` 
    <div class="heroCard">
    <img class="heroImg" src="${hero.thumbnail.path}.${hero.thumbnail.extension}">
    <div class="cardInfo">
    <div class="heroName">Nome: ${heroFoundName}</div>
    <div id="heroId" class="heroID">ID: ${heroFoundID}</div>
    </div>
    </div>`
      heroEvents(heroFoundID)
      container.innerHTML = contentSearchHTML;
    })
  }
}

//aqui eu pego o valor digitado no input, passo ele pra função searchHero
const searchInput = document.getElementById('search');
searchInput.addEventListener('keyup', function (e) {
  var key = e.which || e.keyCode;
  if (key == 13) { // codigo da tecla enter
    const heroValue = this.value
    if (heroValue != '') {
      contentHTML = '';
      contentSearchHTML = '';
      container.innerHTML = contentHTML;
      heroSearch(heroValue)
    } else {
      herosMarvel(linkApi)
    }
  }
});


herosMarvel(linkApi)


