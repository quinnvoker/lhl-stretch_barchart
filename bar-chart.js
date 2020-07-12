$(document).ready(function() {
  drawBarChart([1, 2, 3, 4, 5], {}, $('.bar-chart'));
});

const drawBarChart= function(data, options, element) {
  element.append(createBars(data, options));
}

const createBars = function (data, options) {
  let bars = [];
  for(let currentData of data) {
    let bar = $('<div class="bar">' + currentData + '</div>');
    bar.css({'display': 'inline'});
    bars.push(bar);
  }
  return bars;
}
