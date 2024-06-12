import './cat-api.js'
import { renderCatInfo } from './cat-api.js'
import SlimSelect from 'slim-select'
import '../node_modules/slim-select/dist/slimselect.css'
import '../css/styles.css'

let select = new SlimSelect({
    select: '.breed-select'
})




const breedSelect = document.querySelector(".breed-select")

breedSelect.addEventListener("change", function () {

    var breedId = select.getSelected().toString()
    console.log('breedId:',breedId)

    renderCatInfo(breedId)

    //fetchCatByBreed(breedId)

})