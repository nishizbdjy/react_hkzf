const defaultState = {
  city: {}
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "Map":
      let newCity = JSON.parse(JSON.stringify(state))
      newCity.city =action.res
      return newCity
      break;

    default:
      break;
  }
  return state;
}