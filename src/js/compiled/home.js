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
            _this.tl = new TimelineMax({
              delay: 0
            }).pause();
            _this.tl.set(_this.principles_swiper, {
              display: 'block'
            }).set(_this.overlay, {
              display: 'block'
            }).from(_this.principles_swiper, 0.2, {
              autoAlpha: 0
            }).from(_this.overlay, 0.2, {
              autoAlpha: 0
            }, "-=0.2").to(_this.principlesDt, 0.2, {
              opacity: 0
            }, "-=0.2");
            _this.principles.on('click', _this.showPrinciples);
            return _this.closeBtn.on('click', _this.hidePrinciples);
          }
        };
      })(this));
    }

    Homepage.prototype.showPrinciples = function(e) {
      var slide;
      this.tl.play();
      this.principles_swiper.addClass('visible');
      slide = parseInt($(e.currentTarget).attr('data-principle-index'));
      return this.principlesSwiper.slideTo(slide + 1, 0);
    };

    Homepage.prototype.hidePrinciples = function() {
      return this.tl.tweenTo(0).duration(0.4);
    };

    Homepage.prototype.isMobile = function() {
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
    };

    Homepage.prototype.initDom = function() {
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
