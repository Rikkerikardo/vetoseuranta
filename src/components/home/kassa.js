import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { useSelector } from "react-redux"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import Avatar from "@material-ui/core/Avatar"
import CircularProgress from "@material-ui/core/CircularProgress"
import { Paper } from "@material-ui/core"

const Kassa = () => {
  const kassa = useSelector((state) => state.kassa)

  if (!kassa || kassa.length === 0)
    return (
      <CircularProgress
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      />
    )

  const bank = Number(kassa[0].Kassa).toFixed(2)

  const pelaajienKassat = () => {
    return (
      <List component="nav">
        <ListItem button>
          <ListItemText
            style={{
              textAlign: "center"
            }}
            primary={`Riku ${Number(kassa[0].Riku).toFixed(2)}€`}
          />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText
            style={{
              textAlign: "center"
            }}
            primary={`Panu ${Number(kassa[0].Panu).toFixed(2)}€`}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            style={{
              textAlign: "center"
            }}
            primary={`Valtteri ${Number(kassa[0].Valtteri).toFixed(2)}€`}
          />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText
            style={{
              textAlign: "center"
            }}
            primary={`Mikko ${Number(kassa[0].Mikko).toFixed(2)}€`}
          />
        </ListItem>
      </List>
    )
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 10
        }}
      >
        <Avatar
          component={Paper}
          elevation={5}
          style={{
            width: 150,
            height: 150,
            backgroundColor: "#f5a623",
            color: "black"
          }}
        >{`${bank}€`}</Avatar>
      </div>

      <Card>
        <CardContent>
          <Typography component="div">{pelaajienKassat()}</Typography>
        </CardContent>
      </Card>
    </div>
  )
}
export default Kassa
