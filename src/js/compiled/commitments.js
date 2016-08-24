(function() {
  var Commitments,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Commitments = (function() {
    function Commitments() {
      this.initDom = bind(this.initDom, this);
      this.togglePillarContent = bind(this.togglePillarContent, this);
      this.initDom();
      this.multiItemEnabled = false;
      this.pills.on('click', this.togglePillarContent);
    }

    Commitments.prototype.togglePillarContent = function(e) {
      var pill;
      pill = $(e.currentTarget);
      if (!this.multiItemEnabled && !pill.hasClass('open')) {
        this.pill_items_content.slideUp();
        this.pills.removeClass('open');
      }
      return setTimeout((function(_this) {
        return function() {
          var content;
          content = pill.siblings('.pillar-item__content');
          pill.toggleClass('open');
          return $(content).slideToggle();
        };
      })(this), 1);
    };

    Commitments.prototype.initDom = function() {
      this.pills = $('.pillar-item__pill');
      return this.pill_items_content = $('.pillar-item__content');
    };

    return Commitments;

  })();

  this.Commitments = new Commitments;

}).call(this);
