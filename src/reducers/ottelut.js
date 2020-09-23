const reducer = (
    state = {
      ottelut: null,
      keskeneraiset: null,
      rahaaKeskenEraisissa: null,
      keskeneraisetTurnaukset: null,
    },
    action,
) => {
  switch (action.type) {
    case "INIT_RESULTS":
      return {
        ...state,
        ottelut: action.data.matches,
        keskeneraiset: action.data.keskeneraiset,
        rahaaKeskenEraisissa: action.data.rahaa,
        keskeneraisetTurnaukset: action.data.keskeneraisetTurnaukset,
      }
    default:
      return state
  }
}

// TODO: jos keskeneräisten otteluiden keskellä on valmiita otteluita, menee tulokset sekaisin
export const initializeResults = (matches) => {
  return async (dispatch) => {
    const keskeneraiset = []
    let tyhjat = 0
    let rahaa = 0
    for (let index = 0; index < matches.length; index++) {
      if (matches[index].Panos === 0 || matches[index].Panos === "") {
        tyhjat++
      }
    }
    matches.splice(matches.length - tyhjat, tyhjat)
    for (let index = 0; index < matches.length; index++) {
      if (matches[index].Tulos === 0 || matches[index].Tulos === "") {
        keskeneraiset.push(matches[index])
      }
    }
    matches.splice(matches.length - keskeneraiset.length, keskeneraiset.length)
    const keskeneraisetTurnaukset = []
    keskeneraiset.forEach((ottelu) => {
      rahaa += ottelu.Panos
      if (!keskeneraisetTurnaukset.includes(ottelu.Turnaus)) {
        keskeneraisetTurnaukset.push(ottelu.Turnaus)
      }
    })
    rahaa = Number(rahaa).toFixed(2)
    matches.reverse()
    keskeneraiset.reverse()

    dispatch({
      type: "INIT_RESULTS",
      data: {matches, keskeneraiset, rahaa, keskeneraisetTurnaukset},
    })
  }
}

export default reducer
