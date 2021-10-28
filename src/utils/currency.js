// Libs
import currency from "currency.js"

const BRLCurrencyDefinitions = {
  symbol: "R$ ",
  precision: 2,
  separator: ".",
  decimal: ","
}

const formatBRLCurrency = value => currency(value, BRLCurrencyDefinitions).format()

export { formatBRLCurrency }