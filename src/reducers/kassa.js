const reducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_KASSA":
      return action.data
    default:
      return state
  }
}

export const initializeKassa = (pankki) => {
  return async (dispatch) => {
    const kassa = pankki
    dispatch({
      type: "INIT_KASSA",
      data: kassa
    })
  }
}

export default reducer
