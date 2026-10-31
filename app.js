document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('search-btn');

  searchBtn.addEventListener('click', () => {
    fetch('superheroes.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Request failed: ' + response.status);
        }
        return response.text();
      })
      .then((data) => {
        // superheroes.php returns an HTML list; show each alias on its own line
        const temp = document.createElement('div');
        temp.innerHTML = data;
        const names = Array.from(temp.querySelectorAll('li')).map((li) => li.textContent.trim());
        alert(names.join('\n'));
      })
      .catch((error) => alert('There was a problem: ' + error.message));
  });
});