console.log('test1');
import { Notify } from 'notiflix'

import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_JAuRBoZi5zwd5ocPRUNYNaBP4KGreSdTPZcZeiZjzIutb9OgVftLH5a9gSHDglC4";


const apiUrl = 'https://api.thecatapi.com/v1/breeds';
//const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=10';


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
            console.log('catInfo:', catInfo);

            renderCatInfo(catInfo)

        })
        .catch(error => {
            console.error('There was a problem with the axios operation:', error);
            Notify.failure(error);
        });

    console.log('test');
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

    const cats = JSON.parse(catsData)

    console.log('cats:', typeof (cats));
    console.log('cats:', cats);

    // const { catItem } = cats
    const { id, image } = cats
        .find(value => value.id === breedId)
        

        console.log('id:',id);
        console.log('image:',image);
        
    // .map(({description, image})=>{
    //    
    // })

    // const catItem = cats.map((el)=> {
    //     if(el.id === breedId){
    //         return {
    //             desc: el.description,
    //             image: el.image
    //         }
    //     }
    // })

    // console.log('catItem:', typeof (catItem));
    // console.log('catItem:', catItem);

    // const markup = info.map(({url})=>
    //     `<img class="cat-image" src="${url}"/>`
    // )

    catInfoHtml.innerHTML = `<img class="cat-image" src="${image.url}"/>`
}



if (!catsData) {
    console.log('no data');
    fetchBreeds()
} else {

    const catsList = JSON.parse(catsData)
    breedOption(catsList)

}


export { renderCatInfo, fetchCatByBreed }






