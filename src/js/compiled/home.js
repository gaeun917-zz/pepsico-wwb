(function() {
  var Homepage,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Homepage = (function() {
    function Homepage() {
      this.initDom = bind(this.initDom, this);
      this.initDom();
      $((function(_this) {
        return function() {
          if (_this.isMobile) {
            return FastClick.attach(document.body);
          }
        };
      })(this));
    }

    Homepage.prototype.isMobile = function() {
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
    };

    Homepage.prototype.initDom = function() {};

    return Homepage;

  })();

  this.Homepage = new Homepage;

}).call(this);
