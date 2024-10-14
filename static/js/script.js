document.addEventListener('DOMContentLoaded', function() {
    const themeSelect = document.getElementById('theme-select');
    const themeLink = document.getElementById('theme-link');
    const moreButton = document.getElementById('moreButton');
    const fullResults = document.getElementById('fullResults');

    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            const selectedTheme = this.value;
            themeLink.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/${selectedTheme}/bootstrap.min.css`;
            
            // Update the URL without reloading the page
            const url = new URL(window.location);
            url.searchParams.set('theme', selectedTheme);
            window.history.pushState({}, '', url);
        });
    }

    if (moreButton && fullResults) {
        moreButton.addEventListener('click', function() {
            if (fullResults.style.display === 'none') {
                fullResults.style.display = 'block';
                moreButton.textContent = 'Less Details';
            } else {
                fullResults.style.display = 'none';
                moreButton.textContent = 'More Details';
            }
        });
    }
});
