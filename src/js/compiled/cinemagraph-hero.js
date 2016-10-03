(function() {
  var CinemagraphHero,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CinemagraphHero = (function() {
    function CinemagraphHero() {
      this.initDom = bind(this.initDom, this);
      this.doSpeedTest = bind(this.doSpeedTest, this);
      this.initCinemagraph = bind(this.initCinemagraph, this);
      var pillars;
      this.initDom();
      pillars = ['products', 'people', 'planet'];
      if ($.inArray(_pageID, pillars) < 0) {
        return false;
      }
    }

    CinemagraphHero.prototype.initCinemagraph = function(speed) {
      var videoElem, videoHtml, videoPlayCallback, video_filename;
      if (speed > 2) {
        return console.log("Connection is too slow (" + speed + " seconds to load page): hero fallback to static image.");
      }
      console.log("Connection is reasonable (" + speed + " seconds to load page): injecting hero video.");
      video_filename = (function() {
        switch (_pageID) {
          case 'products':
            return 'soda';
          case 'people':
            return 'orange';
          case 'planet':
            return 'nature';
        }
      })();
      videoHtml = "<video loop class=\"hero-video\" style='width:100%;height:auto'>\n    <source src=\"../vid/" + video_filename + ".mp4\" type=\"video/mp4\">\n    <source src=\"../vid/" + video_filename + ".webm\" type=\"video/webm\">\n    <source src=\"../vid/" + video_filename + ".ogg\" type=\"video/ogg\">\n</video>";
      this.video_container.html(videoHtml);
      videoElem = this.video_container.find('video');
      videoPlayCallback = (function(_this) {
        return function() {
          videoElem[0].play();
          return TweenLite.to(_this.video_initial_frame, 0.3, {
            opacity: 0
          });
        };
      })(this);
      videoElem.on('canplaythrough', videoPlayCallback);
      if (videoElem.readyState > 3) {
        return videoPlayCallback();
      }
    };

    CinemagraphHero.prototype.doSpeedTest = function(callback) {
      var InitiateSpeedDetection, MeasureConnectionSpeed, _loadEnd;
      _loadEnd = new Date().getTime();
      MeasureConnectionSpeed = (function(_this) {
        return function() {
          var duration, speedMbps;
          speedMbps = '';
          duration = (_loadEnd - _loadStart) / 1000;
          console.log("Page load duration: " + duration);
          return callback(parseFloat(duration));
        };
      })(this);
      InitiateSpeedDetection = (function(_this) {
        return function() {
          return window.setTimeout(MeasureConnectionSpeed, 1);
        };
      })(this);
      return InitiateSpeedDetection();
    };

    CinemagraphHero.prototype.initDom = function() {
      this.body = $('body');
      this.video_container = $('#hero--cinemagraph__video-container');
      return this.video_initial_frame = $('#hero__initial-frame');
    };

    return CinemagraphHero;

  })();

  this.CinemagraphHero = new CinemagraphHero;

}).call(this);
