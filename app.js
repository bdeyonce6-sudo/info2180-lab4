document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search');
  const result = document.getElementById('result');

  // Strip HTML tags and stray special characters from what the user typed
  function sanitize(input) {
    return input
      .replace(/<[^>]*>/g, '')
      .replace(/[^\w\s.'-]/g, '')
      .trim();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const query = sanitize(searchField.value);
    const url = 'superheroes.php?query=' + encodeURIComponent(query);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Request failed: ' + response.status);
        }
        return response.text();
      })
      .then((data) => {
        // superheroes.php escapes everything it outputs, so this is safe to insert
        result.innerHTML = data;
      })
      .catch((error) => {
        result.textContent = 'There was a problem: ' + error.message;
      });
  });
});