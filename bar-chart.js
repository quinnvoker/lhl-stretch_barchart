const drawBarChart = function(data, options, element) {
  if(options.title) {
    let title = $('<p>' + options.title + '</p>');
    title.css({
      'font-size': options.titleSize,
      'color': options.titleColor,
      'text-align': options.titleAlign,
    });
    element.append(title);
  }

  let chart = $('<div class="chart"></div>');
  chart.css({
    'display': 'grid',
    'position': 'relative',
    'column-gap': options.spacing,
    'grid-template-columns': String(options.maxValue).length + 1 + 'ch' + ' repeat(' + data.length + ', 1fr)',
    'align-items': 'end',
    'color': options.labelColor,
    'font-size': options.labelSize,
  });
  let bars = []
  let labels = []
  for(let i = 0; i < data.length; i++){
    const currentData = data[i];
    if(Array.isArray(currentData)){
      bars.push(createMultiBar(currentData, options, i));
      labels.push(createMultiLabel(currentData, options, i));
    } else {
      bars.push(createBar(currentData, options, i));
      labels.push(createLabel(currentData, options, i));
    }
  }
  chart.append(bars);
  chart.append(labels);
  chart.append(createMarks(data, options));

  animateBars(bars);

  element.append(chart);
}

const createLabel = function(data, options, index) {
  let label = $('<div class="label"></div>');
  label.css({
    'grid-column': index + 2,
    'grid-row': 2,
    'align-self': 'start',
    'text-align': 'center',
    'color': data.labelColor,
  });
  label.append(data.label);
  return label;
}

const createBar = function(barData, options, index) {
  let bar = $('<div class="bar"></div>');
  // set bar size, and do not exceed chart maximum
  let barLength = barData.value < options.maxValue ? barData.value : options.maxValue;
  barLength *= options.pixelsPerUnit;
  // set up bar formatting
  bar.css({
    'grid-column': index + 2,
    'grid-row': 1,
    'height': barLength,
    'display': 'flex',
    'justify-content': 'center',
    'background-color': barData.barColor ? barData.barColor : options.barColor,
  });
  // set vertical alignment of value label
  switch(options.barValueAlign) {
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
  bar.append($('<p>' + barData.value + '</p>').css({'margin': 0}));
  return bar;
}

// note: single bars do not exceed maximum value of chart, but a multibar can
const createMultiBar = function(barDataArray, options, index) {
  let multiBar = $('<div class="multi-bar"></div>');
  multiBar.css({
    'grid-column': index + 2,
    'grid-row': 1,
  });
  for(let barData of barDataArray) {
    multiBar.append(createBar(barData, options, index))
  }
  return multiBar;
}

const createMultiLabel = function(barDataArray, options, index) {
  let multiLabel = $('<div class="multi-label"></div>');
  multiLabel.css({
    'grid-column': index + 2,
    'grid-row': 2,
  });
  for(let barData of barDataArray) {
    multiLabel.append(createLabel(barData, options, index))
  }
  return multiLabel;
}

const createMarks = function(data, options) {
  const count = options.maxValue / options.markFrequency;
  let marks = $('<div class="measures"></div>');
  marks.css({
    'position': 'relative',
    'display': 'grid',
    'grid-template-columns': 'subgrid',
    'grid-template-rows': '1em repeat(' + (count) + ', ' + options.pixelsPerUnit * options.markFrequency + 'px)',
    'grid-column': '1 / ' + (data.length + 2),
    'grid-row': 1,
  });
  const markWidth = String(options.maxValue).length + 1 + 'ch'
  for(let i = 0; i <= count; i++) {
    let mark = $('<div class="mark">' + (options.maxValue - i * options.markFrequency) + '</div>');
    mark.css({
      'grid-column': 1,
      'grid-row': i + 1,
      'align-self': 'end',
      'text-align': 'center',
      'width': markWidth,
      'height': '1em',
      'margin-bottom': '0.1em'
    });
    marks.append(mark);
    // add ruler line under mark
    let rule = $('<div class="rule"></div>');
    rule.css({
      'grid-column': '1 / ' + (data.length + 2),
      'grid-row': i + 1,
      'z-index': i !== count ? -1 : 1,
      'border-bottom': i !== count ? options.ruleStyle : options.axisStyle,
    });
    marks.append(rule);
  }
  // add y axis line
  let yAxis = $('<div class="y-axis"></div>');
  yAxis.css({
    'grid-column': 1,
    'grid-row': '1 / ' + count + 2,
    'border-right': options.axisStyle,
    'width': markWidth
  });
  marks.append(yAxis);

  return marks;
}

const animateBars = function(bars) {
  for(let bar of bars) {
    if(bar.hasClass('multi-bar')){
      bar.children().each(function() {
        growBar($(this));
      });
    } else {
      growBar(bar);
    }
  }
}

const growBar = function(bar){
  const barHeight = bar.height();
  bar.height(0);
  bar.animate({'height': barHeight});
}
