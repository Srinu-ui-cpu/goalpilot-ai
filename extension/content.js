// content.js - Telemetry tracker for YouTube, LeetCode, Coursera, Udemy, GitHub
(function () {
  const host = window.location.hostname;
  let platform = 'unknown';

  if (host.includes('youtube.com')) platform = 'youtube';
  else if (host.includes('leetcode.com')) platform = 'leetcode';
  else if (host.includes('udemy.com')) platform = 'udemy';
  else if (host.includes('coursera.org')) platform = 'coursera';
  else if (host.includes('github.com')) platform = 'github';

  console.log(`[GoalPilot AI Content Script] Monitoring active learning on ${platform}`);

  // Track video progress if HTML5 video exists
  const video = document.querySelector('video');
  if (video) {
    let lastTracked = 0;
    video.addEventListener('timeupdate', () => {
      const current = Math.floor(video.currentTime);
      if (current - lastTracked >= 60) {
        lastTracked = current;
        chrome.storage.local.get(['watch_minutes'], (res) => {
          const total = (res.watch_minutes || 0) + 1;
          chrome.storage.local.set({ watch_minutes: total });
        });
      }
    });
  }

  // Detect LeetCode problem submission
  if (platform === 'leetcode') {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (document.body.innerText.includes('Accepted') && document.body.innerText.includes('Runtime:')) {
          console.log('[GoalPilot AI] LeetCode Accepted Submission Detected!');
          chrome.storage.local.get(['problems_solved'], (res) => {
            const count = (res.problems_solved || 0) + 1;
            chrome.storage.local.set({ problems_solved: count });
          });
          observer.disconnect();
          break;
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
