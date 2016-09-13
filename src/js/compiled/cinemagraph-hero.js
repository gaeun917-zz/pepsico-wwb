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
      $(document).ready((function(_this) {
        return function() {
          if (_isMobile) {
            return false;
          }
          return _this.doSpeedTest(_this.initCinemagraph);
        };
      })(this));
    }

    CinemagraphHero.prototype.initCinemagraph = function(speed) {
      var videoElem, videoHtml, videoPlayCallback, video_filename;
      if (speed < 2) {
        return console.log("Connection is too slow (" + speed + "Mbps): hero fallback to static image.");
      }
      console.log("Connection is reasonable (" + speed + "Mbps): injecting hero video.");
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
      var InitiateSpeedDetection, MeasureConnectionSpeed, downloadSize, imageAddr;
      imageAddr = "https://s3-eu-west-1.amazonaws.com/howwillwe/production/images/fertilizer-close-up.jpg";
      downloadSize = 162580;
      MeasureConnectionSpeed = (function(_this) {
        return function() {
          var cacheBuster, download, endTime, speedMbps, startTime;
          endTime = 0;
          startTime = (new Date()).getTime();
          speedMbps = '';
          download = new Image();
          cacheBuster = "?nnn=" + startTime;
          download.src = imageAddr + cacheBuster;
          console.log("Starting connection speed test....");
          return download.onload = function() {
            var bitsLoaded, duration, speedBps, speedKbps;
            endTime = (new Date()).getTime();
            duration = (endTime - startTime) / 1000;
            bitsLoaded = downloadSize * 8;
            speedBps = (bitsLoaded / duration).toFixed(2);
            speedKbps = (speedBps / 1024).toFixed(2);
            speedMbps = (speedKbps / 1024).toFixed(2);
            console.log("Test complete.");
            return callback(parseFloat(speedMbps));
          };
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
