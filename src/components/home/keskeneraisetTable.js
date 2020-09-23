import React, {useState} from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableHead from '@material-ui/core/TableHead'
import Collapse from '@material-ui/core/Collapse'
import {Grid} from '@material-ui/core'

const TableWithPages = ({table, turnaus}) => {
  const filteredTable = []
  table.forEach((match) => {
    if (match.Turnaus.includes(turnaus)) filteredTable.push(match)
  })

  return (
    <TableContainer component={Paper}>
      <Table style={{width: '100%'}} size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{width: '25%'}}>Pelattu</TableCell>
            <TableCell style={{width: '25%'}}>Kerroin</TableCell>
            <TableCell style={{width: '25%'}}>Panos / %</TableCell>
            <TableCell style={{width: '25%'}}>Netto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTable.map((row, index) => {
            return <Row key={index} match={row} />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableWithPages

const Row = ({match}) => {
  const [open, setOpen] = useState(false)

  const profit = (match) => {
    return Number(match.Kerroin * match.Panos - match.Panos).toFixed(2)
  }

  return (
    <React.Fragment>
      <TableRow
        onClick={() => setOpen(!open)}
        style={{backgroundColor: '#f5a623', width: '100%'}}
      >
        <TableCell style={{width: '25%'}} component="th" scope="row">
          {match.Pelattu}
        </TableCell>
        <TableCell style={{width: '25%'}}>
          {Number(match.Kerroin).toFixed(2)}
        </TableCell>
        <TableCell style={{width: '25%'}}>
          {`${Number(match.Panos).toFixed(2)}€ / ${Number(
              (match.Panos / match.Kassa) * 100,
          ).toFixed(2)}%`}
        </TableCell>
        <TableCell style={{width: '25%'}}>{`${profit(match)}€`}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid item xs={12}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{width: '25%'}}>Pvm</TableCell>
                    <TableCell style={{width: '25%'}}>Pelaaja 1</TableCell>
                    <TableCell style={{width: '25%'}}>Pelaaja 2</TableCell>
                    <TableCell style={{width: '25%'}}>Pelattu</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      style={{width: '25%'}}
                      component="th"
                      scope="row"
                    >
                      {match.PVM}
                    </TableCell>
                    <TableCell style={{width: '25%'}}>
                      {match.Pelaaja1}
                    </TableCell>
                    <TableCell style={{width: '25%'}}>
                      {match.Pelaaja2}
                    </TableCell>
                    <TableCell style={{width: '25%'}}>
                      {match.Pelattu}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
