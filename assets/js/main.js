"use strict";
// Global variable
let touchCount = 0;

setEventListeners();

function setEventListeners() {
  /* Set the initial variables call the eventListeners */
  try {
    const navBar = document.getElementById("nav-bar");
    const navLinks = navBar.querySelector(".nav-links");
    const navLinksList = navBar.querySelectorAll(".nav-links li");
    const navPadding = navBar.style.paddingBottom;
    const hamburger = navBar.querySelector(".hamburger");
    const target = document.getElementById("about");
    const coverDiv = document.getElementById("cover").querySelector("div");
    const getInTouch = document.getElementById("getInTouch");
    const listItems = document.getElementById("contact").querySelectorAll("li");
    const headers = ["email|send me an email!", "phone|give me a call!"];
    const projContainer = document.querySelector(".proj-container");
    const firstProject = projContainer.querySelector("#firstProject");
    const secondProject = projContainer.querySelector("#secondProject");

    // Create nested objects with values needed to alter html
    const styleItems = {
      name: {
        resize: {
          name: "resetNav",
          element: navBar,
          element2: coverDiv,
          color: "transparent",
          padding: navPadding,
          border: "none",
          transition: "none",
        },
        click: {
          learnMore: {
            name: "learnMore",
            element: target,
            duration: 700,
          },
          hamburgerMenu: {
            name: "hamburgerMenu",
            element: hamburger,
            element2: navLinks,
            element3: navLinksList,
            transition: "all 0.6s",
          },
          touch: {
            name: "touch",
            list: listItems,
            headers: headers,
          },
        },
        scroll: {
          original: {
            element: navBar,
            childElement: hamburger,
            color: "transparent",
            padding: navPadding,
            border: "none",
            transition: "all 0.4s",
          },
          new: {
            element: navBar,
            color: "white",
            padding: "1rem",
            border: "0 0.1rem",
            transition: "all 0.4s",
          },
        },
      },
    };

    // Create nested array for projects section
    const projValues = [
      {
        title: "PYTHON PROJECT",
        class1: "proj-overlay",
        class2: "proj-overlay1",
      },
      {
        title: "REACT PROJECT",
        class1: "proj-overlay",
        class2: "proj-overlay2",
      },
    ];

    // Check width of browser for page load, toggle h1 animation or not
    typewriterToggle(styleItems.name.resize["element2"], getWidth());

    // Everything below must run at least once
    window.addEventListener("resize", () => {
      setEventActions("resize", styleItems.name.resize);
    });
    window.addEventListener("scroll", () => {
      setEventActions("scroll", styleItems.name.scroll);
    });
    document.getElementById("learn-more").addEventListener("click", () => {
      setEventActions("click", styleItems.name.click.learnMore);
    });
    hamburger.addEventListener("click", () => {
      setEventActions("click", styleItems.name.click.hamburgerMenu);
    });
    navLinks.addEventListener("click", () => {
      setEventActions("click", styleItems.name.click.hamburgerMenu);
    });
    getInTouch.addEventListener("click", () => {
      setEventActions("click", styleItems.name.click.touch);
    });
    // Project section
    firstProject.addEventListener("mouseover", () => {
      toggleProject("mouseover", firstProject, projValues[0]);
    });
    firstProject.addEventListener("mouseout", () => {
      toggleProject("mouseout", firstProject, projValues[0]);
    });
    secondProject.addEventListener("mouseover", () => {
      toggleProject("mouseover", secondProject, projValues[1]);
    });
    secondProject.addEventListener("mouseout", () => {
      toggleProject("mouseout", secondProject, projValues[1]);
    });
  } catch (error) {
    throw {
      message:
        'Method: setEventListeners(), Exception: "' + error.message + '"',
    };
  }
}

function setEventActions(eventType, eventItems) {
  /* Check which event listener is activated, create an action for it */
  try {
    let hamburgerDisplay;

    switch (eventType) {
      case "resize":
        typewriterToggle(eventItems["element2"], getWidth());
        navStyleSwitch(eventItems);
        break;

      case "click":
        if (eventItems["name"] === "learnMore") {
          //smoothScroll(eventItems["element"], eventItems["duration"]);
        } else if (eventItems["name"] === "touch") {
          touchCount++;
          modifyContactSection(eventItems["list"], eventItems["headers"]);
        } else if (eventItems["name"] === "hamburgerMenu") {
          hamburgerDisplay = getComputedStyle(eventItems["element"]).display;
          if (hamburgerDisplay !== "none") {
            navSlider(
              eventItems["element"],
              eventItems["element2"],
              eventItems["element3"],
              eventItems["transition"]
            );
          }
        }
        break;

      case "scroll":
        hamburgerDisplay = getComputedStyle(eventItems.original["childElement"])
          .display;
        if (hamburgerDisplay === "none") {
          if (window.scrollY !== 0 && window.scrollY !== null) {
            // New styles
            navStyleSwitch(eventItems.new);
          } else {
            // Original styles
            navStyleSwitch(eventItems.original);
          }
        }
        break;
    }
  } catch (error) {
    throw {
      message: 'Method: setEventActions(), Exception: "' + error.message + '"',
    };
  }
}

