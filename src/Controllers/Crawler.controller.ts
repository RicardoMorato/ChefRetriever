/* eslint-disable require-jsdoc */
import puppeteer from 'puppeteer';
import {Request, Response} from 'express';

const scrollPageToBottom = require('puppeteer-autoscroll-down');

export default class Crawler {
  chefs: {};
  constructor() {
    this.chefs = {};
  }

  chefConstructor = (
      name: string,
      location: string,
      specialty: string,
      bio: string,
  ) => {
    const chef = {
      name,
      location,
      specialty,
      bio,
    };

    return chef;
  }

  getInfoMeetAChef = async (req: Request, res: Response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://meetachef.com/chefs';

    await page.goto(url, {waitUntil: 'load'});

    await page.evaluate((_) => {
      window.scrollTo(0, 0);
    });

    // Scroll to the bottom of the page with puppeteer-autoscroll-down
    await scrollPageToBottom(page);

    const chefs = await page.evaluate(() => {
      const chefs = [];

      const motherDiv = document.querySelector(
          '.HomePageComponents__BaseDiv-sc-13amrf6-6.jDqYnR',
      );

      const arrayOfCards = motherDiv?.querySelectorAll(
          'a.Styled__ListingCardContainer-sc-1nslgi0-0.htwOKc',
      );

      const arrayLength = arrayOfCards?.length;

      if (arrayOfCards && arrayLength) {
        for (let index = 0; index < arrayLength; index++) {
          const chefName = arrayOfCards[index]?.querySelector(
              '.Styled__ListingHeadingH2-sc-1nslgi0-6.khsIQU',
          )?.innerHTML;

          const chefSpecialty = arrayOfCards[index]?.querySelector(
              '.Styled__ListingSpan-sc-1nslgi0-8.jBqSiQ',
          )?.innerHTML;

          const chefBioCard = arrayOfCards[index]?.querySelector(
              '.Styled__ListingDescriptionP-sc-1nslgi0-13.cAtssD',
          );
          const chefBio = (chefBioCard?.firstChild as Element).innerHTML;

          const chefLocation = arrayOfCards[index]?.querySelector(
              '.Styled__LocationNameSpan-sc-1nslgi0-10.cAUUyt',
          )?.innerHTML;

          const chefImage = arrayOfCards[index]?.querySelector(
              '.Styled__ListingImg-sc-1nslgi0-2.gDcilC',
          )?.src;

          const currentChef = {
            Name: chefName,
            Specialty: chefSpecialty,
            Bio: chefBio,
            Location: chefLocation,
            Image: chefImage,
          };
          chefs.push(currentChef);
        }
      }

      return chefs;
    });

    res.json(chefs);
  };
}
