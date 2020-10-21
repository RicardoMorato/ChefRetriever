/* eslint-disable require-jsdoc */
import puppeteer from 'puppeteer';
import {Request, Response} from 'express';

export default class Crawler {
  async getInfoMeetAChef(req: Request, res: Response) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://meetachef.com/chefs';

    await page.goto(url);

    const aux = await page.evaluate(() => {
      const arrayOfImages = document.querySelectorAll(
          'img.Styled__ListingImg-sc-1nslgi0-2.gDcilC',
      );

      const returner: Array<Element> = [];

      for (let index = 0; index < arrayOfImages.length; index++) {
        returner.push(arrayOfImages[index].src);
      }

      return returner;
    });

    res.json(aux);
  };
}
