const express = require('express');
const ConversationsService = require('./../services/conversations');

const conversationsApi = (app) => {
  const router = express.Router();
  app.use('/api/conversations/', router);

  const conversationsService = new ConversationsService();

  router.get('/', async (req, res, next) => {
    const docs = await conversationsService.getAllConversations();
    res.status(200).json(docs);
  });

  router.get('/stats', async (req, res, next) => {
    try {
      const { start, end } = req.query;
      const rta = await conversationsService.getStats(start, end);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const doc = await conversationsService.getConversation(id);
      res.status(200).json(doc);
    } catch (error) {
      next(error);
    }
  });

}

module.exports = conversationsApi;