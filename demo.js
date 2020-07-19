const demoOptions = {
  pixelsPerUnit: 16,
  maxValue: 15, // largest value to display within chart
  markInterval: 5, // number of units between ticks on the y axis
  spacing: 0,
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
  animated: 'true', // enable animation for the chart
}

const demoOptionsMulti = {
  pixelsPerUnit: 16,
  maxValue: 15,
  markInterval: 5,
  spacing: 20,
  title: 'Strength of the Bending Nations (Allied)',
  titleSize: 'large',
  titleColor: 'black',
  titleAlign: 'left',
  barColor: 'grey',
  barValueAlign: 'middle',
  labelSize: 'medium',
  labelColor: 'black',
  axisStyle: '1px solid black',
  ruleStyle: '1px dotted black',
}

const demoOptionsThird = {
  pixelsPerUnit: 1,
  maxValue: 300,
  markInterval: 25,
  spacing: 10,
  title: 'My Steam Library Playtimes (Hours)',
  titleSize: 'x-large',
  titleColor: 'white',
  titleAlign: 'center',
  barColor: 'dodgerblue',
  barValueAlign: 'top',
  labelSize: 'small',
  labelColor: 'white',
  axisStyle: '2px solid white',
  ruleStyle: '1px solid grey',
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
      //label: 'Water',
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

const demoDataThird = [
  {
    label: 'Team Fortress 2',
    value: 297,
  },
  {
    label: 'The Elder Scrolls V: Skyrim',
    value: 205,
    barColor: 'seagreen',
  },
  {
    label: 'Monster Hunter: World',
    value: 202,
  },
  {
    label: 'Spiral Knights',
    value: 159,
  },
  {
    label: 'Dark Souls: Prepare To Die Edition',
    value: 158,
  },
  {
    label: 'Ultra Street Fighter IV',
    value: 151,
  },
  {
    label: 'Dragon Age: Origins',
    value: 127,
    barColor: 'seagreen',
  },
  {
    label: 'Slay the Spire',
    value: 87,
    barColor: 'seagreen',
  },
  {
    label: 'Terraria',
    value: 77,
    barColor: 'seagreen',
  },
  {
    label: 'Risk of Rain',
    value: 74,
  }
]

$(document).ready(function() {
  drawBarChart(demoData, demoOptions, $('.bar-chart'));
  drawBarChart(demoDataMulti, demoOptionsMulti, $('.bar-chart-multi'));
  drawBarChart(demoDataThird, demoOptionsThird, $('.bar-chart-third'))
});
