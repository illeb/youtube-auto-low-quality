const activeScripts = new Map();
const addYoutubeKeeper = (id) => {
  if(activeScripts.has(id))
    return;
  chrome.scripting.executeScript(
    {
      target: {tabId: id},
      files: ['contentScript.js']
    }
  );
  activeScripts.set(id, true);
};

chrome.runtime.onInstalled.addListener(() => {
  // run the script for every already open youtube tab
  chrome.tabs.query({
    audible: true,
    active: false,
    discarded: false,
    url: 'https://www.youtube.com/*'
  }).then((tabs) => tabs.forEach(({id}) => addYoutubeKeeper(id)))
  
  // for every new loaded tab in youtube site, add the script to run
  chrome.tabs.onUpdated.addListener((id, changeInfo, {url}) => {
    if (changeInfo.status == 'complete' && /(https:\/\/www.youtube.com\/)+.*/g.test(url))
      addYoutubeKeeper(id);
  })
});

