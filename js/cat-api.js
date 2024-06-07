console.log('test1');
import {Notify} from 'notiflix'

import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_JAuRBoZi5zwd5ocPRUNYNaBP4KGreSdTPZcZeiZjzIutb9OgVftLH5a9gSHDglC4";


//const apiUrl = 'https://api.thecatapi.com/v1/breeds';
const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=10';

let catsData = window.localStorage.getItem('cats')
const breedSelect = document.querySelector(".breed-select")

function fetchBreeds() {
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
    
}

export default function fetchCatByBreed(breedId){
    axios.get(apiUrl+`search?breed_ids=${breedId}`)
        .then(response => {
            const catInfo = response.data
            console.log('catInfo:',catInfo);
        })
        .catch(error => {
            console.error('There was a problem with the axios operation:', error);
            Notify.failure(error);
        });
}

function breedOption(params) {
    const catsOption = params.map(({name, id}) => 
        `<option value="${id}">${name}</option>`
    ).join("");

    breedSelect.innerHTML = catsOption
    //console.log('catsOption: ',catsOption);
    //return 'x';
}



if(!catsData){
    console.log('no data');
    fetchBreeds()
}else{
    const catsList = JSON.parse(catsData)
    //console.log('catsList:', catsList);
    breedOption(catsList)

}






