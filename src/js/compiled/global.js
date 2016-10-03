(function() {
  var Global,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Global = (function() {
    function Global() {
      this.initDom = bind(this.initDom, this);
      this.initDom();
      window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();
      $((function(_this) {
        return function() {
          if (_isMobile) {
            FastClick.attach(document.body);
          }
          $('body').addClass(_isMobile ? 'mobile' : 'desktop');
          return window.lazySizesConfig = {
            addClasses: true
          };
        };
      })(this));
      $(window).on('load', (function(_this) {
        return function() {
          if (!_isMobile) {
            return window.CinemagraphHero.doSpeedTest(window.CinemagraphHero.initCinemagraph);
          }
        };
      })(this));
    }

    Global.prototype.initDom = function() {};

    return Global;

  })();

  this.Global = new Global;

}).call(this);
