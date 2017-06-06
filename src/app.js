import './css/main.css'
import Layer from './components/layer.js'

const app = function(){
    const dom = document.getElementById('app')
    var layer = new Layer()
    console.log(dom)
    dom.innerHTML = layer.tpl
}

app()