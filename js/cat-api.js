import { Notify } from 'notiflix'

import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_JAuRBoZi5zwd5ocPRUNYNaBP4KGreSdTPZcZeiZjzIutb9OgVftLH5a9gSHDglC4";


const apiUrl = 'https://api.thecatapi.com/v1/breeds';

let catsData = window.localStorage.getItem('cats')
const breedSelect = document.querySelector(".breed-select")
const catInfoHtml = document.querySelector(".cat-info")
const loaderEl = document.querySelector(".loader-wrap")

function fetchBreeds() {
    loaderEl.classList.remove("is-hidden")

    // Fetch data using axios
    axios.get(apiUrl)
        .then(response => {
            //console.log(response.data); // Handle the data
            const cats = response.data
            //console.log('cats:',cats);
            window.localStorage.setItem('cats', JSON.stringify(cats))
        })
        .catch(error => {
            console.error('There was a problem with the axios operation:', error);
            Notify.failure(error);
        });

    loaderEl.classList.toggle("is-hidden")

}

async function fetchCatByBreed(breedId) {
    await axios.get(apiUrl + `search?breed_ids=${breedId}`)
        .then(response => {
            const catInfo = response.data[0]

            renderCatInfo(catInfo)

        })
        .catch(error => {
            console.error('There was a problem with the axios operation:', error);
            Notify.failure(error);
        });

}

function breedOption(params) {
    loaderEl.classList.toggle("is-hidden")
    const catsOption = params.map(({ name, id }) =>
        `<option value="${id}">${name}</option>`
    ).join("");

    breedSelect.innerHTML = catsOption

    setTimeout(function () {
        loaderEl.classList.toggle("is-hidden")
    }, 1000)

}

function renderCatInfo(breedId) {

    loaderEl.classList.toggle("is-hidden")
    const cats = JSON.parse(catsData)

    const { description, image, name, temperament } = cats
        .find(value => value.id === breedId)
    
    catInfoHtml.innerHTML = 
    `
    <div class="cat-info__col">
        <img class="cat-image" src="${image.url}"/>
    </div>
    <div class="cat-info__col">
        <h3>${name}</h3>
        <p>${description}</p>
        <p><b>${temperament}</b></p>
    </div>
    `

    setTimeout(function () {
        loaderEl.classList.toggle("is-hidden")
    }, 1000)
}



if (!catsData) {
    console.log('no data');
    fetchBreeds()
} else {

    const catsList = JSON.parse(catsData)
    breedOption(catsList)

}


export { renderCatInfo, fetchCatByBreed }






