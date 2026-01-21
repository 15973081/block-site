const button = document.querySelector('.back-button');

button.addEventListener('click', () => {
  button.style.transform = 'scale(0.95)';

  const fallback = () => {
    window.location.replace('about:blank');
  };

  try {
    if (typeof chrome !== 'undefined' && chrome.storage?.session && chrome.tabs) {
      // 告诉 background：这是一次"用户主动关闭"
      chrome.storage.session.set({ allowCloseOnce: true }, () => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          const tab = tabs?.[0];
          if (tab?.id) {
            chrome.tabs.remove(tab.id);
          } else {
            fallback();
          }
        });
      });
    } else {
      fallback();
    }
  } catch (e) {
    fallback();
  }

  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 150);
});