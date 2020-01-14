import "./scss/main.scss"

const classes = {
  key: "calculator__keys__row__key",
  lcd: {
    screen: "calculator__display__shield__screen",
    on: "calculator__display__shield__screen--on",
    off: "calculator__display__shield__screen--off",
  },
  powerOn: "calculator__actions__group--on .calculator__actions__group__main",
  powerOff: "calculator__actions__group--off .calculator__actions__group__main",
}
const keys = [...document.querySelectorAll(`.${classes.key}`)]
const powerOn = document.querySelector(`.${classes.powerOn}`)
const powerOff = document.querySelector(`.${classes.powerOff}`)
const displayScreen = document.querySelector(`.${classes.lcd.screen}`)

/**
 *
 * @param {Event} event
 */
const handleNumberInput = event => {
  console.log(event.target.dataset.key)
}

const handlePowerOn = () => {
  if (displayScreen.classList.contains(classes.lcd.on)) return
  displayScreen.classList.remove(classes.lcd.off)
  displayScreen.classList.add(classes.lcd.on)
  displayScreen.textContent = `0.00`
}

const handlePowerOff = () => {
  if (displayScreen.classList.contains(classes.lcd.off)) return
  displayScreen.classList.remove(classes.lcd.on)
  displayScreen.classList.add(classes.lcd.off)
  displayScreen.textContent = ""
}

// setup click handlers
keys.forEach(key => key.addEventListener("click", handleNumberInput))
powerOn.addEventListener("click", handlePowerOn)
powerOff.addEventListener("click", handlePowerOff)
