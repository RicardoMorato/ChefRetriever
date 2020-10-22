/* eslint-disable require-jsdoc */
import puppeteer from 'puppeteer';
import {Request, Response} from 'express';

export default class Crawler {
  chefs: {};
  constructor() {
    this.chefs = {};
  }

  // TODO:
  // Selecionar TODOS os cards de chefs da motherDiv.
  // Após isso, fazer um FOR que irá percorrer cada um deles e
  // retirar as informações que são necessárias.

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

    await page.goto(url);

    const aux = await page.evaluate(() => {
      const chefs = [];

      const motherDiv = document.querySelector(
          '.HomePageComponents__BaseDiv-sc-13amrf6-6.jDqYnR',
      );

      const arrayOfCards = motherDiv?.querySelectorAll(
          'a.Styled__ListingCardContainer-sc-1nslgi0-0.htwOKc',
      );

      const arrayLength = arrayOfCards?.length;

      for (let index = 0; index < arrayLength; index++) {
        const chefName = arrayOfCards[index]?.querySelector(
            '.Styled__ListingHeadingH2-sc-1nslgi0-6.khsIQU',
        )?.innerHTML;

        const currentChef = {name: chefName};
        chefs.push(currentChef);
      }

      return chefs;
    });

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

    console.log(aux);

    const chef = this.chefConstructor(
        chefName,
        chefLocation,
        chefSpecialty,
        chefBio,
    );

    res.json(chef);
  };
}
