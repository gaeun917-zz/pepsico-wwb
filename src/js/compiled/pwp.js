(function() {
  var Pwp,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pwp = (function() {
    function Pwp() {
      this.initDom = bind(this.initDom, this);
      this.initDom();
      TweenLite.to(this.wn, 2, {
        y: 100
      });
    }

    Pwp.prototype.isMobile = function() {
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
    };

    Pwp.prototype.initDom = function() {
      return this.wn = $('.wangotron-wrap');
    };

    return Pwp;

  })();

  this.Pwp = new Pwp;

}).call(this);
