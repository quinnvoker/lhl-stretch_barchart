const defaultOptions = {
  unitHeight: 20,
  spacing: 20,
}

$(document).ready(function() {
  drawBarChart([1, 2, 3, 4, 5], defaultOptions, $('.bar-chart'));
});

const drawBarChart= function(data, options, element) {
  element.append(createBars(data, options, element));
}

const createBars = function (data, options, element) {
  let bars = [];
  const barWidth = (element.width() - options.spacing * data.length) / data.length;
  for(let i = 0; i < data.length; i++) {
    const currentData = data[i];
    let bar = $('<div class="bar">' + currentData + '</div>');
    bar.css({
      'position': 'absolute',
      'bottom': 0,
      'left': options.spacing + options.spacing * i + barWidth * i,
      'width': barWidth,
      'height': options.unitHeight * currentData,
      'text-align': 'center',
      'border': '1px solid black',
    });
    bar.width = 200;
    bars.push(bar);
  }
  return bars;
}
