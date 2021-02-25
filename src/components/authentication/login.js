/* eslint-disable linebreak-style */
import React, { useState } from "react"
import { useSelector } from "react-redux"
import Container from "@material-ui/core/Container"
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core"
import firebase from "firebase/app"
import "firebase/database"
import "firebase/auth"
import { Redirect } from "react-router-dom"

const LoginPage = () => {
  const user = useSelector((state) => state.user)
  const [open, setOpen] = useState(false)
  const [dialog, setDialog] = useState("Tuntematon virhe")
  const [redirect, setRedirect] = useState(false)

  const createUser = () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        setRedirect(true)
      })
      .catch((error) => {
        console.log(error.message)
        setOpen(true)
        setDialog(error.message)
      })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const logIn = () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        setRedirect(true)
      })
      .catch((error) => {
        console.log(error.message)
        setOpen(true)
        setDialog(error.message)
      })
  }

  if (user == null) {
    return (
      <Container maxWidth="lg" align="center">
        <form noValidate autoComplete="off">
          <TextField
            id="username"
            label="Sähköposti"
            defaultValue="testi@testi.com"
            style={{
              margin: "10%",
            }}
          />
          <TextField
            id="password"
            label="Salasana"
            type="password"
            defaultValue="testaaja"
            style={{
              margin: "10%",
            }}
          />
        </form>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => {
            createUser()
          }}
          style={{
            margin: "2%",
          }}
        >
          Luo käyttäjä
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            logIn()
          }}
          style={{
            margin: "2%",
          }}
        >
          Kirjaudu sisään
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Virhe kirjautumisessa</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialog}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Sulje
            </Button>
          </DialogActions>
        </Dialog>
        {redirect ? <Redirect to="/" /> : <div></div>}
      </Container>
    )
  } else {
    return <Container> </Container>
  }
}
export default LoginPage
