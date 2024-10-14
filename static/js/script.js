document.addEventListener('DOMContentLoaded', function() {
    var themeSelect = document.getElementById('theme-select');
    var themeLink = document.getElementById('theme-link');
    var regInput = document.getElementById('reg_number');

    function applyTheme(theme) {
        if (theme === 'default') {
            theme = 'solar';
        }
        themeLink.href = `https://cdn.jsdelivr.net/npm/bootswatch@5.3.0/dist/${theme}/bootstrap.min.css`;
    }

    themeSelect.addEventListener('change', function() {
        var selectedTheme = this.value;
        applyTheme(selectedTheme);
        
        // Update the URL without reloading the page
        history.pushState(null, '', `/${selectedTheme}`);
    });

    // Apply the initial theme
    applyTheme(themeSelect.value);

    regInput.addEventListener('input', function() {
        this.value = this.value.toUpperCase();
    });
});