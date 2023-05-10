import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import virusGoodImage from '../images/virusGood.png'
import virusBadImage from '../images/virusBad.png'

const Resources = {
    VirusGood: new ImageSource(virusGoodImage),
    VirusBad: new ImageSource(virusBadImage)
}
const ResourceLoader = new Loader([Resources.VirusBad, Resources.VirusGood])

export { Resources, ResourceLoader }