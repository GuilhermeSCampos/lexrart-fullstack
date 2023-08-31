import { Router } from 'express';
import authRouter from './auth/auth.routes';
import conversationRouter from './conversations/conversation.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/conversation', conversationRouter);


export default apiRouter;