import React, { useEffect, useState } from "react"
import "./App.css"
import HomePage from "./components/home/homepage"
import { useDispatch } from "react-redux"
import { initializeResults } from "./reducers/ottelut"
import { initializeKassa } from "./reducers/kassa"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Results from "./components/results/resultspage"
import StatisticsPage from "./components/statistics/statisticspage"
import { db } from "./config"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Button from "@material-ui/core/Button"

const App = () => {
  const dispatch = useDispatch()
  const [tulokset, setTulokset] = useState([])
  const [pankki, setPankki] = useState([])
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      testiAlustus()
    } else {
      alustus()
    }
  }, [])

  useEffect(() => {
    dispatch(initializeKassa(pankki))
  }, [pankki])

  useEffect(() => {
    dispatch(initializeResults(tulokset))
  }, [tulokset])

  const testiAlustus = () => {
    db.ref("131AFzDNKGGOL3VON6Bi474UIEUOfZuRdLmWuWCgjJF4/TestiDBTulokset").on(
      "value",
      (querySnapShot) => {
        const data = querySnapShot.val() ? querySnapShot.val() : {}
        const aputaulukko = []
        for (let index = 1; index < data.length; index++) {
          let pvm = data[index].Päivämäärä.substring(0, 10)
          pvm = pvm.split("-").reverse().join("-")
          const ottelu = {
            Pelaaja1: data[index].Pelaaja1,
            Pelaaja2: data[index].Pelaaja2,
            Pelattu: data[index].Pelattu,
            Panos: data[index].Panos,
            Kerroin: data[index].Kerroin,
            Tulos: data[index].Tulos,
            Lopputulos: data[index].Lopputulos,
            Turnaus: data[index].Turnaus,
            PVM: pvm,
            Kassa: data[index].Kassa,
          }
          aputaulukko.push(ottelu)
        }
        setTulokset(aputaulukko)
      }
    )
    db.ref("131AFzDNKGGOL3VON6Bi474UIEUOfZuRdLmWuWCgjJF4/TestiPankki").on(
      "value",
      (querySnapShot) => {
        const data = querySnapShot.val() ? querySnapShot.val() : {}
        const aputaulukko = []
        for (let index = 1; index < data.length; index++) {
          const tiedot = {
            Kassa: data[index].Kassa,
            Riku: data[index].Riku,
            Panu: data[index].Panu,
            Valtteri: data[index].Valtteri,
            Mikko: data[index].Mikko,
          }
          aputaulukko.push(tiedot)
        }
        setPankki(aputaulukko)
      }
    )
  }

  const alustus = () => {
    db.ref("131AFzDNKGGOL3VON6Bi474UIEUOfZuRdLmWuWCgjJF4/DBTulokset").on(
      "value",
      (querySnapShot) => {
        const data = querySnapShot.val() ? querySnapShot.val() : {}
        const aputaulukko = []
        for (let index = 1; index < data.length; index++) {
          let pvm = data[index].Päivämäärä.substring(0, 10)
          pvm = pvm.split("-").reverse().join("-")
          const ottelu = {
            Pelaaja1: data[index].Pelaaja1,
            Pelaaja2: data[index].Pelaaja2,
            Pelattu: data[index].Pelattu,
            Panos: data[index].Panos,
            Kerroin: data[index].Kerroin,
            Tulos: data[index].Tulos,
            Lopputulos: data[index].Lopputulos,
            Turnaus: data[index].Turnaus,
            PVM: pvm,
            Kassa: data[index].Kassa,
          }
          aputaulukko.push(ottelu)
        }
        setTulokset(aputaulukko)
      }
    )
    db.ref("131AFzDNKGGOL3VON6Bi474UIEUOfZuRdLmWuWCgjJF4/Pankki").on("value", (querySnapShot) => {
      const data = querySnapShot.val() ? querySnapShot.val() : {}
      const aputaulukko = []
      for (let index = 1; index < data.length; index++) {
        const tiedot = {
          Kassa: data[index].Kassa,
          Riku: data[index].Riku,
          Panu: data[index].Panu,
          Valtteri: data[index].Valtteri,
          Mikko: data[index].Mikko,
        }
        aputaulukko.push(tiedot)
      }
      setPankki(aputaulukko)
    })
  }

  return (
    <Router>
      <Breadcrumbs separator="-" style={{ display: "flex", justifyContent: "center", padding: 10 }}>
        <Link style={{ textDecoration: "none" }} to="/">
          <Button variant="contained" size="small">
            Etusivu
          </Button>
        </Link>

        <Link style={{ textDecoration: "none" }} to="/tulokset">
          <Button variant="contained" size="small">
            Tulokset
          </Button>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/statistiikka">
          <Button variant="contained" size="small">
            Statistiikka
          </Button>
        </Link>
      </Breadcrumbs>

      <Switch>
        <React.Fragment>
          <Route path="/tulokset">
            <Results />
          </Route>
          <Route path="/statistiikka">
            <StatisticsPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
        </React.Fragment>
      </Switch>
    </Router>
  )
}

export default App
