import React, { useEffect, useState } from "react"
import "./App.css"
import HomePage from "./components/home/homepage"
import { useDispatch } from "react-redux"
import { initializeResults } from "./reducers/ottelut"
import { initializeKassa } from "./reducers/kassa"
import { initializeUser } from "./reducers/user"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Results from "./components/results/resultspage"
import StatisticsPage from "./components/statistics/statisticspage"
import { db } from "./config"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Button from "@material-ui/core/Button"
import firebase from "firebase/app"
import "firebase/database"
import "firebase/auth"
import LoginPage from "./components/authentication/login"
import { Menu, MenuItem, Typography } from "@material-ui/core"

const App = () => {
  const dispatch = useDispatch()
  const [tulokset, setTulokset] = useState([])
  const [pankki, setPankki] = useState([])
  const [user, setUser] = useState(null)
  const [login, setLogin] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("user", user)

      firebase.auth().onAuthStateChanged((loggeduser) => {
        if (loggeduser) {
          console.log("logged in as ", loggeduser.email)
          testiAlustus()
          setUser(loggeduser.email)
          setLogin(true)
        } else {
          console.log("not logged in")
        }
      })
    } else {
      firebase.auth().onAuthStateChanged((loggeduser) => {
        if (loggeduser) {
          testiAlustus()
          setUser(loggeduser.email)
          setLogin(true)
        }
      })
    }
  }, [])

  useEffect(() => {
    dispatch(initializeKassa(pankki))
  }, [pankki])

  useEffect(() => {
    dispatch(initializeResults(tulokset))
  }, [tulokset])

  useEffect(() => {
    dispatch(initializeUser(user))
  }, [user])

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
        const tiedot = {
          Kassa: data[1].Kassa,
          Pelaaja1: data[1].pelaaja1,
          Pelaaja2: data[1].pelaaja2,
          Pelaaja3: data[1].pelaaja3,
          Pelaaja4: data[1].pelaaja4,
        }
        setPankki(tiedot)
      }
    )
  }

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setTulokset([])
        setPankki([])
        setUser(null)
        setLogin(false)
      })
  }

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
    firebase.auth().signInWithRedirect(provider)
    setLogin(true)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
      {login ? (
        <Typography align="center">Kirjauduttu sisään käyttäjällä {user}</Typography>
      ) : (
        <Typography align="center">Kirjaudu sisään nähdäksesi tietoja</Typography>
      )}
      {login ? (
        <div>
          <Button
            size="small"
            variant="outlined"
            style={{ margin: "1%" }}
            aria-haspopup="true"
            onClick={() => {
              signOut()
            }}
          >
            Kirjaudu ulos
          </Button>
        </div>
      ) : (
        <div>
          <Button
            variant="outlined"
            size="small"
            style={{ margin: "1%" }}
            aria-haspopup="true"
            onClick={handleClick}
          >
            Kirjaudu sisään
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link style={{ textDecoration: "none" }} to="/kirjaudu">
                Kirjaudu sähköpostilla
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                signIn()
              }}
            >
              Kirjaudu Googlella
            </MenuItem>
          </Menu>
        </div>
      )}

      <Switch>
        <React.Fragment>
          <Route path="/tulokset">
            <Results />
          </Route>
          <Route path="/statistiikka">
            <StatisticsPage />
          </Route>
          <Route path="/kirjaudu">
            <LoginPage />
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

/*  const alustus = () => {
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
  } */
