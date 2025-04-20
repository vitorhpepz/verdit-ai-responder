const DEFAULT_CONTEXT = 'You are a helper that works inside a Google extension. Your function is to help the user answer clients and general people. Usually the screen will be some email thread or WhatsApp conversation. On the next message you\'ll have the markdown content of the page the user is seeing. Your function is to suggest text to be sent to the other end of the conversation. Just send me the answer that I should write, not any explanations or any other thing';

document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const contextText = document.getElementById('contextText');

  function load() {
    // Load saved values from chrome.storage
    chrome.storage.sync.get(['apiKey', 'contextText'], (result) => {
      apiKeyInput.value = result.apiKey || '';
      contextText.value = result.contextText || DEFAULT_CONTEXT;
    });
  }

  load();
  window.addEventListener('focus', load);

  // Save settings automatically
  function saveSettings() {
    const apiKey = apiKeyInput.value;
    const newContextText = contextText.value;

    chrome.storage.sync.set({
      apiKey,
      contextText: newContextText
    });
  }

  apiKeyInput.addEventListener('input', saveSettings);
  contextText.addEventListener('input', saveSettings);
});