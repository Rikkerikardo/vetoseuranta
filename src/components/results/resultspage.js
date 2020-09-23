import React from "react"
import {useSelector} from "react-redux"
import TableWithPages from "./allMatches"
import Container from "@material-ui/core/Container"
import CircularProgress from "@material-ui/core/CircularProgress"

const Results = () => {
  const matches = useSelector((state) => state.results.ottelut)
  if (!matches) return <CircularProgress />
  return (
    <Container>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Tulokset
      </h2>
      <TableWithPages table={matches} />
    </Container>
  )
}
export default Results
