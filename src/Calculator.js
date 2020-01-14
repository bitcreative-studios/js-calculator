import { classes, LCD_GLARE_STYLES, LCD_OFF_STATE } from "./lib"

const INITIAL_STATE = {
  component: {},
  history: {},
  theme: "light",
}

const INITIAL_CURRENT = {
  lhs: "",
  operation: "",
  rhs: "",
}
// TODO: wait till the end of the on screen transition to display numbers
class Calculator {
  constructor({ component, theme, history } = INITIAL_STATE) {
    console.log(
      `%c -------- DEBUG INFO [@Calculator: constructor] --------`,
      "color: cyan"
    )
    this.theme = theme
    this.component = component
    this.history = history
    this.current = history.inProgress ? history.inProgress : INITIAL_CURRENT

    // setup component
    this.display = component.querySelector(`.${classes.lcd.screen}`)
    this.powerOn = component
      .querySelector(`.${classes.powerOn}`)
      .addEventListener("click", this.handlePowerOn)
    this.powerOff = component
      .querySelector(`.${classes.powerOff}`)
      .addEventListener("click", this.handlePowerOff)
  }

  handlePowerOn = () => {
    if (this.display.classList.contains(classes.lcd.on)) return
    this.display.addEventListener("transitionend", this.addLCDGlare)
    this.display.classList.remove(classes.lcd.off)
    this.display.classList.add(classes.lcd.on)
    this.display.textContent = this.current.operation
      ? this.current.rhs
      : this.current.lhs
  }

  handlePowerOff = () => {
    if (this.display.classList.contains(classes.lcd.off)) return
    this.display.removeEventListener("transitionend", this.addLCDGlare)
    this.display.style.boxShadow = LCD_OFF_STATE
    this.display.classList.remove(classes.lcd.on)
    this.display.classList.add(classes.lcd.off)
    this.display.textContent = ""
  }

  addLCDGlare = () => {
    this.display.style.boxShadow = LCD_GLARE_STYLES
  }
}

export default Calculator
