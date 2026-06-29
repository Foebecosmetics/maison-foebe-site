(function () {
        var root = document.documentElement;
        var revealEls = document.querySelectorAll(".reveal");

        if (!revealEls.length || !("IntersectionObserver" in window)) {
          return;
        }

        try {
          var observer = new IntersectionObserver(
            function (entries) {
              entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                  entry.target.classList.add("visible");
                  observer.unobserve(entry.target);
                }
              });
            },
            {
              threshold: 0.1,
              rootMargin: "0px 0px -6% 0px",
            },
          );

          root.classList.add("foebe-reveal-ready");
          revealEls.forEach(function (element) {
            observer.observe(element);
          });
        } catch (error) {
          root.classList.remove("foebe-reveal-ready");
          revealEls.forEach(function (element) {
            element.classList.add("visible");
          });
        }
      })();
