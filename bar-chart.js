$(document).ready(function() {
  drawBarChart([1, 2, 3, 4, 5], {}, $('.bar-chart'));
});

const drawBarChart= function(data, options, element) {
  element.append(createBars(data, options, element));
}

const createBars = function (data, options, element) {
  let bars = [];
  const barWidth = element.width() / data.length;
  for(let i = 0; i < data.length; i++) {
    const currentData = data[i];
    let bar = $('<div class="bar">' + currentData + '</div>');
    bar.css({
      'position': 'absolute',
      'bottom': 0,
      'left': barWidth * i,
      'width': barWidth,
    });
    bar.width = 200;
    bars.push(bar);
  }
  return bars;
}
