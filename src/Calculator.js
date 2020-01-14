import {
  elements,
  ConstructionError,
  INITIAL_CURRENT,
  INITIAL_STATE,
  LCD_GLARE_STYLES,
  LCD_OFF_STATE,
  MAX_DIGITS,
} from "./lib"

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
    this.clearButtonTimeStamp = 0
    this.isOn = false
    this.theme = theme
    this.component = component
    this.history = history
    this.current = history.inProgress ? history.inProgress : INITIAL_CURRENT

    // setup component we do it in two steps because addEventListener returns void not the element
    this.display = component.querySelector(`.${elements.lcd.screen}`)

    this.powerOn = component.querySelector(`.${elements.powerOn}`)
    this.powerOn.addEventListener("click", this.handlePowerOn)

    this.powerOff = component.querySelector(`.${elements.powerOff}`)
    this.powerOff.addEventListener("click", this.handlePowerOff)

    this.clear = component.querySelector(`#clear-button`)
    this.clear.addEventListener("mouseup", this.handleClearButton)
    this.clear.addEventListener("mousedown", this.handleClearButton)
    this.clear.addEventListener("dblclick", this.handleClearButton)

    this.keys = [...component.querySelectorAll(`.${elements.keys}`)].map(key =>
      key.addEventListener("click", this.handleInput)
    )
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

  handleOperation = operation => {}

  handleCalculate = () => {}

  handleMemory = operation => {
    console.log(
      `%c -------- DEBUG INFO [@Calculator: handleMemory] --------`,
      "color: cyan"
    )
    console.log(`current memory operation: ${operation}`)
  }

  handleClearButton = event => {
    switch (event.type) {
      case "dblclick":
        // FIXME: this doesn't work
        this.handleInputClear(true)
        break
      case "mousedown":
        this.clearButtonTimeStamp = event.timeStamp
        break
      case "mouseup":
      default: {
        if (event.timeStamp - this.clearButtonTimeStamp >= 500) {
          this.handleInputReset()
          break
        }
        this.handleInputClear()
        break
      }
    }
  }

  handleInputClear = (clearAll = false) => {
    const operand = this.current.operation ? "rhs" : "lhs"
    if (!clearAll) {
      this.clearInput(operand)
      // just clearing last input
    } else {
      this.clearInput(operand, true)
      // clear entire operation
    }
  }

  handleInputReset = () => {
    this.resetObject(this.current)
    this.display.textContent = this.current.lhs
  }

  addLCDGlare = () => {
    this.display.style.boxShadow = LCD_GLARE_STYLES
  }

  resetObject = obj => {
    if (!obj) return
    Object.keys(obj).map(key => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = ""
    })
  }

  clearInput = (operand, all = false) => {
    switch (operand) {
      case "lhs":
        this.current.lhs = this.current.lhs.substring(
          0,
          all ? this.current.lhs.length : this.current.lhs.length - 1
        )
        this.display.textContent = this.current.lhs
        break
      case "rhs":
        this.current.rhs = this.current.rhs.substring(
          0,
          all ? this.current.lhs.length : this.current.lhs.length - 1
        )
        this.display.textContent = this.current.rhs
        break
      default:
        throw new Error("Unknown operand type")
    }
  }
}

export default Calculator
