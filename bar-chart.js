const defaultOptions = {
  maxValue: 20,
  pixelsPerUnit: 20,
  tickFrequency: 5,
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
  let chart = $('<div class="chart"></div>');
  element.append(chart);
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
  chart.append(drawAxes(data));
  chart.append(drawRules(data, options));
  chart.append(bars);
  chart.append(labels);
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

const drawRules = function(data, options) {
  const count = options.maxValue / options.tickFrequency;
  // create ruler container
  let rules = $('<div class="rules"></div>');
  rules.css({
    'display': 'grid',
    'position': 'relative',
    'grid-template-columns': 'subgrid',
    'grid-column': '1 / ' + (data.length + 2),
    'grid-row': 1,
    'height': options.maxValue * options.pixelsPerUnit,
  });
  // create value marker container
  let marks = $('<div class="measures"></div>');
  marks.css({
    'position': 'relative',
    'grid-column': 1,
    'grid-row': 1,
    'align-self': 'center',
    'justify-self': 'end',
    'width': String(count * options.tickFrequency).length + 1 + 'ch',
    'height': options.maxValue * options.pixelsPerUnit,
  })
  for(let i = 0; i <= count; i++) {
    // add ruler
    let rule = $('<div class="rule"></div>');
    rule.css({
      'position': 'absolute',
      'height': 0,
      'z-index': i === 0 ? 1 : -1,
      'bottom':  i * options.pixelsPerUnit * options.tickFrequency,
      'border-bottom': i === 0 ? '1px solid black' : '1px dotted black',
      'width': '100%',
    })
    rules.append(rule);
    // add value marker
    let mark = $('<div class="tick">' + options.tickFrequency * i + '</div>');
    mark.css({
      'position': 'absolute',
      'bottom': i * options.pixelsPerUnit * options.tickFrequency,
      'text-align': 'center',
      'width': '100%',
    });
    marks.append(mark);
  }
  rules.append(marks);
  return rules;
}

const drawAxes = function(data) {
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
