const defaultState = {
  city: {}
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "Map":
      let newCity = JSON.parse(JSON.stringify(state))
      //将"市"去掉
      action.res.name = action.res.name.substring(0,action.res.name.length-1)
      newCity.city =action.res
      return newCity
      break;

    default:
      break;
  }
  return state;
}