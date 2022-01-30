(function($) {
  $.fn.extend({
    imgZoomAndRotate: function(data) {
      var $all = this;
      var $this;
      var picNum = $all.length;
      var degs = 0;

      var defaults = {
        loop: false
      };

      var options = $.extend({}, defaults, data);

      function showPrevPic(self) {
        // debugger
        var bigImg = $(self)
          .parent()
          .find(".zoomImg");
        var index = bigImg.attr("index");
        if (index >= 1) {
          var prevIndex = $this.attr("imgIndex") - 1;
          var prevSrc = $all.eq(prevIndex).attr("src");
          bigImg.attr("index", index - 1);
          bigImg.attr("src", prevSrc);
          bigImg.css({ width: "auto", height: "auto" });
          $this = $all.eq(prevIndex);
          degs = 0;
          $(window.top.document).find(".zoomImg");
        } else if (index == 0 && options.loop) {
          bigImg.attr("index", picNum - 1);
          bigImg.attr("src", $all.last().attr("src"));
          bigImg.css({ width: "auto", height: "auto" });
          $this = $all.eq(picNum - 1);
          degs = 0;
          $(window.top.document).find(".zoomImg");
        }
      }

      function showNextPic(self) {
        var bigImg = $(self)
          .parent()
          .find(".zoomImg");
        var index = bigImg.attr("index");
        if (index < picNum - 1) {
          var nextIndex = Number($this.attr("imgIndex")) + 1;
          var nextSrc = $all.eq(nextIndex).attr("src");
          bigImg.attr("index", nextIndex);
          bigImg.attr("src", nextSrc);
          bigImg.css({ width: "auto", height: "auto" });
          $this = $all.eq(nextIndex);
          degs = 0;
          $(window.top.document).find(".zoomImg");
        } else if (index == picNum - 1 && options.loop) {
          bigImg.attr("index", 0);
          bigImg.attr("src", $all.eq(0).attr("src"));
          bigImg.css({ width: "auto", height: "auto" });
          $this = $all.eq(0);
          degs = 0;
          $(window.top.document).find(".zoomImg");
        }
      }

      function mousewheelHandler(e, d) {
        try {
          if (d === 1) {
            var width = $(window.top.document)
              .find(".zoomImg")
              .width();
            var height = $(window.top.document)
              .find(".zoomImg")
              .height();
            $(window.top.document)
              .find(".zoomImg")
              .css({
                width: width * 1.1,
                height: "auto",
                "transform-origin": "center center 0px"
              });
          }
          if (d === -1) {
            var width = $(window.top.document)
              .find(".zoomImg")
              .width();
            var height = $(window.top.document)
              .find(".zoomImg")
              .height();
            if (height * 0.9 >= 200 && width * 0.9 >= 200) {
              $(window.top.document)
                .find(".zoomImg")
                .css({
                  width: width * 0.9,
                  height: "auto",
                  "transform-origin": "center center 0px"
                });
            }
          }
        } catch (err) {
          console.log(err);
        }
      }

      $(window.top.document).on("mousewheel", mousewheelHandler);

      function closeModal() {
        degs = 0;
        $(window.top.document)
          .find(".backdrop")
          .remove();
        $(window.top.document)
          .find(".foreground")
          .remove();
      }

      $(window.top.document).on("click", ".angle_.angle-left", function() {
        showPrevPic(this);
      });

      $(window.top.document).on("click", ".angle_.angle-right", function() {
        showNextPic(this);
      });

      $(window.top.document).on("click", ".foreground #picClose", function() {
        closeModal();
        $(window.document).off("keydown");
        $(window.top.document).off("keydown");
      });

      this.each(function(i, t) {
        $(t).attr("imgIndex", i);
      });

      return this.each(function(i, t) {
        $(this).click(function() {
          $this = $(this);

          var index = $this.attr("imgIndex");
          var src = $this.attr("src");

          var background = '<div class="backdrop"></div>';
          var foreground = '<div class="foreground"></div>';
          var leftIcon =
            '<div class="triangle triangle-left"></div>' +
            "</div>" +
            '<i class="angle_ angle-left" ></i>';

          var img =
            "<img src=" + src + " index=" + index + ' class="zoomImg"></img>';

          var rightIcon =
            '<div class="triangle triangle-right"></div>' +
            "</div>" +
            '<i class="angle_ angle-right"></i>' +
            '<i class="picClose" id="picClose">&times;</i>';

          $(window.top.document)
            .find("body")
            .append(background);
          $(window.top.document)
            .find("body")
            .append(foreground);
          $(window.top.document)
            .find(".foreground")
            .append(leftIcon + img + rightIcon);
          $(window.top.document)
            .find(".backdrop")
            .css(
              "cssText",
              "position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 1040;background:rgb(255,255,255,0.9);"
            );
          $(window.top.document)
            .find(".foreground")
            .css(
              "cssText",
              "width:80%;text-align:center;top:220%;left:10%;border-radius: 1%;z-index:3000;overflow: hidden;position:absolute;!important;"
            );
          $(window.top.document)
            .find(".foreground .angle-left")
            .css(
              "cssText",
              "width:55px;height: 55px;border-top: 5px solid #c5c5c5;display: inline-block;border-left: 5px solid #c5c5c5;transform:rotate(-45deg);position:fixed;top:50%;left:6%;cursor:pointer;z-index:9999;transition: all 0.3s;opacity:0.4"
            );
          $(window.top.document)
            .find(".foreground .angle-right")
            .css(
              "cssText",
              "width:55px;height: 55px;border-right: 5px solid #c5c5c5;display: inline-block;border-bottom: 5px solid #c5c5c5;transform: rotate(-45deg);cursor: pointer;position: fixed;top: 50%;right: 6%;z-index:9999;transition: all 0.3s;opacity:0.4"
            );

          $(window.top.document)
            .find(".foreground #picClose")
            .css(
              "cssText",
              "display:inline-block;cursor:pointer;position: fixed;top: 5%;right: 5%;z-index: 10;transition: all 0.3s;opacity: 0.6;background: transparent;font-size: 60px;color: #c5c5c5;font-style: normal;font-weight: 900px;;transform-origin: 45% 55%;z-index:9999"
            );
          $(window.top.document)
            .find(".foreground .angle_")
            .hover(
              function() {
                $(this).css({
                  "border-color": "#fff",
                  opacity: 1,
                  transform: "scale(1.5) rotate(-45deg)"
                });
              },
              function() {
                $(this).css({
                  "border-color": "#c5c5c5",
                  opacity: 0.6,
                  transform: "scale(1.0) rotate(-45deg)"
                });
              }
            );

          $(window.top.document)
            .find(".foreground #picClose")
            .hover(
              function() {
                $(this).css({
                  color: "#fd0000",
                  transform: "scale(1.8) rotate(90deg)",
                  opacity: "1"
                });
              },
              function() {
                $(this).css({
                  color: "#c5c5c5",
                  transform: "scale(1.0) rotate(0deg)",
                  opacity: "0.6"
                });
              }
            );

          if (window == window.top) {
            $(window.top.document).on("keydown", function(e) {
              keyControl(e);
            });
          } else {
            $(window.document).on("keydown", function(e) {
              keyControl(e);
            });

            $(window.top.document).on("click", function() {
              $(window.document).off("keydown");

              if ($(window.top.document).attr("keydown") == undefined) {
                $(window.top.document).attr("keydown", "keyControl");
                $(window.top.document).on("keydown", function(e) {
                  keyControl(e);
                });
              }
            });
          }

          function keyControl(e) {
            if (e.keyCode == "37") {
              showPrevPic(
                $(window.top.document)
                  .find(".angle_.angle-left")
                  .get(0)
              );
            } else if (e.keyCode == "39") {
              showNextPic(
                $(window.top.document)
                  .find(".angle_.angle-right")
                  .get(0)
              );
            } else if (e.keyCode == "38") {
              mousewheelHandler(this, 1);
            } else if (e.keyCode == "40") {
              mousewheelHandler(this, -1);
            }
          }

          // $(window.top.document)
          //   .find(".foreground .zoomImg")
          //   .on("load", function() {
          //     $(window.top.document)
          //       .find(".foreground .zoomImg")
          //       .dragging({ randomPosition: false });
          //     ("background-size: 100% 100%");
          //   });
        });
      });
    }
  });
})(jQuery);
