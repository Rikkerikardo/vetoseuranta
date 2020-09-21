import React from "react"
import { useSelector } from "react-redux"
import ReactFC from "react-fusioncharts"
import FusionCharts from "fusioncharts"
import Column2D from "fusioncharts/fusioncharts.charts"
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion"
import CircularProgress from "@material-ui/core/CircularProgress"

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)

//TODO: listaus miten arvioidut todennäköisyydet on osuneet
//TODO: mobiilinäkymälle yksinkertaisempi kassa-käppyrä

const FundLineChart = () => {
  const matches = useSelector((state) => state.results.ottelut)
  if (!matches) return <CircularProgress />
  // kesäkuun jälkeiset pelit
  const matchesAfterBreak = matches.filter(
    (match) => match.PVM.substring(3, 5) > 6
  )
  matchesAfterBreak.reverse()

  const tournamentStartEnd = []

  const turnaukset = matchesAfterBreak.map((match) => match.Turnaus)
  const uniikit = [...new Set(turnaukset)]

  uniikit.forEach((turnaus) => {
    const turnee = matchesAfterBreak.filter(
      (ottelu) => ottelu.Turnaus === turnaus
    )
    const eka = turnee[0]
    const vika = turnee[turnee.length - 1]
    let index = matchesAfterBreak.findIndex((match) => match === eka)
    matchesAfterBreak[index].tournament = turnaus + " alkaa"
    tournamentStartEnd.push(index)
    index = matchesAfterBreak.findIndex((match) => match === vika)
    matchesAfterBreak[index].tournament = turnaus + " päättyy"
    tournamentStartEnd.push(index)
  })

  const annotationsTournaments = []

  tournamentStartEnd.forEach((element) => {
    if (matchesAfterBreak[element].tournament.includes("päättyy")) {
      var label = {
        id: "label",
        type: "text",
        text: `${matchesAfterBreak[element].tournament}`,
        fillcolor: "#555555",
        x: `$dataset.0.set.${element}.x`,
        y: `$dataset.0.set.${element}.y + 40`,
        align: "right",
        wrap: 1,
        wrapWidth: 100,
        alpha: 50
      }
      var circle = {
        id: "label",
        type: "circle",
        x: `$dataset.0.set.${element}.x`,
        y: `$dataset.0.set.${element}.y`,
        radius: "10",
        color: "#f47373",
        border: "2",
        borderColor: "#555555"
      }
    } else {
      label = {
        id: "label",
        type: "text",
        text: `${matchesAfterBreak[element].tournament}`,
        fillcolor: "#555555",
        x: `$dataset.0.set.${element}.x`,
        y: `$dataset.0.set.${element}.y -20`,
        align: "left",
        wrap: 1,
        wrapWidth: 100,
        bold: 1
      }
      circle = {
        id: "label",
        type: "circle",
        x: `$dataset.0.set.${element}.x`,
        y: `$dataset.0.set.${element}.y`,
        radius: "10",
        color: "#37d67a",
        border: "2",
        borderColor: "#555555"
      }
    }

    annotationsTournaments.push(circle, label)
  })

  const chartConfigs = {
    type: "line",
    width: "100%",
    height: "500",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Kassan kehitys",
        xAxisValuesStep: 7,
        anchorradius: "0",
        plotToolText: "<b>$dataValue</b> <br>$label",
        showHoverEffect: "1",
        showvalues: "0",
        numberSuffix: "€",
        theme: "fusion",
        anchorBgColor: "#fbc02d",
        paletteColors: "#fbc02d",
        formatNumberScale: 0,
        animationDuration: 2,
        chartLeftMargin: 10,
        chartRightMargin: 10,
        chartTopMargin: 10,
        chartBottomMargin: 10
      },
      annotations: {
        groups: [
          {
            showBelow: 0,
            items: annotationsTournaments
          }
        ]
      },
      data: matchesAfterBreak.map((match) => {
        match = {
          label: match.PVM,
          value: match.Kassa
        }
        return match
      })
    }
  }

  return <ReactFC {...chartConfigs} />
}

export default FundLineChart
