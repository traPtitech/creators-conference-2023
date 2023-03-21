import 'loading-attribute-polyfill'
import { shuffleGroups } from './shuffle'
import { setupDetails } from './details'
import { setupSlides } from './slides'
import { setupImgLink } from './img-link'
import '../css/index.scss'

if (process.env.NODE_ENV !== 'production') {
  import('../index.pug')
}

shuffleGroups()
setupDetails()
setupSlides()
setupImgLink()
