(function () {
  "use strict";

  var defaults = {
    phoneDisplay: "Pending",
    phoneE164: "pending",
    address: "7200 Wyoming Springs Dr, Suite 100, Austin, TX 78681",
    mapQuery: "7200 Wyoming Springs Dr, Suite 100, Austin, TX 78681",
    hours: ["Mon-Thu: 8:00 AM - 5:00 PM", "Fri: 8:00 AM - 1:00 PM", "Sat-Sun: Closed"],
    youtubeVideos: [],
    upcomingVideoTopics: [
      "What to expect at your first eye exam",
      "How cataract evaluations work",
      "Tour of the office and exam equipment"
    ]
  };

  var config = Object.assign({}, defaults, window.clinicSiteConfig || {});

  function setYear() {
    var yearNode = document.getElementById("year");
    if (yearNode) {
      yearNode.textContent = String(new Date().getFullYear());
    }
  }

  function setContactDetails() {
    document.querySelectorAll("[data-phone-display]").forEach(function (node) {
      node.textContent = config.phoneDisplay;
    });

    document.querySelectorAll("[data-phone-link]").forEach(function (node) {
      node.setAttribute("href", "tel:" + config.phoneE164);
      if (!node.getAttribute("aria-label")) {
        node.setAttribute("aria-label", "Call " + config.phoneDisplay);
      }
    });

    document.querySelectorAll("[data-address-display]").forEach(function (node) {
      node.textContent = config.address;
    });
  }

  function setHours() {
    var list = document.getElementById("hours-list");
    if (!list || !Array.isArray(config.hours)) {
      return;
    }

    list.innerHTML = "";
    config.hours.forEach(function (hourLine) {
      var li = document.createElement("li");
      li.textContent = hourLine;
      list.appendChild(li);
    });
  }

  function setMapTargets() {
    var query = encodeURIComponent(config.mapQuery || config.address);
    var embedSrc = "https://www.google.com/maps?q=" + query + "&output=embed";
    var mapSrc = "https://maps.google.com/?q=" + query;

    var mapFrame = document.getElementById("clinic-map");
    if (mapFrame) {
      mapFrame.setAttribute("data-src", embedSrc);
    }

    var mapLink = document.getElementById("map-link");
    if (mapLink) {
      mapLink.setAttribute("href", mapSrc);
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

  function renderVideoCard(video) {
    var card = document.createElement("article");
    card.className = "video-card";

    var safeTitle = (video.title || "Clinic Video").trim();
    var cleanId = (video.youtubeId || "").trim();

    if (cleanId) {
      var launch = document.createElement("button");
      launch.type = "button";
      launch.className = "video-launch";
      launch.setAttribute("aria-label", "Play video: " + safeTitle);

      var thumb = document.createElement("img");
      thumb.className = "video-thumb";
      thumb.loading = "lazy";
      thumb.decoding = "async";
      thumb.src = "https://i.ytimg.com/vi/" + cleanId + "/hqdefault.jpg";
      thumb.alt = safeTitle + " thumbnail";

      var playLabel = document.createElement("span");
      playLabel.className = "video-play";
      playLabel.textContent = "Play video";

      launch.appendChild(thumb);
      launch.appendChild(playLabel);

      launch.addEventListener("click", function () {
        launch.replaceWith(buildVideoIframe(cleanId, safeTitle));
      });

      card.appendChild(launch);
    } else {
      var placeholder = document.createElement("div");
      placeholder.className = "video-placeholder";
      placeholder.innerHTML = "<p><strong>Placeholder:</strong> add a YouTube ID in <code>site-config.js</code>.</p>";
      card.appendChild(placeholder);
    }

    var heading = document.createElement("h3");
    heading.textContent = safeTitle;
    card.appendChild(heading);

    var caption = document.createElement("p");
    caption.textContent = cleanId ? "Click to load the player." : "Player appears after adding a video ID.";
    card.appendChild(caption);

    return card;
  }

  function renderVideoPlaceholders(container) {
    var topics = Array.isArray(config.upcomingVideoTopics) ? config.upcomingVideoTopics : [];
    if (!topics.length) {
      return;
    }

    topics.forEach(function (topic) {
      var article = document.createElement("article");
      article.className = "video-placeholder";
      article.innerHTML = "<p><strong>Coming soon:</strong> " + topic + "</p>";
      container.appendChild(article);
    });
  }

  function setVideos() {
    var videoGrid = document.getElementById("video-grid");
    if (!videoGrid) {
      return;
    }

    videoGrid.innerHTML = "";

    if (!Array.isArray(config.youtubeVideos) || config.youtubeVideos.length === 0) {
      renderVideoPlaceholders(videoGrid);
      return;
    }

    config.youtubeVideos.forEach(function (video) {
      videoGrid.appendChild(renderVideoCard(video));
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
  setContactDetails();
  setHours();
  setMapTargets();
  setupMapLoader();
  setVideos();
  setupNav();
})();

