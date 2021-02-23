/* eslint-disable linebreak-style */
import React from "react"
import { useSelector } from "react-redux"
import Container from "@material-ui/core/Container"
import { Button, TextField } from "@material-ui/core"
import firebase from "firebase/app"
import "firebase/database"
import "firebase/auth"

const LoginPage = () => {
  const user = useSelector((state) => state.user)

  const createUser = () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    firebase
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
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
          onClick={() => {
            logIn()
          }}
          style={{
            margin: "2%",
          }}
        >
          Kirjaudu sisään
        </Button>
      </Container>
    )
  } else {
    return <Container> </Container>
  }
}
export default LoginPage
