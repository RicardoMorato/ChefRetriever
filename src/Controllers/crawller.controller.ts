/* eslint-disable require-jsdoc */
import puppeteer from 'puppeteer';

export default async function getInfoMeetAChef() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'https://meetachef.com/chefs';

  await page.goto(url);
  const chefsList = await page.evaluate(() => {
    return (
      document.querySelectorAll(
          '.HomePageComponents__BaseDiv-sc-13amrf6-6.jhHqBH',
      )
    );
  });

  return chefsList;
}
