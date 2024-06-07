import './cat-api.js'
import fetchCatByBreed from './cat-api.js'
import SlimSelect from 'slim-select'
import '../node_modules/slim-select/dist/slimselect.css'
import '../css/styles.css'

let select = new SlimSelect({
    select: '.breed-select'
})


const breedSelect = document.querySelector(".breed-select")

breedSelect.addEventListener("change", function () {
    console.log('asd');

    var breedId = select.getSelected()
    console.log('breedId:',breedId.toString())

    fetchCatByBreed(breedId.toString())

})