import "./scss/main.scss"
import Calculator from "./Calculator"

const component = document.querySelector(".calculator")
const history = {}
const theme = "light"

const et_66 = new Calculator({ component, history, theme })
