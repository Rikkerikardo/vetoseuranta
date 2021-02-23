import React from "react"
import { useSelector } from "react-redux"
import Container from "@material-ui/core/Container"
import Kassa from "./kassa"
import Keskeneraiset from "./keskeneraiset"
import CircularProgress from "@material-ui/core/CircularProgress"

const HomePage = () => {
  const matches = useSelector((state) => state.results.ottelut)
  const user = useSelector((state) => state.user)

  if (user == null) {
    return <Container> </Container>
  } else {
    if (!matches) return <CircularProgress />

    return (
      <Container maxWidth="lg">
        <Kassa />
        <Keskeneraiset />
      </Container>
    )
  }
}

export default HomePage
