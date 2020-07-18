const defaultOptions = {
  title: 'Bar Chart',
  maxValue: 20,
  pixelsPerUnit: 20,
  markFrequency: 5,
  spacing: 50,
  valueAlignment: 'middle',
  barColor: 'grey',
  labelColor: 'grey',
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
  let title = $('<p>' + options.title + '</p>');
  let chart = $('<div class="chart"></div>');
  chart.css({
    'display': 'grid',
    'position': 'relative',
    'column-gap': options.spacing,
    'grid-template-columns': 'auto repeat(' + data.length + ', 1fr)',
  });
  let bars = []
  let labels = []
  for(let i = 0; i < data.length; i++){
    bars.push(createBar(data[i], options, i));
    labels.push(createLabel(data[i], options, i));
  }
  chart.append(bars);
  chart.append(labels);
  chart.append(createMarks(data, options));
  chart.append(createYAxisLine());

  element.append(title);
  element.append(chart);
}

const createLabel = function(data, options, index) {
  let label = $('<div class="label"></div>');
  label.css({
    'grid-column': index + 2,
    'grid-row': 2,
    'text-align': 'center',
    'color': data.labelColor ? data.labelColor : options.labelColor,
  });
  label.append(data.label);
  return label;
}

const createBar = function(data, options, index){
  let bar = $('<div class="bar"></div>');
  // set bar size, and do not exceed chart maximum
  let barLength = data.value < options.maxValue ? data.value : options.maxValue;
  barLength *= options.pixelsPerUnit;
  // set up bar formatting
  bar.css({
    'grid-column': index + 2,
    'grid-row': 1,
    'align-self': 'end',
    'height': barLength,
    'display': 'flex',
    'justify-content': 'center',
    'background-color': data.barColor ? data.barColor : options.barColor,
  });
  // set vertical alignment of value label
  switch(options.valueAlignment) {
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
  bar.append($('<p>' + data.value + '</p>').css('margin', 0));
  return bar;
}

const createMarks = function(data, options) {
  const count = options.maxValue / options.markFrequency;
  let marks = $('<div class="measures"></div>');
  marks.css({
    'position': 'relative',
    'display': 'grid',
    'grid-template-rows': '1em repeat(' + (count) + ', ' + options.pixelsPerUnit * options.markFrequency + 'px)',
    'grid-template-columns': 'subgrid',
    'grid-column': '1 / ' + (data.length + 2),
    'grid-row': 1,
  });
  for(let i = 0; i <= count; i++) {
    let mark = $('<div class="mark">' + (options.maxValue - i * options.markFrequency) + '</div>');
    mark.css({
      'grid-column': 1,
      'grid-row': i + 1,
      'align-self': 'end',
      'text-align': 'center',
      'width': String(count * options.markFrequency).length + 1 + 'ch',
      'height': '1em',
      'margin-bottom': '0.1em'
    });
    marks.append(mark);

    let rule = $('<div class="rule"></div>');
    rule.css({
      'grid-column': '1 / ' + (data.length + 2),
      'grid-row': i + 1,
      'z-index': -1,
      'border-bottom': i === count ? '1px solid black' : '1px dotted black',
    });
    marks.append(rule);
  }
  return marks;
}

const createYAxisLine = function() {
  let axes = $('<div class="axes"></div>');
  axes.css({
    'position': 'relative',
    'grid-column-start': 1,
    'grid-row': 1,
    'border-left': '1px solid black',
    'left': '100%',
  });
  return axes;
}
