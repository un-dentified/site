// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
import "./src/scss/base/base.scss"

document.body.style.height = `${window.innerHeight}px`

window.addEventListener("resize", () => {
  document.body.style.height = `${window.innerHeight}px`
})
