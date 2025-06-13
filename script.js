// Enhanced and Cleaned JavaScript for Your Website

document.addEventListener("DOMContentLoaded", function () {
  // Toggle Search Form
  const searchBtn = document.getElementById("search-btn");
  const searchForm = document.querySelector(".search-form");
  const searchBox = document.getElementById("search-box");

  searchBtn.addEventListener("click", () => {
    searchForm.classList.toggle("active");
    searchBox.classList.toggle("d-none");
    searchBox.focus();
  });

  // Title Animation
  const logoTitle = document.getElementById("logoTitle");
  if (logoTitle) {
    logoTitle.addEventListener("click", () => {
      logoTitle.classList.add("click-zoom");
      setTimeout(() => {
        logoTitle.classList.remove("click-zoom");
      }, 300);
    });
  }

  // Search Highlight Logic
  let matches = [];
  let currentMatchIndex = 0;

  function removeHighlights() {
    const highlights = document.querySelectorAll(".highlight");
    highlights.forEach((el) => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
  }

  function highlightMatches(searchText) {
    removeHighlights();
    matches = [];
    currentMatchIndex = 0;
    if (!searchText) return;

    const regex = new RegExp(`(${searchText})`, "gi");
    const walk = (node) => {
      if (node.nodeType === 3 && node.parentNode.nodeName !== "SCRIPT") {
        const match = node.nodeValue.match(regex);
        if (match) {
          const span = document.createElement("span");
          const splitText = node.nodeValue.split(regex);
          splitText.forEach((part) => {
            if (part.toLowerCase() === searchText.toLowerCase()) {
              const highlightSpan = document.createElement("span");
              highlightSpan.className = "highlight";
              highlightSpan.textContent = part;
              matches.push(highlightSpan);
              span.appendChild(highlightSpan);
            } else {
              span.appendChild(document.createTextNode(part));
            }
          });
          node.parentNode.replaceChild(span, node);
        }
      } else if (
        node.nodeType === 1 &&
        node.childNodes &&
        !["SCRIPT", "STYLE"].includes(node.tagName)
      ) {
        node.childNodes.forEach(walk);
      }
    };

    walk(document.body);

    if (matches.length > 0) {
      scrollToMatch(0);
    }
  }

  function scrollToMatch(index) {
    if (matches[index]) {
      matches[index].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  searchBox.addEventListener("input", () => {
    const text = searchBox.value.trim();
    highlightMatches(text);
  });

  searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && matches.length > 0) {
      e.preventDefault();
      scrollToMatch(currentMatchIndex);
      currentMatchIndex = (currentMatchIndex + 1) % matches.length;
    }
  });

  // User Popup
  const loginBtn = document.getElementById("login-btn");
  const userPopup = document.getElementById("user-popup");

  if (loginBtn && userPopup) {
    loginBtn.addEventListener("click", () => {
      userPopup.classList.toggle("d-none");
    });

    document.addEventListener("click", (e) => {
      if (!userPopup.contains(e.target) && !loginBtn.contains(e.target)) {
        userPopup.classList.add("d-none");
      }
    });
  }
});
