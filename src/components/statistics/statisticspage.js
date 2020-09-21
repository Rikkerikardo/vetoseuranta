import React from "react"
import { useSelector } from "react-redux"
import Container from "@material-ui/core/Container"
import FundLineChart from "./fundlinechart"
import Top10List from "./top10"
import CircularProgress from "@material-ui/core/CircularProgress"

const StatisticsPage = () => {
  const matches = useSelector((state) => state.results.ottelut)
  if (!matches) return <CircularProgress />

  return (
    <Container maxWidth="lg">
      <Top10List />
      <FundLineChart />
    </Container>
  )
}

export default StatisticsPage
