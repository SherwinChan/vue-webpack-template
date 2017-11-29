(function (doc, win) {
  var docEl = doc.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function () {
    var clientWidth = docEl.clientWidth;
    // clientWidth=
    if (!clientWidth) return;
    docEl.style.fontSize = (clientWidth / 12.42) + 'px';
  }
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);