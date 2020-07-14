const defaultOptions = {
  pixelsPerUnit: 20,
  spacing: 20,
  valueAlignment: 'bottom',
  barColor: 'gray',
}

$(document).ready(function() {
  drawBarChart([1, 2, 3, 4, 5, 16, 23], defaultOptions, $('.bar-chart'));
});

const drawBarChart = function(data, options, element) {
  element.css({
    'display': 'grid',
  });
  const barWidth = (element.width() - options.spacing * data.length) / data.length;
  let bars = createBars(data, options, barWidth);
  element.append(bars);
}

const createLabels = function(data, options, itemWidth) {
  let labels = $('<div class="label-area"></div>');
  for(let i = 0; i < data.length; i++) {
    const currentData = data[i];
    let label = $('<div class="label"></div>');
    label.css({
      'position': 'absolute',
      'bottom': 0,
      'left': options.spacing + options.spacing * i + itemWidth * i,
      'width': itemWidth,
      'text-align': 'center',
    });
    label.append(currentData);
    labels.append(label);
  }
  return labels;
}

const createBars = function(data, options, itemWidth) {
  let bars = [];
  for(let i = 0; i < data.length; i++) {
    const currentData = data[i];
    const barHeight = options.pixelsPerUnit * currentData;
    let bar = $('<div class="bar"></div>');
    // set up bar formatting
    bar.css({
      'grid-column': i + 1,
      'grid-row': 1,
      'align-self': 'end',
      'height': barHeight,
      'display': 'flex',
      'justify-content': 'center',
      'border': '1px solid black',
      'background-color': options.barColor,
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
    bar.append($('<p>' + currentData + '</p>').css('margin', 0));
    bars.push(bar);
  }
  return bars;
}
