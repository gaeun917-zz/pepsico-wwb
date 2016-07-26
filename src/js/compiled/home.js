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
            FastClick.attach(document.body);
          }
          return _this.principlesSwiper = new Swiper(_this.principles_swiper, {
            spaceBetween: 0,
            speed: 600,
            loop: true,
            autoplayDisableOnInteraction: false,
            effect: 'slide'
          });
        };
      })(this));
    }

    Homepage.prototype.isMobile = function() {
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
    };

    Homepage.prototype.initDom = function() {
      return this.principles_swiper = $('#principles--mobile');
    };

    return Homepage;

  })();

  this.Homepage = new Homepage;

}).call(this);
