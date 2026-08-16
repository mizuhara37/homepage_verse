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

    // 移动端折叠菜单
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            const open = document.body.classList.toggle('menu-open');
            menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        const navbarContainer = document.getElementById('navbarContainer');
        if (navbarContainer) {
            navbarContainer.addEventListener('click', function(event) {
                if (event.target.closest('a')) {
                    document.body.classList.remove('menu-open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    // 菜单随音乐轻微律动
    const bgm = document.getElementById('bgm');
    if (bgm) {
        bgm.addEventListener('play', function() {
            document.body.classList.add('music-playing');
        });
        bgm.addEventListener('pause', function() {
            document.body.classList.remove('music-playing');
        });
        bgm.addEventListener('ended', function() {
            document.body.classList.remove('music-playing');
        });
    }
});
