document.addEventListener('DOMContentLoaded', function() {
    var themeSelect = document.getElementById('theme-select');
    var themeLink = document.getElementById('theme-link');
    var regInput = document.getElementById('reg_number');
    var lookupButton = document.getElementById('lookupButton');
    var newSearchButton = document.getElementById('newSearchButton');
    var resultsSection = document.getElementById('resultsSection');
    var carLookupForm = document.getElementById('carLookupForm');
    var regInputContainer = document.getElementById('regInputContainer');
    var regDisplay = document.getElementById('regDisplay');
    var moreButton = document.getElementById('moreButton');
    var fullResults = document.getElementById('fullResults');
    var regPlate = document.querySelector('.reg-plate');

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

    // Show results, change buttons, and update registration display
    if (resultsSection) {
        lookupButton.style.display = 'none';
        newSearchButton.style.display = 'inline-block';
        regInput.style.display = 'none';
        regDisplay.textContent = regInput.value;
        regDisplay.classList.add('large-reg');
    }

    // New Search button functionality
    newSearchButton.addEventListener('click', function() {
        regInput.value = '';
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
        lookupButton.style.display = 'inline-block';
        newSearchButton.style.display = 'none';
        regInput.style.display = 'block';
        regDisplay.textContent = 'Enter your registration';
        regDisplay.classList.remove('large-reg');
    });

    // Prevent form submission if New Search is clicked
    carLookupForm.addEventListener('submit', function(event) {
        if (newSearchButton.style.display === 'inline-block') {
            event.preventDefault();
        }
    });

    if (moreButton) {
        moreButton.addEventListener('click', function() {
            if (fullResults.style.display === 'none') {
                fullResults.style.display = 'block';
                moreButton.textContent = 'Less';
            } else {
                fullResults.style.display = 'none';
                moreButton.textContent = 'More';
            }
        });
    }
});
