import React from "react"
import {useSelector} from "react-redux"
import CircularProgress from "@material-ui/core/CircularProgress"
import TableWithPages from "./keskeneraisetTable"

const Keskeneraiset = () => {
  const keskeneraiset = useSelector((state) => state.results.keskeneraiset)
  const keskeneraisetTurnaukset = useSelector((state) => state.results.keskeneraisetTurnaukset)
  if (!keskeneraiset) return <CircularProgress />
  if (keskeneraiset.length === 0) {
    return (
      <div>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Ei keskeneräisiä
        </h2>
      </div>
    )
  }

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Keskeneräiset
      </h2>
      {keskeneraisetTurnaukset.map((turnaus) => {
        return (
          <div key={turnaus}>
            <h3>{turnaus}</h3>
            <TableWithPages table={keskeneraiset} turnaus={turnaus} />
          </div>
        )
      })}
    </div>
  )
}

export default Keskeneraiset
