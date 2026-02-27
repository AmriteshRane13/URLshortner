document.addEventListener("DOMContentLoaded", () => {
  const urlForm = document.getElementById("urlForm");
  const resultContainer = document.getElementById("result");
  const errorContainer = document.getElementById("error");
  const shortURLInput = document.getElementById("shortURL");
  const copyBtn = document.getElementById("copyBtn");
  const errorMessage = document.getElementById("errorMessage");

  // Handle form submission
  urlForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const originalURL = document.getElementById("originalURL").value.trim();

    if (!originalURL) {
      showError("Please enter a valid URL");
      return;
    }

    // Add loading state
    urlForm.classList.add("loading");
    hideMessages();

    try {
      const response = await fetch("/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `originalURL=${encodeURIComponent(originalURL)}`,
      });

      const data = await response.json();

      if (response.ok && data.shortURL) {
        showResult(data.shortURL);
      } else {
        showError(data.error || "Failed to shorten URL");
      }
    } catch (error) {
      console.error("Error:", error);
      showError("Network error. Please try again.");
    } finally {
      urlForm.classList.remove("loading");
    }
  });

  // Handle copy button
  copyBtn.addEventListener("click", () => {
    shortURLInput.select();
    shortURLInput.setSelectionRange(0, 99999); // For mobile devices

    try {
      document.execCommand("copy");
      copyBtn.textContent = "Copied!";
      copyBtn.style.background = "#28a745";

      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.style.background = "#28a745";
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Fallback for modern browsers
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shortURLInput.value).then(() => {
          copyBtn.textContent = "Copied!";
          setTimeout(() => {
            copyBtn.textContent = "Copy";
          }, 2000);
        });
      }
    }
  });

  function showResult(shortURL) {
    shortURLInput.value = shortURL;
    resultContainer.style.display = "block";
    errorContainer.style.display = "none";

    // Clear the input form
    document.getElementById("originalURL").value = "";
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorContainer.style.display = "block";
    resultContainer.style.display = "none";
  }

  function hideMessages() {
    resultContainer.style.display = "none";
    errorContainer.style.display = "none";
  }

  // Add URL validation
  const urlInput = document.getElementById("originalURL");
  urlInput.addEventListener("input", function () {
    const url = this.value.trim();
    if (url && !isValidURL(url)) {
      this.setCustomValidity(
        "Please enter a valid URL (e.g., https://example.com)"
      );
    } else {
      this.setCustomValidity("");
    }
  });

  function isValidURL(string) {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      // Try adding https:// if no protocol is specified
      try {
        const url = new URL("https://" + string);
        return true;
      } catch (_) {
        return false;
      }
    }
  }
});
