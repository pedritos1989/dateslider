// https://darsa.in/sly/
jQuery(function ($) {
  'use strict';

  // $.extend($.fn.sly.defaults, {});

  // -------------------------------------------------------------
  //   Centered Navigation
  // -------------------------------------------------------------

  (function () {
    var today = moment(/*'2018-12-14'*/).locale('es'),
        nextMonth = today.clone().add(30, 'days'),
        prevMonth = today.clone().subtract(30, 'days'),
        days = [],
        $html = '';

    while (today.diff(prevMonth, 'days') >= 0) {
      days.push(prevMonth.format('LL'));
      prevMonth.add(1, 'days');
    }

    while (nextMonth.diff(today, 'days') >= 0) {
      days.push(today.format('LL'));
      today.add(1, 'days');
    }

    days = $.unique(days);

    $.each(days, function (key, value) {
      $html += '<li data-index="' + key + '">' + value + '</li>';
    });

    $('ul#items').append($html);

    var $frame = $('#centered'),
        $wrap = $frame.parent();

    // Call Sly on frame
    $frame.sly({
      horizontal: 1,
      itemNav: 'forceCentered',
      smart: 1,
      activateMiddle: 1,
      activateOn: 'click',
      mouseDragging: 1,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: (days.length - 1) / 2,
      scrollBar: $wrap.find('.scrollbar'),
      scrollBy: 1,
      speed: 300,
      elasticBounds: 1,
      easing: 'easeOutExpo',
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,
    });

    showMe((days.length - 1) / 2);
    // $frame.sly('on', 'active', function (eventName, itemIndex) {
    //     showMe(itemIndex);
    // });
    $frame.sly('on', 'change', function () {
      showMe($('ul#items li.active').data('index'));
    });

    function showMe(pos) {
      setTimeout(function () {
        $('ul.pages').html('<strong>Usted ha seleccionado la fecha: ' + days[pos] + '</strong>');
      }, 500);
    }
  }());
});
