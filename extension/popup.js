// popup.js
document.addEventListener('DOMContentLoaded', async () => {
  const resourceTitleEl = document.getElementById('resource-title');
  const platformLabelEl = document.getElementById('platform-label');
  const importBtn = document.getElementById('import-btn');
  const openDashboardBtn = document.getElementById('open-dashboard-btn');
  const statusMsgEl = document.getElementById('status-msg');

  let currentTabInfo = { title: '', url: '', platform: 'General' };

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      currentTabInfo.title = tab.title || 'Untitled Resource';
      currentTabInfo.url = tab.url || '';

      if (tab.url.includes('youtube.com')) {
        currentTabInfo.platform = 'YouTube';
      } else if (tab.url.includes('leetcode.com')) {
        currentTabInfo.platform = 'LeetCode';
      } else if (tab.url.includes('udemy.com')) {
        currentTabInfo.platform = 'Udemy';
      } else if (tab.url.includes('coursera.org')) {
        currentTabInfo.platform = 'Coursera';
      } else if (tab.url.includes('github.com')) {
        currentTabInfo.platform = 'GitHub';
      } else if (tab.url.includes('hackerrank.com')) {
        currentTabInfo.platform = 'HackerRank';
      }

      platformLabelEl.textContent = `${currentTabInfo.platform} Detected`;
      resourceTitleEl.textContent = currentTabInfo.title;
    }
  } catch (err) {
    resourceTitleEl.textContent = 'Active browser tab';
  }

  importBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({
      action: 'IMPORT_RESOURCE',
      data: currentTabInfo
    }, (response) => {
      statusMsgEl.style.display = 'block';
      setTimeout(() => {
        statusMsgEl.style.display = 'none';
      }, 3500);
    });
  });

  openDashboardBtn.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000/war-room' });
  });
});
