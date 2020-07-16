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
  element.css({
    'display': 'grid',
    'column-gap': options.spacing,
    'grid-template-columns': 'auto repeat(' + data.length + ', 1fr)',
  });
  let bars = []
  let labels = []
  for(let i = 0; i < data.length; i++){
    bars.push(createBar(data[i], options, i));
    labels.push(createLabel(data[i], options, i));
  }
  element.append(createTicks(options));
  element.append(bars);
  element.append(labels);
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
    'border': '1px solid black',
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

const createTicks = function(options) {
  let ticks = $('<div class="ticks"></div>');
  const count = options.maxValue / options.tickFrequency;
  ticks.css({
    'position': 'relative',
    'grid-column': 1,
    'grid-row': 1,
    'align-self': 'end',
    'justify-self': 'end',
    'width': String(count * options.tickFrequency).length + 'ch',
    'height': options.maxValue * options.pixelsPerUnit,
  })
  for(let i = 0; i <= count; i++) {
    let tick = $('<div class="tick">' + options.tickFrequency * i + '</div>');
    tick.css({
      'position': 'absolute',
      'bottom': i * options.pixelsPerUnit * options.tickFrequency,
      'right': 0,
      'align-text': 'right',
    });
    ticks.append(tick);
  }
  return ticks;
}
