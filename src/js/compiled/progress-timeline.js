(function() {
  var ProgressTimeline,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ProgressTimeline = (function() {
    function ProgressTimeline() {
      this.initDom = bind(this.initDom, this);
      this.initMobileTimelineSwiper = bind(this.initMobileTimelineSwiper, this);
      this.updateTimeline = bind(this.updateTimeline, this);
      this.animateStop = bind(this.animateStop, this);
      this.setWidth = bind(this.setWidth, this);
      this.initSlider = bind(this.initSlider, this);
      this.initDesktopTimeline = bind(this.initDesktopTimeline, this);
      this.initDom();
      $(document).ready((function(_this) {
        return function() {
          _this.setWidth();
          _this.initMobileTimelineSwiper();
          _this.initDesktopTimeline();
          return _this.initSlider();
        };
      })(this));
    }

    ProgressTimeline.prototype.initDesktopTimeline = function() {
      var easez, hilef, i, j, len, lolef, lopac, loscl, lospd, lotop, nmspd, nolef, ref, results, s, spd;
      this.tml = new TimelineMax({
        delay: 0,
        paused: true
      });
      spd = 0.4;
      nmspd = 0.4;
      lospd = 0.04;
      lopac = 0.3;
      lolef = '25%';
      nolef = '20%';
      lotop = "4%";
      loscl = 0.8;
      hilef = '75%';
      easez = Power0.easeNone;
      ref = this.slides;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        s = ref[i];
        if (i < this.slides.length - 1) {
          if (i === 0) {
            this.tml.addLabel("step" + i);
            this.tml.add(TweenLite.to($("#prog-tl-" + i), nmspd, {
              opacity: lopac,
              top: lotop,
              left: lolef,
              scale: loscl,
              ease: easez
            }));
          } else {
            this.tml.add(TweenLite.to($("#prog-tl-" + (i - 1)), lospd, {
              opacity: 0,
              left: nolef,
              ease: easez
            }));
            this.tml.add(TweenLite.to($("#prog-tl-" + i), nmspd, {
              opacity: lopac,
              left: lolef,
              scale: loscl,
              ease: easez,
              delay: -lospd
            }));
          }
          this.tml.add(TweenLite.set($("#prog-tl-" + i), {
            clearProps: 'z-index'
          }));
          this.tml.add(TweenLite.to($("#prog-tl-" + (i + 1)), nmspd, {
            zIndex: 1000,
            opacity: 1,
            top: '0%',
            left: "50%",
            scale: 1,
            ease: easez,
            delay: -nmspd
          }));
          if (i < this.slides.length - 2) {
            this.tml.add(TweenLite.to($("#prog-tl-" + (i + 2)), lospd, {
              clearProps: 'z-index',
              opacity: lopac,
              left: hilef,
              ease: easez,
              delay: -lospd
            }));
          }
          results.push(this.tml.addLabel("step" + (i + 1)));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    ProgressTimeline.prototype.initSlider = function() {
      return this.prog_dt_slider.draggable({
        axis: 'x',
        containment: 'parent',
        drag: (function(_this) {
          return function(e) {
            return _this.updateTimeline(e.target.offsetLeft);
          };
        })(this),
        stop: (function(_this) {
          return function(e) {
            return _this.animateStop(e.target.offsetLeft);
          };
        })(this)
      });
    };

    ProgressTimeline.prototype.setWidth = function() {
      this.rangeWidth = this.prog_dt_slider_container.width() - 30;
      return this.d10 = this.rangeWidth / (this.slides.length - 1);
    };

    ProgressTimeline.prototype.animateStop = function(delta) {
      var slidesNum, snapFigure, stepNum;
      stepNum = Math.round(delta / (this.rangeWidth / this.slides.length));
      if (stepNum > 9) {
        stepNum = 9;
      }
      slidesNum = this.slides.length;
      snapFigure = stepNum * this.d10;
      TweenLite.to(this.prog_dt_slider, 0.5, {
        left: snapFigure,
        ease: Expo.easeOut
      });
      return this.tml.tweenTo("step" + stepNum, 0.3);
    };

    ProgressTimeline.prototype.updateTimeline = function(delta) {
      var prog;
      prog = delta / this.rangeWidth;
      return this.tml.progress(prog);
    };

    ProgressTimeline.prototype.initMobileTimelineSwiper = function() {
      return this.sw = new Swiper(this.prog_tl_swiper_container, {
        spaceBetween: 0,
        speed: 600,
        loop: true,
        autoplay: this.isMobile() ? 3800 : false,
        autoplayDisableOnInteraction: false,
        effect: 'slide',
        pagination: '#progress-timeline__pagination'
      });
    };

    ProgressTimeline.prototype.isMobile = function() {
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
    };

    ProgressTimeline.prototype.initDom = function() {
      this.prog_tl_swiper_container = $('#progress-timeline__carousel-wrapper');
      this.prog_dt_slider = $('#progress-timeline--desktop__slider');
      this.prog_dt_slider_container = $('#progress-timeline--desktop__slider-container');
      this.slides = $('.progress-timeline--desktop__image');
      this.s1 = $('#prog-tl-0');
      this.s2 = $('#prog-tl-1');
      this.s3 = $('#prog-tl-2');
      this.s4 = $('#prog-tl-3');
      this.s5 = $('#prog-tl-4');
      this.s6 = $('#prog-tl-5');
      this.s7 = $('#prog-tl-6');
      this.s8 = $('#prog-tl-7');
      this.s9 = $('#prog-tl-8');
      return this.s10 = $('#prog-tl-9');
    };

    return ProgressTimeline;

  })();

  this.ProgressTimeline = new ProgressTimeline;

}).call(this);
