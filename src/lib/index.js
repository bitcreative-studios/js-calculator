export const elements = {
  keys: "calculator__keys__row__key",
  lcd: {
    screen: "calculator__display__shield__screen",
    on: "calculator__display__shield__screen--on",
    off: "calculator__display__shield__screen--off",
  },
  powerOn: "calculator__actions__group--on .calculator__actions__group__main",
  powerOff: "calculator__actions__group--off .calculator__actions__group__main",
}

export const LCD_GLARE_STYLES = `inset 0 4px 6px -1px rgba(43, 43, 43, 0.75),
          inset 0 -4px 6px rgba(43, 43, 43, 0.45),
          inset 4px -3px 15px 0px rgba(255, 255, 255, 0.9)`

export const LCD_OFF_STATE = `inset 0 4px 6px -1px rgba(43, 43, 43, 0.75),
          inset 0 -4px 6px rgba(43, 43, 43, 0.45)`

export const INITIAL_STATE = {
  component: null,
  history: {},
  theme: "light",
}

export const INITIAL_CURRENT = {
  lhs: "",
  operation: "",
  rhs: "",
}

export const MAX_DIGITS = 11

export const ConstructionError = new Error(
  "You need to pass a reference to the DOM component"
)
ConstructionError.name = "Construction"
