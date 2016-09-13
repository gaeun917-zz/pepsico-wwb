(function() {
  var Global,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Global = (function() {
    function Global() {
      this.initDom = bind(this.initDom, this);
      this.toggleReadMore = bind(this.toggleReadMore, this);
      this.doHeroLoad = bind(this.doHeroLoad, this);
      this.initDom();
      window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();
      $((function(_this) {
        return function() {
          _this.doHeroLoad();
          if (_isMobile) {
            FastClick.attach(document.body);
          }
          window.lazySizesConfig = {
            addClasses: true
          };
          $('body').addClass(_isMobile ? 'mobile' : 'desktop');
          return _this.readz.on('click', _this.toggleReadMore);
        };
      })(this));
    }

    Global.prototype.doHeroLoad = function() {};

    Global.prototype.toggleReadMore = function(e) {
      var parent;
      parent = $(e.currentTarget).parent();
      return parent.toggleClass('open');
    };

    Global.prototype.initDom = function() {
      this.truncated = $('.truncated');
      return this.readz = $('.readz');
    };

    return Global;

  })();

  this.Global = new Global;

}).call(this);
