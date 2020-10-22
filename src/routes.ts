/* eslint-disable new-cap */
import express from 'express';

import CrawlerController from './Controllers/Crawler.controller';

const routes = express.Router();
const crawlerController = new CrawlerController();

routes.get('/', (req, res) => {
  res.json({
    'App': 'ChefRetriever API',
    'Status': 'Development',
    'Author': 'Ricardo Morato <https://github.com/RicardoMorato>',
  });
});

routes.get('/meet-a-chef', crawlerController.getInfoMeetAChef);

export default routes;
