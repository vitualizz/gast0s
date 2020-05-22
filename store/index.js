import currencies from '~/static/currencies.json'

export const state = () => ({
  firstConfiguration: false,
  settings: {},
  allCurrencies: currencies
})

export const mutations = {
  activeFirstConfiguration (state) {
    state.firstConfiguration = true
  },
  disableFirstConfiguration (state) {
    state.firstConfiguration = false
  },
  setSetting (state, data) {
    state.settings = _.assign(state.settings, data)
  }
}
