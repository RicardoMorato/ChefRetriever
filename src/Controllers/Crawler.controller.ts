/* eslint-disable require-jsdoc */
import puppeteer from 'puppeteer';
import {Request, Response} from 'express';

export default class Crawler {
  async getInfoMeetAChef(req: Request, res: Response) {
    const chefs = {};

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://meetachef.com/chefs';

    await page.goto(url);

    const chefName = await page.evaluate(() => {
      const motherDiv = document.querySelector(
          '.HomePageComponents__BaseDiv-sc-13amrf6-6.jDqYnR',
      );

      const card = motherDiv?.querySelector(
          '.Styled__ListingInfoContainer-sc-1nslgi0-5.iktAgy',
      );

      const name = card?.querySelector(
          '.Styled__ListingHeadingH2-sc-1nslgi0-6.khsIQU',
      )?.innerHTML;

      return name;
    });

    const chefSpecialty = await page.evaluate(() => {
      const motherDiv = document.querySelector(
          '.HomePageComponents__BaseDiv-sc-13amrf6-6.jDqYnR',
      );

      const card = motherDiv?.querySelector(
          '.Styled__ListingInfoContainer-sc-1nslgi0-5.iktAgy',
      );

      const specialty = card?.querySelector(
          '.Styled__ListingSpan-sc-1nslgi0-8.jBqSiQ',
      )?.innerHTML;

      return specialty;
    });

    const chefBio = await page.evaluate(() => {
      const motherDiv = document.querySelector(
          '.HomePageComponents__BaseDiv-sc-13amrf6-6.jDqYnR',
      );

      const card = motherDiv?.querySelector(
          '.Styled__ListingInfoContainer-sc-1nslgi0-5.iktAgy',
      );

      const aux = card?.querySelector(
          '.Styled__ListingDescriptionP-sc-1nslgi0-13.cAtssD',
      );

      const bio = aux?.firstChild;

      return (bio as Element).innerHTML;
    });

    const chefLocation = await page.evaluate(() => {
      const motherDiv = document.querySelector(
          '.HomePageComponents__BaseDiv-sc-13amrf6-6.jDqYnR',
      );

      const card = motherDiv?.querySelector(
          '.Styled__ListingInfoContainer-sc-1nslgi0-5.iktAgy',
      );

      const location = card?.querySelector(
          '.Styled__LocationNameSpan-sc-1nslgi0-10.cAUUyt',
      )?.innerHTML;

      return location;
    });

    console.log(chefName);
    console.log(chefLocation);
    console.log(chefSpecialty);
    console.log(chefBio);

    res.json({a: 'a'});
  };
}
