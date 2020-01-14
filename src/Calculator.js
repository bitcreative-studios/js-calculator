import {
  elements,
  ConstructionError,
  INITIAL_CURRENT,
  INITIAL_STATE,
  LCD_GLARE_STYLES,
  LCD_OFF_STATE,
  MAX_DIGITS,
} from "./lib"

// TODO: wait till the end of the on screen transition to display numbers
class Calculator {
  constructor({ component, theme, history } = INITIAL_STATE) {
    if (!component) {
      throw ConstructionError
    }
    console.log(
      `%c -------- DEBUG INFO [@Calculator: constructor] --------`,
      "color: cyan"
    )
    this.MAX_DIGITS = MAX_DIGITS
    this.isCleared = false
    this.isOn = false
    this.theme = theme
    this.component = component
    this.history = history
    this.current = history.inProgress ? history.inProgress : INITIAL_CURRENT

    // setup component
    this.display = component.querySelector(`.${elements.lcd.screen}`)
    this.powerOn = component
      .querySelector(`.${elements.powerOn}`)
      .addEventListener("click", this.handlePowerOn)
    this.powerOff = component
      .querySelector(`.${elements.powerOff}`)
      .addEventListener("click", this.handlePowerOff)
    this.clear = component
      .querySelector(`#clear-button`)
      .addEventListener("click", this.handleClear)
    this.keys = [
      ...component.querySelectorAll(`.${elements.keys}`),
    ].forEach(key => key.addEventListener("click", this.handleInput))
  }

  handlePowerOn = () => {
    if (this.display.classList.contains(elements.lcd.on)) return
    this.display.addEventListener("transitionend", this.addLCDGlare)
    this.display.classList.remove(elements.lcd.off)
    this.display.classList.add(elements.lcd.on)
    this.isOn = true
    this.display.textContent = this.current.operation
      ? this.current.rhs
      : this.current.lhs
  }

  handlePowerOff = () => {
    if (this.display.classList.contains(elements.lcd.off)) return
    this.display.removeEventListener("transitionend", this.addLCDGlare)
    this.display.style.boxShadow = LCD_OFF_STATE
    this.display.classList.remove(elements.lcd.on)
    this.display.classList.add(elements.lcd.off)
    this.isOn = false
    this.display.textContent = ""
  }

  handleInput = ({ target }) => {
    if (!this.isOn) return
    const {
      dataset: { key },
    } = target
    if (target.classList.contains("operation")) {
      this.handleOperation(key)
    } else if (target.classList.contains("memory-key")) {
      this.handleMemory(key)
    } else {
      // eslint-disable-next-line no-lonely-if
      if (this.current.operation) {
        this.current.rhs += this.current.rhs.length < this.MAX_DIGITS ? key : ""
        this.display.textContent = this.current.rhs
        console.log(this.current)
      } else {
        this.current.lhs += this.current.lhs.length < this.MAX_DIGITS ? key : ""
        this.display.textContent = this.current.lhs
        console.log(this.current)
      }
    }
  }

  handleOperation = operation => {
    console.log(
      `%c -------- DEBUG INFO [@Calculator: handleOperation] --------`,
      "color: cyan"
    )
    console.log(`current operation: ${operation}`)
  }

  handleCalculate = () => {}

  handleMemory = operation => {
    console.log(
      `%c -------- DEBUG INFO [@Calculator: handleMemory] --------`,
      "color: cyan"
    )
    console.log(`current memory operation: ${operation}`)
  }

  handleClear = () => {
    if (!this.isCleared) {
      // just clearing last input
      if (this.current.operation) {
        this.current.rhs = ""
        this.display.textContent = this.current.rhs
        this.isCleared = true
      } else {
        this.current.lhs = ""
        this.display.textContent = this.current.lhs
        this.isCleared = true
      }
    } else {
      // clear entire operation
      this.resetObject(this.current)
      this.display.textContent = ""
      this.isCleared = false
    }
  }

  addLCDGlare = () => {
    this.display.style.boxShadow = LCD_GLARE_STYLES
  }

  resetObject = obj => {
    if (!obj) return
    Object.keys(obj).map(key => {
      console.log(`current key: ${key}`)
      // eslint-disable-next-line no-param-reassign
      obj[key] = ""
    })
    console.log(`current state: ${JSON.stringify(obj, null, 2)}`)
  }
}

export default Calculator
