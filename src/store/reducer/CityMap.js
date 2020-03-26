const defaultState = {
  city: {
    center: {
      lng: 113.35910928593503,
      lat: 23.135626014569688,
    },
    name: "广州"
  }
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "Map":
      let newCity = JSON.parse(JSON.stringify(state))
      newCity.city = action.res
      return newCity
      break;

    default:
      break;
  }
  return state;
}