(function() {
  var Global,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Global = (function() {
    function Global() {
      this.initDom = bind(this.initDom, this);
      this.initDom();
      window.lazySizesConfig = {
        addClasses: true
      };
    }

    Global.prototype.initDom = function() {};

    return Global;

  })();

  this.Global = new Global;

}).call(this);
