(function() {
  var ProgressTimeline,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ProgressTimeline = (function() {
    function ProgressTimeline() {
      this.initDom = bind(this.initDom, this);
      this.initMobileTimelineSwiper = bind(this.initMobileTimelineSwiper, this);
      this.updateTimeline = bind(this.updateTimeline, this);
      this.initSlider = bind(this.initSlider, this);
      this.initDesktopTimeline = bind(this.initDesktopTimeline, this);
      this.initDom();
      $(document).ready((function(_this) {
        return function() {
          _this.initMobileTimelineSwiper();
          _this.initDesktopTimeline();
          return _this.initSlider();
        };
      })(this));
    }

    ProgressTimeline.prototype.initDesktopTimeline = function() {
      var spd;
      this.tml = new TimelineMax({
        delay: 0,
        paused: true
      });
      spd = 0.4;
      return this.tml.addLabel('step0').to(this.s1, spd, {
        opacity: 0.3,
        left: "20%",
        scale: 0.8,
        ease: Power0.easeNone
      }).set(this.s1, {
        zIndex: 995
      }).set(this.s2, {
        zIndex: 1000
      }).to(this.s2, spd, {
        opacity: 1,
        left: "50%",
        scale: 1,
        ease: Power0.easeNone
      }, "-=" + spd).to(this.s3, spd * 0.1, {
        opacity: 0.3,
        left: "80%",
        ease: Power0.easeNone
      }, "-=" + (spd * 0.1)).addLabel('step1').to(this.s1, spd * 0.1, {
        opacity: 0,
        left: "15%",
        ease: Power0.easeNone
      }).to(this.s2, spd, {
        opacity: 0.3,
        left: "20%",
        scale: 0.8,
        ease: Power0.easeNone
      }, "-=" + (spd * 0.1)).set(this.s2, {
        zIndex: 995
      }).set(this.s3, {
        zIndex: 1000
      }).to(this.s3, spd, {
        opacity: 1,
        left: "50%",
        scale: 1,
        ease: Power0.easeNone
      }, "-=" + spd).to(this.s4, spd * 0.1, {
        opacity: 0.3,
        left: "80%",
        ease: Power0.easeNone
      }, "-=" + (spd * 0.1)).addLabel('step2').to(this.s2, spd * 0.1, {
        opacity: 0,
        left: "15%",
        ease: Power0.easeNone
      }).to(this.s3, spd, {
        opacity: 0.3,
        left: "20%",
        scale: 0.8,
        ease: Power0.easeNone
      }, "-=" + (spd * 0.1)).set(this.s3, {
        zIndex: 995
      }).set(this.s4, {
        zIndex: 1000
      }).to(this.s4, spd, {
        opacity: 1,
        left: "50%",
        scale: 1,
        ease: Power0.easeNone
      }, "-=" + spd).to(this.s5, spd * 0.1, {
        opacity: 0.3,
        left: "80%",
        ease: Power0.easeNone
      }, "-=" + (spd * 0.1)).addLabel('step3').to(this.s3, spd * 0.1, {
        opacity: 0,
        left: "15%",
        ease: Power0.easeNone
      }).to(this.s4, spd, {
        opacity: 0.3,
        left: "20%",
        scale: 0.8,
        ease: Power0.easeNone
      }, "-=" + (spd * 0.1)).set(this.s4, {
        zIndex: 995
      }).set(this.s5, {
        zIndex: 1000
      }).to(this.s5, spd, {
        opacity: 1,
        left: "50%",
        scale: 1,
        ease: Power0.easeNone
      }, "-=" + spd).to(this.s6, spd * 0.1, {
        opacity: 0.3,
        left: "80%"
      }, "-=" + (spd * 0.1)).addLabel('step4').to(this.s4, spd * 0.1, {
        opacity: 0,
        left: "15%",
        ease: Power0.easeNone
      }).to(this.s5, spd, {
        opacity: 0.3,
        left: "20%",
        scale: 0.8,
        ease: Power0.easeNone
      }, "-=" + (spd * 0.1)).set(this.s5, {
        zIndex: 995
      }).set(this.s6, {
        zIndex: 1000
      }).to(this.s6, spd, {
        opacity: 1,
        left: "50%",
        scale: 1,
        ease: Power0.easeNone
      }, "-=" + spd).to(this.s7, spd * 0.1, {
        opacity: 0.3,
        left: "80%"
      }, "-=" + (spd * 0.1)).addLabel('step5').to(this.s5, spd * 0.1, {
        opacity: 0,
        left: "15%",
        ease: Power0.easeNone
      }).to(this.s6, spd, {
        opacity: 0.3,
        left: "20%",
        scale: 0.8,
        ease: Power0.easeNone
      }, "-=" + (spd * 0.1)).set(this.s6, {
        zIndex: 995
      }).set(this.s7, {
        zIndex: 1000
      }).to(this.s7, spd, {
        opacity: 1,
        left: "50%",
        scale: 1,
        ease: Power0.easeNone
      }, "-=" + spd).to(this.s8, spd * 0.1, {
        opacity: 0.3,
        left: "80%"
      }, "-=" + (spd * 0.1)).addLabel('step6').to(this.s6, spd * 0.1, {
        opacity: 0,
        left: "15%",
        ease: Power0.easeNone
      }).to(this.s7, spd, {
        opacity: 0.3,
        left: "20%",
        scale: 0.8,
        ease: Power0.easeNone
      }, "-=" + (spd * 0.1)).set(this.s7, {
        zIndex: 995
      }).set(this.s8, {
        zIndex: 1000
      }).to(this.s8, spd, {
        opacity: 1,
        left: "50%",
        scale: 1,
        ease: Power0.easeNone
      }, "-=" + spd).to(this.s9, spd * 0.1, {
        opacity: 0.3,
        left: "80%"
      }, "-=" + (spd * 0.1)).addLabel('step7').to(this.s7, spd * 0.1, {
        opacity: 0,
        left: "15%",
        ease: Power0.easeNone
      }).to(this.s8, spd, {
        opacity: 0.3,
        left: "20%",
        scale: 0.8,
        ease: Power0.easeNone
      }, "-=" + (spd * 0.1)).set(this.s8, {
        zIndex: 995
      }).set(this.s9, {
        zIndex: 1000
      }).to(this.s9, spd, {
        opacity: 1,
        left: "50%",
        scale: 1,
        ease: Power0.easeNone
      }, "-=" + spd).to(this.s10, spd * 0.1, {
        opacity: 0.3,
        left: "80%"
      }, "-=" + (spd * 0.1)).addLabel('step8').to(this.s8, spd * 0.1, {
        opacity: 0,
        left: "15%",
        ease: Power0.easeNone
      }).to(this.s9, spd, {
        opacity: 0.3,
        left: "20%",
        scale: 0.8,
        ease: Power0.easeNone
      }, "-=" + (spd * 0.1)).set(this.s9, {
        zIndex: 995
      }).set(this.s10, {
        zIndex: 1000
      }).to(this.s10, spd, {
        opacity: 1,
        left: "50%",
        scale: 1,
        ease: Power0.easeNone
      }, "-=" + spd).addLabel('step9');
    };

    ProgressTimeline.prototype.initSlider = function() {
      return this.prog_dt_slider.draggable({
        axis: 'x',
        containment: 'parent',
        drag: (function(_this) {
          return function(e) {
            return _this.updateTimeline(e.target.offsetLeft);
          };
        })(this)
      });
    };

    ProgressTimeline.prototype.updateTimeline = function(delta) {
      var dist;
      dist = this.prog_dt_slider_container.width() - 30;
      return this.tml.progress(delta / dist);
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
