import currencies from '~/static/currencies.json'

export const state = () => ({
  newUser: true,
  settings: {},
  allCurrencies: currencies
})

export const mutations = {
  isNewUser (state) {
    state.newUser = true
  },
  setSettings (state, data) {
    state.settings = _.assign(state.settings, data)
  }
}
