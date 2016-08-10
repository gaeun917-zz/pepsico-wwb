(function() {
  var Global,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Global = (function() {
    function Global() {
      this.initDom = bind(this.initDom, this);
      this.toggleReadMore = bind(this.toggleReadMore, this);
      this.initDom();
      $((function(_this) {
        return function() {
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
