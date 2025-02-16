    // Function to generate a random short code (default length: 6)
    function generateShortCode(length = 6) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    // Check if the URL contains a hash (e.g., .../#abc123)
    // If it does, look up the original URL in localStorage and redirect
    window.addEventListener('DOMContentLoaded', () => {
      if (window.location.hash) {
        const code = window.location.hash.substring(1);
        const originalURL = localStorage.getItem('shorturl_' + code);
        if (originalURL) {
          // Redirect to the original URL
          window.location.href = originalURL;
        }
      }
      
      document.getElementById('shortenBtn').addEventListener('click', () => {
        let url = document.getElementById('urlInput').value.trim();
        if (!url) {
          alert("Please enter a URL.");
          return;
        }
        // Basic validation: add http:// if missing
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'http://' + url;
        }
        const code = generateShortCode();
        // Save the mapping in localStorage
        localStorage.setItem('shorturl_' + code, url);
        // Construct the short URL using the current origin and path
        const shortURL = window.location.origin + window.location.pathname + '#' + code;
        document.getElementById('result').innerHTML = 'Short URL: <a href="' + shortURL + '">' + shortURL + '</a>';
      });
    });