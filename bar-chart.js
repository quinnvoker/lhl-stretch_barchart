const defaultOptions = {
  title: '',
  titleSize: 'large',
  titleColor: 'black',
  titleAlign: 'left',
  maxValue: 20, // largest value to display within chart
  markFrequency: 5, // number of units between ticks on the y axis
  pixelsPerUnit: 10,
  spacing: 50,
  barColor: 'grey', // color for any bars that don't have their colour set by data
  barValueAlign: 'middle', // vertical alignment of value labels in bars
  labelSize: 'medium', // font size to use for value markers and bar labels
  labelColor: 'black', // default colour for all text in the chart
  axisStyle: '1px solid black', // style for axis lines, uses 'border' format
  ruleStyle: '1px dotted black', // style for rule lines, uses 'border' format
}

const dummyData = [
  {
    label: 'Water',
    value: 4,
    barColor: 'blue',
  },
  {
    label: 'Earth',
    value: 10,
    barColor: 'green',
  },
  {
    label: 'Fire',
    value: 15,
    barColor: 'red',
  },
  {
    label: 'Air',
    value: 1,
    labelColor: 'red',
  }
]

$(document).ready(function() {
  drawBarChart(dummyData, defaultOptions, $('.bar-chart'));
});

const drawBarChart = function(data, options, element) {
  if(options.title) {
    let title = $('<p>' + options.title + '</p>');
    title.css({
      'font-size': options.titleSize,
      'color': options.titleColor,
      'text-align': options.titleAlign,
    });
    element.append(title);
  }

  let chart = $('<div class="chart"></div>');
  chart.css({
    'display': 'grid',
    'position': 'relative',
    'column-gap': options.spacing,
    'grid-template-columns': 'auto repeat(' + data.length + ', 1fr)',
    'align-items': 'end',
    'color': options.labelColor,
    'font-size': options.labelSize,
  });
  let bars = []
  let labels = []
  for(let i = 0; i < data.length; i++){
    bars.push(createBar(data[i], options, i));
    bars.push(createBar(data[i], options, i));
    labels.push(createLabel(data[i], options, i));
  }
  chart.append(bars);
  chart.append(labels);
  chart.append(createMarks(data, options));

  element.append(chart);
}

const createLabel = function(data, options, index) {
  let label = $('<div class="label"></div>');
  label.css({
    'grid-column': index + 2,
    'grid-row': 2,
    'text-align': 'center',
    'color': data.labelColor,
  });
  label.append(data.label);
  return label;
}

const createBar = function(barData, options, index){
  let bar = $('<div class="bar"></div>');
  // set bar size, and do not exceed chart maximum
  let barLength = barData.value < options.maxValue ? barData.value : options.maxValue;
  barLength *= options.pixelsPerUnit;
  // set up bar formatting
  bar.css({
    'grid-column': index + 2,
    'grid-row': 1,
    'height': barLength,
    'display': 'flex',
    'justify-content': 'center',
    'background-color': barData.barColor ? barData.barColor : options.barColor,
  });
  // set vertical alignment of value label
  switch(options.barValueAlign) {
    case 'bottom':
      bar.css('align-items', 'flex-end');
      break;
    case 'middle':
      bar.css('align-items', 'center');
      break;
    case 'top':
    default:
      bar.css('align-items', 'flex-start');
  }
  // add value label
  bar.append($('<p>' + barData.value + '</p>').css('margin', 0));
  return bar;
}

const createMarks = function(data, options) {
  const count = options.maxValue / options.markFrequency;
  let marks = $('<div class="measures"></div>');
  marks.css({
    'position': 'relative',
    'display': 'grid',
    'grid-template-columns': 'subgrid',
    'grid-template-rows': '1em repeat(' + (count) + ', ' + options.pixelsPerUnit * options.markFrequency + 'px)',
    'grid-column': '1 / ' + (data.length + 2),
    'grid-row': 1,
  });
  const markWidth = String(count * options.markFrequency).length + 1 + 'ch'
  for(let i = 0; i <= count; i++) {
    let mark = $('<div class="mark">' + (options.maxValue - i * options.markFrequency) + '</div>');
    mark.css({
      'grid-column': 1,
      'grid-row': i + 1,
      'align-self': 'end',
      'text-align': 'center',
      'width': markWidth,
      'height': '1em',
      'margin-bottom': '0.1em'
    });
    marks.append(mark);

    let rule = $('<div class="rule"></div>');
    rule.css({
      'grid-column': '1 / ' + (data.length + 2),
      'grid-row': i + 1,
      'z-index': i !== count ? -1 : 1,
      'border-bottom': i !== count ? options.ruleStyle : options.axisStyle,
    });
    marks.append(rule);
  }

  let yAxis = $('<div class="y-axis"></div>');
  yAxis.css({
    'grid-column': 1,
    'grid-row': '1 / ' + count + 2,
    'border-right': options.axisStyle,
    'width': markWidth
  });
  marks.append(yAxis);

  return marks;
}
