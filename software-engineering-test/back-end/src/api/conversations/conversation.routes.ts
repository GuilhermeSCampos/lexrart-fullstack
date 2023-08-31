import { Router } from 'express';
import ConversationController from './conversation.controller';
import NotAllowed from '../generic.controller';
import ConversationMiddleware from './conversation.middleware';
import { validateToken } from '@/validations/validateToken';
const rescue = require('express-rescue');

const router = Router();

const conversationController = new ConversationController();
const conversationMiddleware = new ConversationMiddleware();

//-----------Conversations Route----------------------

router.post('/', [
  rescue(conversationMiddleware.verifyBody),
  rescue(validateToken),
  rescue(conversationController.createConversation),
]);

router.get('/', [
  rescue(conversationMiddleware.validateOrderQuery),
  rescue(conversationController.getConversationsByDate)
]);

router.put('/', rescue(NotAllowed));

router.delete('/', rescue(NotAllowed));

//-----------Donwload Route----------------------------

router.post('/download/:id',
  rescue(NotAllowed)
);

router.get('/download/:id', [
  rescue(conversationMiddleware.verifyReqParams),
  rescue(conversationController.downloadCSV)
]);

router.put('/download/:id', rescue(NotAllowed));

router.delete('/download/:id', rescue(NotAllowed));

export default router;