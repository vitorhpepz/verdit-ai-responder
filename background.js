const DEFAULT_CONTEXT = 'You are a helper that works inside a Google extension. Your function is to help the user answer clients and general people. Usually the screen will be some email thread or WhatsApp conversation. On the next message you\'ll have the markdown content of the page the user is seeing. Your function is to suggest text to be sent to the other end of the conversation. Just send me the answer that I should write, not any explanations or any other thing';

console.log('starting');

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get(['apiKey', 'contextText'], (result) => {
    const API_KEY = result.apiKey || '';
    const contextText = result.contextText || DEFAULT_CONTEXT;

    if (!API_KEY) {
      showSuccess(false, 'Key!')
      return;
    }

    chrome.action.setBadgeText({ text: '...' });
    chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });

    // Send message to content script to get Markdown
    chrome.tabs.sendMessage(tab.id, { action: 'convertToMarkdown' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        showSuccess(false);
        return;
      }

      const markdown = response.markdown.trim();

      // Proceed with OpenAI API call
      fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4.1',
          messages: [
            { role: "system", content: contextText },
            { role: "user", content: markdown }
          ]
        })
      })
      .then(response => response.json())
      .then(result => {
        if (!result.choices[0]) {
          console.error('Error:', JSON.stringify(result));
          showSuccess(false);
          navigator.clipboard.writeText(JSON.stringify(result));
          return;
        }

        const message = result.choices[0].message.content;

        // Find the currently focused element
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (message) => {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
              activeElement.value = message;
            } else if (activeElement.isContentEditable) {
              activeElement.innerText = message;
            }

            // Put message on the clipboard
            navigator.clipboard.writeText(message).catch(err => alert(err.message));
          },
          args: [message]
        });

        showSuccess(true);
      })
      .catch(error => {
        console.error('Error:', error);
        showSuccess(false);
      });
    });
  });
});

function showSuccess(success, msg = 'Err') {
  chrome.action.setBadgeText({ text: success ? 'OK' : msg });
  chrome.action.setBadgeBackgroundColor({ color: success ? '#00FF00' : '#FF0000' });
  setTimeout(() => {
    chrome.action.setBadgeText({ text: '' });
  }, 2000);
}

let lastActiveTabUrl = null;

// Listen for tab activation events
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && !tab.url.startsWith('chrome-extension')) {
      lastActiveTabUrl = tab.url;
      console.log(lastActiveTabUrl);
    }
  });
});

// Listen for tab updates (e.g., URL changes within the same tab)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id === tabId) {
        if (tab.url && !tab.url.startsWith('chrome-extension')) {
          lastActiveTabUrl = tab.url;
          console.log(lastActiveTabUrl);
        }
      }
    });
  }
});

// Listen for messages from the options page
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getLastActiveTabUrl') {
    sendResponse({ url: lastActiveTabUrl });
  }
});