//if we pass any data/value to the sxtension we use this
let color = 'red';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
});