(function () {
  "use strict";

  function setYear() {
    var yearNode = document.getElementById("year");
    if (yearNode) {
      yearNode.textContent = String(new Date().getFullYear());
    }
  }

  function loadMapFrame() {
    var frame = document.getElementById("clinic-map");
    var mapWrap = document.getElementById("map-wrap");
    var mapButton = document.getElementById("map-load");

    if (!frame || !mapWrap || !mapButton) {
      return;
    }

    if (!frame.getAttribute("src")) {
      frame.setAttribute("src", frame.getAttribute("data-src") || "");
    }

    frame.hidden = false;
    mapButton.hidden = true;
    mapWrap.classList.add("map-loaded");
  }

  function setupMapLoader() {
    var mapButton = document.getElementById("map-load");
    var mapWrap = document.getElementById("map-wrap");

    if (!mapButton || !mapWrap) {
      return;
    }

    mapButton.addEventListener("click", loadMapFrame);

    if (!("IntersectionObserver" in window)) {
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          loadMapFrame();
          obs.disconnect();
        });
      },
      { rootMargin: "220px 0px" }
    );

    observer.observe(mapWrap);
  }

  function buildVideoIframe(videoId, title) {
    var frame = document.createElement("iframe");
    frame.className = "video-frame";
    frame.loading = "lazy";
    frame.src = "https://www.youtube-nocookie.com/embed/" + videoId + "?autoplay=1&rel=0";
    frame.title = title;
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    return frame;
  }

  function buildVideoLaunch(videoId, title) {
    var launch = document.createElement("button");
    launch.type = "button";
    launch.className = "video-launch";
    launch.setAttribute("aria-label", "Play video: " + title);

    var thumb = document.createElement("img");
    thumb.className = "video-thumb";
    thumb.loading = "lazy";
    thumb.decoding = "async";
    thumb.src = "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg";
    thumb.alt = title + " thumbnail";

    var playLabel = document.createElement("span");
    playLabel.className = "video-play";
    playLabel.textContent = "Play video";

    launch.appendChild(thumb);
    launch.appendChild(playLabel);
    return launch;
  }

  function setupVideoCards() {
    document.querySelectorAll(".video-card[data-youtube-id]").forEach(function (card) {
      var videoId = (card.getAttribute("data-youtube-id") || "").trim();
      if (!videoId) {
        return;
      }

      var heading = card.querySelector("h3");
      var title = ((heading && heading.textContent) || "Clinic video").trim();
      var launch = buildVideoLaunch(videoId, title);
      var placeholder = card.querySelector(".video-placeholder");

      launch.addEventListener("click", function () {
        launch.replaceWith(buildVideoIframe(videoId, title));
      });

      if (placeholder) {
        placeholder.replaceWith(launch);
      } else {
        card.insertBefore(launch, card.firstChild);
      }

      var caption = card.querySelector("[data-video-caption]");
      if (caption) {
        caption.textContent = "Click to load the player.";
      }
    });
  }

  function setupNav() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  setYear();
  setupMapLoader();
  setupVideoCards();
  setupNav();
})();
