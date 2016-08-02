(function() {
  var Homepage,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Homepage = (function() {
    function Homepage() {
      this.initDom = bind(this.initDom, this);
      this.hidePrinciples = bind(this.hidePrinciples, this);
      this.showPrinciples = bind(this.showPrinciples, this);
      this.initDom();
      $((function(_this) {
        return function() {
          TweenMax.defaultEase = Expo.easeOut;
          if (_this.isMobile()) {
            FastClick.attach(document.body);
          }
          _this.principlesSwiper = new Swiper(_this.principles_swiper, {
            spaceBetween: 0,
            speed: 600,
            loop: true,
            autoplay: _this.isMobile() ? 3800 : false,
            autoplayDisableOnInteraction: false,
            effect: _this.isMobile() ? 'slide' : 'fade',
            fade: {
              crossFade: true
            },
            observer: true,
            observeParents: true,
            nextButton: _this.nextBtn,
            prevButton: _this.prevBtn
          });
          if (!_this.isMobile()) {
            _this.principles.on('click', _this.showPrinciples);
            return _this.closeBtn.on('click', _this.hidePrinciples);
          }
        };
      })(this));
    }

    Homepage.prototype.showPrinciples = function(e) {
      var slide;
      slide = parseInt($(e.currentTarget).attr('data-principle-index'));
      this.principlesSwiper.slideTo(slide + 1, 0);
      this.principles_wrap.addClass('unhide');
      return setTimeout((function(_this) {
        return function() {
          return _this.principles_wrap.addClass('visible');
        };
      })(this), 1);
    };

    Homepage.prototype.hidePrinciples = function() {
      this.principles_wrap.removeClass('visible');
      return setTimeout((function(_this) {
        return function() {
          return _this.principles_wrap.removeClass('unhide');
        };
      })(this), 500);
    };

    Homepage.prototype.isMobile = function() {
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
    };

    Homepage.prototype.initDom = function() {
      this.principles_wrap = $('#principles');
      this.principles_swiper = $('#principles--mobile');
      this.prevBtn = $('#principles__prev-btn');
      this.nextBtn = $('#principles__next-btn');
      this.principles = $('.principles--desktop__item');
      this.principlesDt = $('#principles--desktop');
      this.overlay = $('#principles__coloured-overlay');
      return this.closeBtn = $('#principles__btn-close');
    };

    return Homepage;

  })();

  this.Homepage = new Homepage;

}).call(this);
