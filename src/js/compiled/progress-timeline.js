(function() {
  var ProgressTimeline,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ProgressTimeline = (function() {
    function ProgressTimeline() {
      this.initDom = bind(this.initDom, this);
      this.initMobileTimelineSwiper = bind(this.initMobileTimelineSwiper, this);
      this.updateTimeline = bind(this.updateTimeline, this);
      this.revealCopy = bind(this.revealCopy, this);
      this.animateStop = bind(this.animateStop, this);
      this.setWidth = bind(this.setWidth, this);
      this.initSlider = bind(this.initSlider, this);
      this.goToYear = bind(this.goToYear, this);
      this.initDesktopTimeline = bind(this.initDesktopTimeline, this);
      this.initDom();
      window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();
      $(document).ready((function(_this) {
        return function() {
          _this.setWidth();
          _this.initMobileTimelineSwiper();
          _this.initDesktopTimeline();
          _this.initSlider();
          _this.years.on('click', _this.goToYear);
          _this.sliderPos = 0;
          _this.HM = new Hammer(document.getElementById('progress-timeline--desktop__image-carousel'), {
            recognizers: [[Hammer.Pan]]
          });
          _this.HM.on('pan', function(ev) {
            return _this.updateTimeline(_this.sliderPos + (ev.deltaX * -0.3));
          });
          return _this.HM.on('panend', function(ev) {
            var dist;
            dist = _this.sliderPos + (ev.deltaX * -0.3);
            return _this.animateStop(dist);
          });
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
          this.tml.add(TweenLite.to($("#prog-tl-" + (i + 1)), nmspd, {
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

    ProgressTimeline.prototype.goToYear = function(e) {
      var delta, step;
      step = $(e.currentTarget).attr('data-index');
      delta = step * this.d10;
      TweenLite.to(this.slidesCopy, 0.2, {
        opacity: 0
      });
      return this.animateStop(delta);
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
      delta = delta >= this.rangeWidth ? this.rangeWidth : delta <= 0 ? 0 : delta;
      stepNum = Math.round(delta / this.d10);
      $('.progress-timeline--desktop__year').removeClass('selected');
      $("#progress-timeline--desktop__year-" + stepNum).addClass('selected');
      if (stepNum > 9) {
        stepNum = 9;
      }
      slidesNum = this.slides.length;
      snapFigure = stepNum * this.d10;
      this.sliderPos = snapFigure;
      TweenLite.to(this.prog_dt_slider, 0.5, {
        left: snapFigure,
        ease: Expo.easeOut
      });
      this.tml.tweenTo("step" + stepNum, {
        ease: Expo.easeOut
      }).duration(1);
      return this.revealCopy(stepNum);
    };

    ProgressTimeline.prototype.revealCopy = function(n) {
      return this.copyTimeout = setTimeout((function(_this) {
        return function() {
          TweenLite.to($("#progress-timeline--desktop__copy-" + n), 0.2, {
            opacity: 1
          });
          return _this.copyHideThrottle = false;
        };
      })(this), 400);
    };

    ProgressTimeline.prototype.updateTimeline = function(delta) {
      var prog, stepNum;
      delta = delta >= this.rangeWidth ? this.rangeWidth : delta <= 0 ? 0 : delta;
      stepNum = Math.round(delta / this.d10);
      $('.progress-timeline--desktop__year').removeClass('selected');
      $("#progress-timeline--desktop__year-" + stepNum).addClass('selected');
      if (!this.copyHideThrottle) {
        this.copyHideThrottle = true;
        TweenLite.to(this.slidesCopy, 0.2, {
          opacity: 0
        });
      }
      clearTimeout(this.copyTimeout);
      prog = delta / this.rangeWidth;
      return this.tml.progress(prog);
    };

    ProgressTimeline.prototype.initMobileTimelineSwiper = function() {
      return this.sw = new Swiper(this.prog_tl_swiper_container, {
        spaceBetween: 0,
        speed: 600,
        loop: true,
        autoplay: _isMobile ? 3800 : false,
        autoplayDisableOnInteraction: false,
        effect: 'slide',
        observer: true,
        observeParents: true,
        pagination: '#progress-timeline__pagination'
      });
    };

    ProgressTimeline.prototype.initDom = function() {
      this.prog_tl_swiper_container = $('#progress-timeline__carousel-wrapper');
      this.prog_dt_slider = $('#progress-timeline--desktop__slider');
      this.prog_dt_slider_container = $('#progress-timeline--desktop__slider-container');
      this.slides = $('.progress-timeline--desktop__image');
      this.slidesCopy = $('.progress-timeline--desktop__copy-item');
      this.years = $('.progress-timeline--desktop__year');
      return this.image_carousel = $('#progress-timeline--desktop__image-carousel');
    };

    return ProgressTimeline;

  })();

  this.ProgressTimeline = new ProgressTimeline;

}).call(this);
