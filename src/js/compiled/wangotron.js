(function() {
  var Wangotron,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Wangotron = (function() {
    function Wangotron() {
      this.initDom = bind(this.initDom, this);
      this.hidePillarDetails = bind(this.hidePillarDetails, this);
      this.showPillarDetails = bind(this.showPillarDetails, this);
      this.resetWangotron = bind(this.resetWangotron, this);
      this.initDom();
      $(document).ready((function(_this) {
        return function() {
          _this.pillars.on('click', _this.showPillarDetails);
          _this.modalClose.on('click', _this.hidePillarDetails);
          _this.showWangotron = function() {
            return _this.showWangTimeout = setTimeout(function() {
              return TweenLite.to(_this.wangotron, 1, {
                opacity: 1
              });
            }, 700);
          };
          return $(window).resize(function() {
            _this.resetWangotron();
            clearTimeout(_this.showWangTimeout);
            return _this.showWangotron();
          });
        };
      })(this));
    }

    Wangotron.prototype.resetWangotron = function() {
      TweenLite.set(this.wangotron, {
        x: "0%",
        opacity: 0
      });
      TweenLite.set(this.wang_items, {
        rotation: 0,
        clearProps: "all"
      });
      TweenLite.set(this.wang_products, {
        rotation: 0
      });
      TweenLite.set(this.wang_planet, {
        rotation: 0
      });
      TweenLite.set(this.wang_people, {
        rotation: 0
      });
      TweenLite.set(this.wang_pwp, {
        rotation: 0
      });
      TweenLite.set(this.wang_spin, {
        rotation: 0
      });
      TweenLite.set(this.wangotron, {
        x: "0%"
      });
      TweenLite.set(this.modal, {
        x: "0%",
        display: 'none'
      });
      this.modal.removeClass('products people planet');
      TweenLite.set(this.wang_grad, {
        opacity: 0,
        rotation: 0
      });
      return this.opening_throttle = false;
    };

    Wangotron.prototype.showPillarDetails = function(e) {
      var pillarName, spd;
      pillarName = $(e.currentTarget).attr('data-pillar');
      if (this.modal.hasClass(pillarName)) {
        return;
      }
      if (window.innerWidth < 1024) {
        TweenMax.set(this.modal, {
          display: 'block'
        });
        this.modal.addClass(pillarName);
        return TweenMax.to(this.modal, 0.5, {
          opacity: 1
        });
      } else {
        spd = 1.4;
        TweenMax.to(this.modal, 0.5, {
          opacity: 0
        });
        switch (pillarName) {
          case 'products':
            TweenLite.to(this.wang_items, spd, {
              rotation: 150,
              transformOrigin: '50% 36.2%'
            });
            TweenLite.to(this.wang_products, spd, {
              rotation: -150,
              transformOrigin: '50% 50%'
            });
            TweenLite.to(this.wang_planet, spd, {
              rotation: -150,
              transformOrigin: '50% 50%'
            });
            TweenLite.to(this.wang_people, spd, {
              rotation: -150,
              transformOrigin: '50% 50%'
            });
            TweenLite.to(this.wang_pwp, spd, {
              rotation: -150,
              transformOrigin: '50% 50%'
            });
            break;
          case 'planet':
            TweenLite.to(this.wang_items, spd, {
              rotation: 30,
              transformOrigin: '50% 36.2%'
            });
            TweenLite.to(this.wang_products, spd, {
              rotation: -30,
              transformOrigin: '50% 50%'
            });
            TweenLite.to(this.wang_planet, spd, {
              rotation: -30,
              transformOrigin: '50% 50%'
            });
            TweenLite.to(this.wang_people, spd, {
              rotation: -30,
              transformOrigin: '50% 50%'
            });
            TweenLite.to(this.wang_pwp, spd, {
              rotation: -30,
              transformOrigin: '50% 50%'
            });
            break;
          case 'people':
            TweenLite.to(this.wang_items, spd, {
              rotation: -90,
              transformOrigin: '50% 36.2%'
            });
            TweenLite.to(this.wang_products, spd, {
              rotation: 90,
              transformOrigin: '50% 50%'
            });
            TweenLite.to(this.wang_planet, spd, {
              rotation: 90,
              transformOrigin: '50% 50%'
            });
            TweenLite.to(this.wang_people, spd, {
              rotation: 90,
              transformOrigin: '50% 50%'
            });
            TweenLite.to(this.wang_pwp, spd, {
              rotation: 90,
              transformOrigin: '50% 50%'
            });
        }
        TweenLite.to(this.wang_spin, spd, {
          rotation: "+=360",
          transformOrigin: '50% 50%'
        });
        if (!this.opening_throttle) {
          TweenLite.set(this.modal, {
            display: 'block'
          });
          TweenLite.to(this.wang_grad, spd, {
            opacity: 1,
            rotation: -360,
            transformOrigin: '20% 50%'
          });
          TweenLite.to(this.wangotron, spd, {
            x: "-60%"
          });
          TweenLite.to(this.modal, spd, {
            x: "110%"
          });
          this.opening_throttle = true;
        }
        return setTimeout((function(_this) {
          return function() {
            _this.modal.removeClass('products people planet');
            _this.modal.addClass(pillarName);
            return TweenMax.to(_this.modal, 0.5, {
              opacity: 1
            });
          };
        })(this), 1000);
      }
    };

    Wangotron.prototype.hidePillarDetails = function() {
      if (window.innerWidth < 1024) {
        TweenMax.to(this.modal, 0.2, {
          opacity: 0
        });
        return setTimeout((function(_this) {
          return function() {
            TweenMax.set(_this.modal, {
              display: 'none'
            });
            return _this.modal.removeClass('products people planet');
          };
        })(this), 200);
      }
    };

    Wangotron.prototype.isMobile = function() {
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
    };

    Wangotron.prototype.initDom = function() {
      this.pillars = $('.wangotron__pillar');
      this.modal = $('#wangotron__details-modal');
      this.modalClose = $('#wangotron__details-modal__close');
      this.wang_arms = $('#wangotron__arms');
      this.wangotron = $('#wangotron');
      this.wang_items = $('#wangotron__items');
      this.wang_products = $('#wangotron__button--products');
      this.wang_people = $('#wangotron__button--people');
      this.wang_planet = $('#wangotron__button--planet');
      this.wang_pwp = $('#wangotron__pwp');
      this.wang_grad = $('#wangotron__gradient');
      return this.wang_spin = $('#wangotron__spinner');
    };

    return Wangotron;

  })();

  this.Wangotron = new Wangotron;

}).call(this);
