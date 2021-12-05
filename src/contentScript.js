setInterval(async () => {
  // let's run the script only when the current youtube tab is in background, and the url is from youtube
  if(document.visibilityState === 'visible' || !/(https:\/\/www.youtube.com\/)+.*/g.test(document.URL))
    return;
  const waitFor = (delay) => new Promise(resolve => setTimeout(resolve, delay));

  // clicks the gear button
  const settingsButton = document.querySelector('.ytp-settings-button');
  settingsButton?.click();
  await waitFor(1000);

  // clicks the quality subMenu
  const qualityButton = Array.from(document.querySelectorAll('.ytp-settings-menu .ytp-menuitem'))
    .find(element => { 
      const labelText = element.querySelector('.ytp-menuitem-label').textContent;
      return labelText  === 'Qualità' || labelText === 'Quality'
    });
  qualityButton?.click();
  await waitFor(1000);

  // sets the lowest quality avaiable in the player
  const qualities = Array.from(document.querySelectorAll('.ytp-quality-menu .ytp-menuitem'));
  const lowestQuality = qualities.find(({textContent}) => textContent === '144p') ?? qualities.find(({textContent}) => textContent === '240p')
  if(!lowestQuality?.hasAttribute('aria-checked'))
    lowestQuality.click();
  else
    settingsButton?.click();
}, 300000);
