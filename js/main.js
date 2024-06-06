// import './01-color-switcher'
// import './02-timer'
// import './03-promises'

console.log('test');

import axios from "axios";
import SlimSelect from 'slim-select'
import '../node_modules/slim-select/dist/slimselect.css'

axios.defaults.headers.common["x-api-key"] = "live_JAuRBoZi5zwd5ocPRUNYNaBP4KGreSdTPZcZeiZjzIutb9OgVftLH5a9gSHDglC4";


new SlimSelect({
    select: '.breed-select'
})