function navStyleSwitch(styleItems) {
  /* Set styles for html elements from a scroll or resize event */
  styleItems["element"].style.backgroundColor = styleItems["color"];
  styleItems["element"].style.paddingTop = styleItems["padding"];
  styleItems["element"].style.paddingBottom = styleItems["padding"];
  styleItems["element"].style.boxShadow = styleItems["border"];
  styleItems["element"].style.transition = styleItems["transition"];
}

function smoothScroll(target, duration) {
  /* Smooth scrolling from a click event */
  try {
    let targetPosition = target.getBoundingClientRect().top;
    let startPosition = pageYOffset; //window.pageYOffset || window.scrollY;
    let distance = Math.abs(targetPosition - startPosition);

    let startTime = null;

    function loop(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }

      let timeElapsed = currentTime - startTime;
      let run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(loop);
      }
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(loop);
  } catch (error) {
    throw {
      message: 'Method: smoothScroll(), Exception: "' + error.message + '"',
    };
  }
}

function navSlider(element, element2, element3, transition) {
  // Navigation menu slider animation
  try {
    element2.classList.toggle("nav-active");

    //class of nav-active means that the hamburger button is available
    if (element2.classList.contains("nav-active")) {
      for (const item of element.children) {
        item.style.backgroundColor = "white";
        item.style.transition = transition;
      }
    } else {
      for (const item of element.children) {
        item.style.backgroundColor = "black";
        item.style.transition = transition;
      }
    }

    //animate each link to fade-away or fade-in
    element3.forEach((link, index) => {
      if (!element2.classList.contains("nav-active")) {
        link.style.animation = "navLinkFade 0.3s ease-in";
      } else {
        link.style.animation = `navLinkAppear 0.3s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });

    element.classList.toggle("toggle");
  } catch (error) {
    throw {
      message: 'Method: navSlider(), Exception: "' + error.message + '"',
    };
  }
}

function modifyContactSection(listItems, headers) {
  /* If getInTouch button is clicked alter text & styles */
  /* Took of the phone number */

  const emailHeaders = headers[0].toUpperCase().split("|");
  //const phoneHeaders = headers[1].toUpperCase().split("|");

  if (touchCount % 2 !== 0) {
    // Turn on funky styles
    // Email
    listItems[1].querySelector("h3").innerHTML = emailHeaders[1];
    listItems[1].querySelector("p").style.color = "#98fbca";
    listItems[1].querySelector("p").style.fontSize = "1.3rem";
    // Phone
    /*listItems[2].querySelector("h3").innerHTML = phoneHeaders[1];
    listItems[2].querySelector("p").style.color = "#98fbca";
    listItems[2].querySelector("p").style.fontSize = "1.3rem";*/
  } else {
    // Turn on original styles
    // Email
    listItems[1].querySelector("h3").innerHTML = emailHeaders[0];
    listItems[1].querySelector("p").style.color = "#e97997";
    listItems[1].querySelector("p").style.fontSize = "1rem";
    // Phone
    /*listItems[2].querySelector("h3").innerHTML = phoneHeaders[0];
    listItems[2].querySelector("p").style.color = "#e97997";
    listItems[2].querySelector("p").style.fontSize = "1rem";*/
  }
}

function typewriterToggle(element, width) {
  /* Toggle the typewriter class */

  if (width <= 450) {
    if (element.classList.contains("typewriter")) {
      // Remove typewriter class
      element.classList.toggle("typewriter");
    }
  } else {
    if (!element.classList.contains("typewriter")) {
      // Add typewriter class
      element.classList.toggle("typewriter");
    }
  }
}

function getWidth() {
  /* Get width of browser */
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
}

window.onbeforeunload = function () {
  // On refresh scroll to the top
  window.scrollTo(0, 0);
};

function toggleProject(mouse, element, projValues) {
  /* Toggle classes for project section */

  const projOverlay = element.querySelector(".proj-overlay");
  const projDiv = element.querySelector("div");
  element.style.transition = "all 0.7s";

  if (mouse === "mouseover") {
    // Remove h3 element
    if (projOverlay) {
      element.removeChild(projOverlay);
      projDiv.classList.remove("proj-content");
      element.style.transform = "scale(1.07)";
    }
  } else {
    // Add h3 element
    let newH3 = document.createElement("h3");
    newH3.textContent = projValues.title;
    newH3.classList.add(projValues.class1, projValues.class2);

    element.appendChild(newH3);
    projDiv.classList.add("proj-content");
    element.style.transform = "scale(1)";
  }
}
