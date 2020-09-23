import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import {Box, Grid, Paper} from '@material-ui/core'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'

// TODO: klikkauksella ottelut esiin
const Top10List = () => {
  const matches = useSelector((state) => state.results.ottelut)
  const [open, setOpen] = useState(false)
  if (!matches) return <CircularProgress />
  // kesäkuun jälkeiset pelit
  const matchesAfterBreak = matches.filter(
      (match) => match.PVM.substring(3, 5) > 6,
  )
  const players1 = matchesAfterBreak.map((match) => match.Pelaaja1)
  const players2 = matchesAfterBreak.map((match) => match.Pelaaja2)
  const allPlayers = [...new Set(players1.concat(players2))]
  const playersWithNet = []
  allPlayers.forEach((player) => {
    let net = 0
    const playersMatches = []
    matchesAfterBreak.forEach((match) => {
      if (match.Pelaaja1 === player || match.Pelaaja2 === player) {
        net += match.Lopputulos
        playersMatches.push(match)
      }
    })
    const playerWithNet = {
      name: player,
      sum: Number(net).toFixed(2),
      matches: playersMatches,
    }
    playersWithNet.push(playerWithNet)
  })

  playersWithNet.sort((a, b) => b.sum - a.sum)
  const top10 = playersWithNet.slice(0, 10)
  playersWithNet.reverse()
  const worst10 = playersWithNet.slice(0, 10)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Grid container justify="center">
      <Box width="33%">
        <Paper elevation={5} variant="elevation">
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <h3>
                  <b>Parhaat</b>
                </h3>
              </ListSubheader>
            }
            style={{backgroundColor: '#37d67a'}}
          >
            {top10.map((player, index) => {
              return (
                <ListItem button key={index} onClick={handleClick}>
                  <ListItemText primary={`${player.name} ${player.sum}€`} />
                </ListItem>
              )
            })}
          </List>
        </Paper>
      </Box>
      {/* TODO: hakutoiminto */}
      <Box width="33%">
        {/* <Paper elevation={5} variant="elevation">
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Hae pelaajaa"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </form>
        </Paper> */}
      </Box>
      <Box width="33%">
        <Paper elevation={5} variant="elevation">
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <h3>
                  <b>Huonoimmat</b>
                </h3>
              </ListSubheader>
            }
            style={{backgroundColor: '#f47373'}}
          >
            {worst10.map((player, index) => {
              return (
                <ListItem button key={index}>
                  <ListItemText primary={`${player.name} ${player.sum}€`} />
                </ListItem>
              )
            })}
          </List>
        </Paper>
      </Box>
    </Grid>
  )
}

export default Top10List
