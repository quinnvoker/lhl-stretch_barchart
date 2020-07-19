const demoOptions = {
  pixelsPerUnit: 16,
  maxValue: 20, // largest value to display within chart
  markFrequency: 5, // number of units between ticks on the y axis
  spacing: 20,
  title: 'Strength of the Bending Nations',
  titleSize: 'large',
  titleColor: 'black',
  titleAlign: 'left',
  barColor: 'grey', // color for any bars that don't have their colour set by data
  barValueAlign: 'middle', // vertical alignment of value labels in bars
  labelSize: 'medium', // font size to use for value markers and bar labels
  labelColor: 'black', // default colour for all text in the chart
  axisStyle: '1px solid black', // style for axis lines, uses 'border' format
  ruleStyle: '1px dotted black', // style for rule lines, uses 'border' format
}

let demoOptionsMulti = {
  pixelsPerUnit: 16,
  maxValue: 20, // largest value to display within chart
  markFrequency: 5, // number of units between ticks on the y axis
  spacing: 20,
  title: 'Strength of the Bending Nations (Allied)',
  titleSize: 'large',
  titleColor: 'black',
  titleAlign: 'left',
  barColor: 'grey', // color for any bars that don't have their colour set by data
  barValueAlign: 'middle', // vertical alignment of value labels in bars
  labelSize: 'medium', // font size to use for value markers and bar labels
  labelColor: 'black', // default colour for all text in the chart
  axisStyle: '1px solid black', // style for axis lines, uses 'border' format
  ruleStyle: '1px dotted black', // style for rule lines, uses 'border' format
}

const demoData = [
  {
    label: 'Water',
    value: 4,
    barColor: 'deepskyblue',
  },
  {
    label: 'Earth',
    value: 10,
    barColor: 'forestgreen',
  },
  {
    label: 'Fire',
    value: 15,
    barColor: 'crimson',
  },
  {
    label: 'Air',
    value: 1,
    labelColor: 'red',
  }
]

const demoDataMulti = [
  [
    {
      label: 'Water',
      value: 4,
      barColor: 'deepskyblue',
      labelColor: 'deepskyblue',
    },
    {
      label: 'Earth',
      value: 10,
      barColor: 'forestgreen',
      labelColor: 'forestgreen',
    },
    {
      label: 'Air',
      value: 1,
      barColor: 'orange',
      labelColor: 'orange',
    },
  ],
  {
    label: 'Fire',
    value: 15,
    barColor: 'crimson',
    labelColor: 'crimson'
  },
]

$(document).ready(function() {
  drawBarChart(demoData, demoOptions, $('.bar-chart'));
  drawBarChart(demoDataMulti, demoOptionsMulti, $('.bar-chart-multi'));
});
