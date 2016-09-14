(function() {
  var PillarTabs,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PillarTabs = (function() {
    function PillarTabs() {
      this.initDom = bind(this.initDom, this);
      this.toggleTab = bind(this.toggleTab, this);
      $((function(_this) {
        return function() {
          _this.initDom();
          $(_this.pillar_tabs[0]).addClass('active');
          return _this.tab_toggle.on('click', _this.toggleTab);
        };
      })(this));
    }

    PillarTabs.prototype.toggleTab = function(e) {
      var item;
      this.pillar_tabs.removeClass('active');
      item = $(e.currentTarget).parent('.pillar-tab');
      return item.toggleClass('active');
    };

    PillarTabs.prototype.initDom = function() {
      this.pillar_tabs = $('.pillar-tab');
      return this.tab_toggle = $('.pillar-tab__heading');
    };

    return PillarTabs;

  })();

  this.PillarTabs = new PillarTabs;

}).call(this);
