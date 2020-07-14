const defaultOptions = {
  pixelsPerUnit: 20,
  spacing: 20,
  valueAlignment: 'middle',
  barColor: 'gray',
}

$(document).ready(function() {
  drawBarChart([1, 2, 3, 4, 5, 16, 23], defaultOptions, $('.bar-chart'));
});

const drawBarChart = function(data, options, element) {
  element.append(createBars(data, options, element));
}

const createBars = function(data, options, element) {
  let bars = [];
  const barWidth = (element.width() - options.spacing * data.length) / data.length;
  for(let i = 0; i < data.length; i++) {
    const currentData = data[i];
    const barHeight = options.pixelsPerUnit * currentData;
    let bar = $('<div class="bar"></div>');
    bar.append($('<p>' + currentData + '</p>'));
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
        bar.css('align-items', 'center');
        break;
      case 'top':
      default:
        bar.css('align-items', 'flex-start');
    }
    bar.animate({'height': barHeight});
    bars.push(bar);
  }
  return bars;
}
