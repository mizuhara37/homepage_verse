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

    // 视频播放结束自动关闭（随后开始音乐）
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.addEventListener('ended', function() {
            window.closeVideo();
        });
    }
});

// 随机选择视频：1.mp4 权重高于 2/3/4.mp4
function pickVideo() {
    const weights = [2, 1, 1, 1];
    const total = weights.reduce(function(a, b) { return a + b; }, 0);
    let r = Math.random() * total;
    for (let i = 0; i < weights.length; i++) {
        r -= weights[i];
        if (r < 0) return i + 1;
    }
    return 1;
}

let videoClosing = false;

function playBgm() {
    const bgm = document.getElementById('bgm');
    if (!bgm) return;
    bgm.volume = 0;
    bgm.play().catch(function() {});
    // 1s 淡入
    const start = performance.now();
    function step(now) {
        const t = Math.min((now - start) / 1000, 1);
        bgm.volume = t;
        if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function hideVideoOverlay() {
    const overlay = document.getElementById('video-overlay');
    if (overlay) overlay.style.display = 'none';
}

// 点击“进入”后：显示并淡入全屏视频（带声音，懒加载）
window.startVideo = function() {
    const whiteScreen = document.getElementById('white-screen');
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('bg-video');
    if (overlay) {
        overlay.style.display = 'block';
        // 懒加载：只加载随机到的视频
        if (video && !video.src) {
            video.src = 'src/video/' + pickVideo() + '.mp4';
        }
        requestAnimationFrame(function() {
            overlay.classList.add('show');
        });
    }
    if (video) video.play().catch(function() {});
    // 淡入完成后再隐藏白屏，避免闪过页面
    setTimeout(function() {
        if (whiteScreen) whiteScreen.style.display = 'none';
    }, 1000);
};

// 关闭视频（手动或自动）：1s 淡出结束后立即播放音乐（无间隔）
window.closeVideo = function() {
    if (videoClosing) return;
    videoClosing = true;
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('bg-video');
    if (video) video.pause();
    if (overlay) overlay.classList.remove('show');
    setTimeout(hideVideoOverlay, 1000); // 淡出结束
    setTimeout(playBgm, 1000);          // 淡出结束后立即播放音乐
};
