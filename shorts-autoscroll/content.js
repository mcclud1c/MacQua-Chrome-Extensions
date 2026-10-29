(function () {
    let isAutoScrollEnabled = true;
    let lastAdvanceTime = 0;
    const COOLDOWN_MS = 1500; // Prevents double-scrolling if detection fires twice

    // Inject a small on-screen toggle button
    function createUI() {
        if (document.getElementById("shorts-autoscroll-toggle")) return;

        const btn = document.createElement("button");
        btn.id = "shorts-autoscroll-toggle";
        btn.innerText = "Auto-Scroll: ON";
        btn.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 24px;
        z-index: 999999;
        background: #0f0f0f;
        color: #fff;
        border: 1px solid #3f3f3f;
        padding: 8px 14px;
        border-radius: 18px;
        font-size: 13px;
        font-family: sans-serif;
        cursor: pointer;
        opacity: 0.85;
        box-shadow: 0 4px 10px rgba(0,0,0,0.4);
        `;

        btn.addEventListener("click", () => {
            isAutoScrollEnabled = !isAutoScrollEnabled;
            btn.innerText = `Auto-Scroll: ${isAutoScrollEnabled ? "ON" : "OFF"}`;
            btn.style.borderColor = isAutoScrollEnabled ? "#2ba640" : "#cc0000";
        });

        document.body.appendChild(btn);
    }

    // Find the active, playing Short video element
    function getActiveVideo() {
        const videos = Array.from(document.querySelectorAll("video"));
        return videos.find((v) => {
            const rect = v.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight + 100;
            return isVisible && !v.paused && v.duration > 0;
        });
    }

    // Scroll to the next Short
    function advanceShort() {
        const now = Date.now();
        if (now - lastAdvanceTime < COOLDOWN_MS) return;
        lastAdvanceTime = now;

        // Dispatch a hardware-like keydown event directly to the active element/body
        const eventParams = {
            key: "ArrowDown",
            code: "ArrowDown",
            keyCode: 40,
            which: 40,
            bubbles: true,
            cancelable: true,
            composed: true
        };

        const target = document.activeElement || document.body;
        target.dispatchEvent(new KeyboardEvent("keydown", eventParams));
        target.dispatchEvent(new KeyboardEvent("keyup", eventParams));
    }

    // Main polling loop
    setInterval(() => {
        if (!location.pathname.startsWith("/shorts/")) {
            const btn = document.getElementById("shorts-autoscroll-toggle");
            if (btn) btn.style.display = "none";
            return;
        }

        createUI();
        const btn = document.getElementById("shorts-autoscroll-toggle");
        if (btn) btn.style.display = "block";

        if (!isAutoScrollEnabled) return;

        const video = getActiveVideo();
        if (!video) return;

        // Trigger advance within the last 250 milliseconds before loop resets
        if (video.duration - video.currentTime <= 0.25) {
            advanceShort();
        }
    }, 200);
})();
