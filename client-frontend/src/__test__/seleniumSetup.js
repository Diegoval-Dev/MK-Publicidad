import { Builder, By, Key, until } from 'selenium-webdriver';

(async function example() {
  let driver = await new Builder().forBrowser('MicrosoftEdge').build();
  try {
    await driver.get('http://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('Selenium', Key.RETURN);
    await driver.wait(until.titleIs('Selenium - Google Search'), 1000);
  } finally {
    await driver.quit();
  }
})();
