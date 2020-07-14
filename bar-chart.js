const defaultOptions = {
  pixelsPerUnit: 20,
  spacing: 20,
  valueAlignment: 'middle',
  barColor: 'gray',
}

$(document).ready(function() {
  drawBarChart([1, 2, 3, 4, 5], defaultOptions, $('.bar-chart'));
});

const drawBarChart = function(data, options, element) {
  element.append(createBars(data, options, element));
}

const createBars = function(data, options, element) {
  let bars = [];
  const barWidth = (element.width() - options.spacing * data.length) / data.length;
  for(let i = 0; i < data.length; i++) {
    const currentData = data[i];
    let bar = $('<div class="bar"></div>');
    const barHeight = options.pixelsPerUnit * currentData;
    bar.css({
      'display': 'flex',
      'justify-content': 'center',
      'position': 'absolute',
      'bottom': 0,
      'left': options.spacing + options.spacing * i + barWidth * i,
      'width': barWidth,
      'border': '1px solid black',
      'background-color': options.barColor,
    });
    switch(options.valueAlignment) {
      case 'bottom':
        bar.css('align-items', 'flex-end');
        break;
      case 'middle':
        // currently centers text from the top, causing noticeable misalignment
        bar.css('align-items', 'center');
        break;
      case 'top':
      default:
        bar.css('align-items', 'flex-start');
    }
    bar.animate({'height': barHeight});
    bar.append(createValueLabel(bar, currentData, options));
    bars.push(bar);
  }
  return bars;
}

const createValueLabel = function(bar, value, options) {
  let barValueLabel = $('<p>' + value + '</p>');
  barValueLabel.css({
    'position': 'absolute',
    'margin': 0,
    // 'width': bar.width(),
  });

  return barValueLabel;
}
