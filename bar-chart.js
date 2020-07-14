const defaultOptions = {
  pixelsPerUnit: 20,
  spacing: 20,
  valueAlignment: 'middle',
  barColor: 'gray',
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
  }
]

$(document).ready(function() {
  drawBarChart(dummyData, defaultOptions, $('.bar-chart'));
});

const drawBarChart = function(data, options, element) {
  element.css({
    'display': 'grid',
    'column-gap': options.spacing,
  });
  let bars = []
  let labels = []
  for(let i = 0; i < data.length; i++){
    bars.push(createBar(data[i], options, i));
    labels.push(createLabel(data[i], options, i));
  }
  element.append(bars);
  element.append(labels);
}

const createLabel = function(data, options, index) {
  let label = $('<div class="label"></div>');
  label.css({
    'grid-column': index + 1,
    'grid-row': 2,
    'text-align': 'center',
  });
  label.append(data.label);
  return label;
}

const createBar = function(data, options, index){
  const barHeight = options.pixelsPerUnit * data.value;
  let bar = $('<div class="bar"></div>');
  // set up bar formatting
  bar.css({
    'grid-column': index + 1,
    'grid-row': 1,
    'align-self': 'end',
    'height': barHeight,
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
