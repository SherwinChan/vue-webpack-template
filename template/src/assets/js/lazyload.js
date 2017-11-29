// edit by sherwin 2017.11.16
window.Echo = (function (window, document, undefined) {

  'use strict';

  var store = [],
    offset,
    throttle,
    poll;

  var _inView = function (el) {
    var coords = el.getBoundingClientRect();
    return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset));
  };

  var _pollImages = function () {
    for (var i = store.length; i--;) {
      var self = store[i];
      if (_inView(self)) {
        //background的css方式
        self.style.backgroundImage = 'url(' + self.getAttribute("data-lazy") + ')';
        // self.style.opacity = 1;

        // img标签的方式
        // self.src = self.getAttribute('data-lazy');
        // store.splice(i, 1);
        // self.setAttribute('lazy','loaded')
      }
    }
    if (store.length === 0) {
      if (document.addEventListener) {
        window.removeEventListener('scroll', _throttle, false);
      } else {
        window.detachEvent('onscroll', _throttle);
      }
    }
  };

  var _throttle = function () {
    clearTimeout(poll);
    poll = setTimeout(_pollImages, throttle);
  };

  var init = function (obj) {

    var opts = obj || {};
    var node = opts.img || undefined;
    offset = opts.offset || 0;
    throttle = opts.throttle || 250;
    if (node instanceof Array && node.length) {
      // node是数组
      node.forEach(function(item){
        store.push(item)
      })
    } else {
      if (node && node.getAttribute('data-lazy')) {
        store.push(node)
      }
    }


    _throttle();

    if (document.addEventListener) {
      window.addEventListener('scroll', _throttle, false);
    } else {
      window.attachEvent('onscroll', _throttle);
    }
  };

  return {
    init: init,
    render: _throttle
  };

})(window, document);

// use 
// <div class="cover img-placeholder" ref="cover" :data-lazy="detail.cover"></div>
// this.$nextTick(() => {
//   if (this.$refs['cover']) {
//     Echo.init({
//       img: _this.$refs['cover'],
//       offset: 0,
//       throttle: 0
//     });
//   }
// })