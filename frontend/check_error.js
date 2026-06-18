import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:3000/admin/vehicle-contracts/6a32648b9a346f270b64627f', { waitUntil: 'networkidle0' });
  
  await browser.close();
})();
