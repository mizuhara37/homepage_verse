document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;

    document.body.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'theme-toggle') {
            if (root.getAttribute('data-color-scheme') === 'dark') {
                root.setAttribute('data-color-scheme', 'light');
            } else {
                root.setAttribute('data-color-scheme', 'dark');
            }
        }
    });
});