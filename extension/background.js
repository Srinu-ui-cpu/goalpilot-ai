// background.js - GoalPilot AI Service Worker
chrome.runtime.onInstalled.addListener(() => {
  console.log('GoalPilot AI Companion Extension Installed');
  chrome.alarms.create('STUDY_REMINDER_CHECK', { periodInMinutes: 15 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'STUDY_REMINDER_CHECK') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236366f1"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
      title: 'GoalPilot AI: Session Starting Soon',
      message: 'Your SQL Recursive CTE mission starts in 15 minutes. Stay consistent with your streak!',
      priority: 2
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'IMPORT_RESOURCE') {
    console.log('Importing resource to GoalPilot:', request.data);
    chrome.storage.local.get(['imported_items'], (res) => {
      const existing = res.imported_items || [];
      existing.push({
        ...request.data,
        importedAt: new Date().toISOString()
      });
      chrome.storage.local.set({ imported_items: existing }, () => {
        sendResponse({ success: true, count: existing.length });
      });
    });
    return true;
  }
});
