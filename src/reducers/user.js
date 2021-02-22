/* eslint-disable linebreak-style */
const reducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USER":
      return action.data
    default:
      return state
  }
}

export const initializeUser = (loggeduser) => {
  return async (dispatch) => {
    const user = loggeduser
    dispatch({
      type: "INIT_USER",
      data: user,
    })
  }
}

export default reducer
