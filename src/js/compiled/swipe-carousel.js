(function() {
  var SwipeCarousel,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  SwipeCarousel = (function() {
    function SwipeCarousel() {
      this.initDom = bind(this.initDom, this);
      this.initMobileTimelineSwiper = bind(this.initMobileTimelineSwiper, this);
      this.updateTimeline = bind(this.updateTimeline, this);
      this.revealCopy = bind(this.revealCopy, this);
      this.animateStop = bind(this.animateStop, this);
      this.setWidth = bind(this.setWidth, this);
      this.initSlider = bind(this.initSlider, this);
      this.goToSlide = bind(this.goToSlide, this);
      this.goToYear = bind(this.goToYear, this);
      this.initDesktopTimeline = bind(this.initDesktopTimeline, this);
      var swipePages;
      swipePages = ['pwp', 'products', 'planet', 'people'];
      if (!($.inArray(_pageID, swipePages) > -1)) {
        return false;
      }
      this.initDom();
      $(document).ready((function(_this) {
        return function() {
          _this.setWidth();
          _this.initMobileTimelineSwiper();
          _this.initDesktopTimeline();
          _this.initSlider();
          _this.years.on('click', _this.goToYear);
          _this.prog_dt_slider_image.on('click', _this.goToSlide);
          _this.sliderPos = 0;
          _this.HM = new Hammer(document.getElementById('progress-timeline--desktop__image-carousel'), {
            recognizers: [[Hammer.Pan]]
          });
          _this.HM.add(new Hammer.Pan({
            threshold: 0
          }));
          _this.HM.add(new Hammer.Swipe({
            threshold: 0
          }));
          _this.HM.on('pan swipe', function(ev) {
            return _this.updateTimeline(_this.sliderPos + (ev.deltaX * -0.3));
          });
          return _this.HM.on('panend swipeend', function(ev) {
            var dist;
            dist = _this.sliderPos + (ev.deltaX * -0.3);
            return _this.animateStop(dist);
          });
        };
      })(this));
    }

    SwipeCarousel.prototype.initDesktopTimeline = function() {
      var easez, hilef, i, j, len, lolef, lopac, loscl, lospd, lotop, nmspd, nolef, offst, ref, results, s, spd, wdth;
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
      offst = 380;
      ref = this.slides;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        s = ref[i];
        wdth = this.image_carousel.width();
        TweenLite.set($(s), {
          left: offst * i
        });
        TweenLite.set(this.image_wrapper, {
          left: (wdth / 2) - (offst / 2)
        });
        if (i < this.slides.length - 1) {
          if (i === 0) {
            this.tml.addLabel("step" + i);
            this.tml.add(TweenLite.to($("#prog-tl-" + i), nmspd, {
              opacity: lopac,
              scale: loscl,
              ease: easez
            }));
          } else {
            this.tml.add(TweenLite.to($("#prog-tl-" + (i - 1)), lospd, {
              opacity: 0,
              ease: easez
            }));
            this.tml.add(TweenLite.to($("#prog-tl-" + i), nmspd, {
              opacity: lopac,
              scale: loscl,
              ease: easez,
              delay: -lospd
            }));
          }
          this.tml.add(TweenLite.to(this.image_wrapper, nmspd, {
            x: -offst * (i + 1),
            ease: easez,
            delay: -nmspd
          }));
          this.tml.add(TweenLite.to($("#prog-tl-" + (i + 1)), nmspd, {
            opacity: 1,
            scale: 1,
            ease: easez,
            delay: -nmspd
          }));
          if (i < this.slides.length - 2) {
            this.tml.add(TweenLite.to($("#prog-tl-" + (i + 2)), lospd, {
              clearProps: 'z-index',
              opacity: lopac,
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

    SwipeCarousel.prototype.goToYear = function(e) {
      var delta, step;
      step = $(e.currentTarget).attr('data-index');
      delta = step * this.d10;
      TweenLite.to(this.slidesCopy, 0.2, {
        opacity: 0
      });
      return this.animateStop(delta);
    };

    SwipeCarousel.prototype.goToSlide = function(e) {
      var delta, step;
      step = $(e.currentTarget).attr('data-slide');
      delta = step * this.d10;
      TweenLite.to(this.slidesCopy, 0.2, {
        opacity: 0
      });
      return this.animateStop(delta);
    };

    SwipeCarousel.prototype.initSlider = function() {
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

    SwipeCarousel.prototype.setWidth = function() {
      this.rangeWidth = this.prog_dt_slider_container.width() - 30;
      return this.d10 = this.rangeWidth / (this.slides.length - 1);
    };

    SwipeCarousel.prototype.animateStop = function(delta) {
      var slidesNum, snapFigure, stepNum;
      stepNum = delta <= 0 ? 0 : delta >= this.rangeWidth ? 9 : Math.round(delta / this.d10);
      $('.progress-timeline--desktop__year').removeClass('selected');
      $("#progress-timeline--desktop__year-" + stepNum).addClass('selected');
      this.revealCopy(stepNum);
      if (delta <= 0) {
        this.tml.tweenTo("step0", {
          ease: Expo.easeOut
        }).duration(1);
        this.sliderPos = 0;
        TweenLite.to(this.prog_dt_slider, 0.5, {
          left: 0,
          ease: Expo.easeOut
        });
        return TweenLite.to(this.image_wrapper, 0.3, {
          x: 0
        });
      }
      if (delta >= this.rangeWidth) {
        this.sliderPos = this.d10 * (this.slides.length - 1);
        this.tml.tweenTo("step" + (this.slides.length - 1), {
          ease: Expo.easeOut
        }).duration(1);
        TweenLite.to(this.prog_dt_slider, 0.5, {
          left: this.d10 * (this.slides.length - 1),
          ease: Expo.easeOut
        });
        return TweenLite.to(this.image_carousel, 0.3, {
          x: 0
        });
      }
      slidesNum = this.slides.length;
      snapFigure = stepNum * this.d10;
      this.sliderPos = snapFigure;
      TweenLite.to(this.prog_dt_slider, 0.5, {
        left: snapFigure,
        ease: Expo.easeOut
      });
      return this.tml.tweenTo("step" + stepNum, {
        ease: Expo.easeOut
      }).duration(1);
    };

    SwipeCarousel.prototype.revealCopy = function(n) {
      return this.copyTimeout = setTimeout((function(_this) {
        return function() {
          TweenLite.to($("#progress-timeline--desktop__copy-" + n), 0.2, {
            opacity: 1
          });
          return _this.copyHideThrottle = false;
        };
      })(this), 400);
    };

    SwipeCarousel.prototype.updateTimeline = function(delta) {
      var prog, stepNum;
      stepNum = delta <= 0 ? 0 : delta >= this.rangeWidth ? 9 : Math.round(delta / this.d10);
      $('.progress-timeline--desktop__year').removeClass('selected');
      $("#progress-timeline--desktop__year-" + stepNum).addClass('selected');
      if (!this.copyHideThrottle && delta >= 0 && delta <= this.rangeWidth) {
        this.copyHideThrottle = true;
        TweenLite.to(this.slidesCopy, 0.2, {
          opacity: 0
        });
      }
      clearTimeout(this.copyTimeout);
      if (delta <= 0) {
        return TweenLite.set(this.image_wrapper, {
          x: -delta * 0.4
        });
      } else if (delta >= this.rangeWidth) {
        return TweenLite.set(this.image_carousel, {
          x: (this.rangeWidth - delta) * 0.4
        });
      }
      prog = delta / this.rangeWidth;
      return this.tml.progress(prog);
    };

    SwipeCarousel.prototype.initMobileTimelineSwiper = function() {
      return this.sw = new Swiper(this.prog_tl_swiper_container, {
        spaceBetween: 0,
        speed: 600,
        loop: true,
        autoplay: _isMobile ? 3800 : false,
        autoplayDisableOnInteraction: false,
        effect: 'slide',
        observer: true,
        observeParents: true,
        nextButton: this.nextBtn,
        prevButton: this.prevBtn,
        pagination: '#progress-timeline__pagination'
      });
    };

    SwipeCarousel.prototype.initDom = function() {
      this.prog_tl_swiper_container = $('#progress-timeline__carousel-wrapper');
      this.prevBtn = $('#progress-timeline__arrow--prev');
      this.nextBtn = $('#progress-timeline__arrow--next');
      this.prog_dt_slider = $('#progress-timeline--desktop__slider');
      this.prog_dt_slider_container = $('#progress-timeline--desktop__slider-container');
      this.prog_dt_slider_image = $('.progress-timeline--desktop__image');
      this.slides = $('.progress-timeline--desktop__image');
      this.slidesCopy = $('.progress-timeline--desktop__copy-item');
      this.years = $('.progress-timeline--desktop__year');
      this.image_carousel = $('#progress-timeline--desktop__image-carousel');
      return this.image_wrapper = $('#progress-timeline--desktop--image-wrapper');
    };

    return SwipeCarousel;

  })();

  this.SwipeCarousel = new SwipeCarousel;

}).call(this);
