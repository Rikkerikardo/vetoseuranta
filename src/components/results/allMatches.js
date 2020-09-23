/* eslint-disable react/prop-types */
import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import {makeStyles, useTheme} from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableFooter from "@material-ui/core/TableFooter"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import FirstPageIcon from "@material-ui/icons/FirstPage"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import LastPageIcon from "@material-ui/icons/LastPage"
import TableHead from "@material-ui/core/TableHead"
import {Grid} from "@material-ui/core"
import Collapse from "@material-ui/core/Collapse"

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  tableCell: {},
  table: {
    layout: "fixed",
    overflowX: "auto",
  },
  footer: {
    flexShrink: 0,
    layout: "fixed",
    overflowX: "auto",
    paddingLeft: 0,
  },
}))

const TablePaginationActions = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const {count, page, rowsPerPage, onChangePage} = props

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.footer}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

const TableWithPages = ({table}) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, table.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table size="small" style={{width: "100%"}}>
          <TableHead>
            <TableRow>
              <TableCell style={{width: "25%"}}>Pvm</TableCell>
              <TableCell style={{width: "25%"}}>Pelattu</TableCell>
              <TableCell style={{width: "25%"}}>Netto</TableCell>
              <TableCell style={{width: "25%"}}>Tulos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0 ?
              table.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
              table
            ).map((row, index) => {
              return <Row key={index} match={row} page={page} />
            })}
            {emptyRows > 0 && (
              <TableRow style={{height: 53 * emptyRows}}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={3}
                count={table.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {"aria-label": "rows per page"},
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  )
}

export default TableWithPages
const Row = ({match, page}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [win, setWin] = useState(false)
  const won = "#37d67a"
  const lost = "#f47373"

  const rowColor = (match) => {
    setWin(false)
    if (match.Tulos === "Oikein") setWin(true)
  }

  const profit = (match) => {
    if (win) return Number(match.Kerroin * match.Panos - match.Panos).toFixed(2)
    return Number(-match.Panos).toFixed(2)
  }

  useEffect(() => {
    rowColor(match)
    setOpen(false)
  }, [match])

  return (
    <React.Fragment>
      <TableRow
        onClick={() => setOpen(!open)}
        style={{backgroundColor: win ? won : lost, color: "white"}}
      >
        <TableCell style={{width: "25%"}} component="th" scope="row">
          {match.PVM}
        </TableCell>
        <TableCell style={{width: "25%"}}>{match.Pelattu}</TableCell>
        <TableCell style={{width: "25%"}}>{`${profit(match)}€`}</TableCell>
        <TableCell cstyle={{width: "25%"}}>{match.Tulos}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className={classes.tableCell}
          style={{paddingBottom: 0, paddingTop: 0}}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid item xs={12}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell style={{width: "25%"}}></TableCell>
                    <TableCell style={{width: "25%"}}></TableCell>
                    <TableCell style={{width: "25%"}}>Kerroin</TableCell>
                    <TableCell style={{width: "25%"}}>Panos / %</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{width: "25%"}} component="th" scope="row">
                      {match.Pelaaja1}
                    </TableCell>
                    <TableCell style={{width: "25%"}}>{match.Pelaaja2}</TableCell>
                    <TableCell style={{width: "25%"}}>
                      {Number(match.Kerroin).toFixed(2)}
                    </TableCell>
                    <TableCell style={{width: "25%"}}>
                      {`${Number(match.Panos).toFixed(2)}€ / ${Number(
                          (match.Panos / match.Kassa) * 100,
                      ).toFixed(2)}%`}
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
