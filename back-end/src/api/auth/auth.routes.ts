import { Router } from 'express';
import AuthController from './auth.controller';
import AuthMiddleware from './auth.middleware';
import NotAllowed from '../generic.controller';
const rescue = require('express-rescue');

const router = Router();

const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

//-----------Login Route----------------------


router.post('/login', [
  rescue(authMiddleware.verifyUserBody),
  rescue(authController.login),
]);

router.get('/login', rescue(NotAllowed));

router.put('/login', rescue(NotAllowed));

router.delete('/login', rescue(NotAllowed));

//--------------------Validate Route--------------------------

router.post('/validate', [
  rescue(authController.validateToken)
]);

router.get('/validate', rescue(NotAllowed));

router.put('/validate', rescue(NotAllowed));

router.delete('/validate', rescue(NotAllowed));

//--------------------Logout Route--------------------------

router.post('/logout', [
  rescue(authController.logout)
]);

router.get('/logout', rescue(NotAllowed));

router.put('/logout', rescue(NotAllowed));

router.delete('/logout', rescue(NotAllowed));

//-------------------Register Route--------------------------
router.post('/register', [
  rescue(authMiddleware.verifyUserBody),
  rescue(authController.createUser)
]);

router.get('/register', rescue(NotAllowed));

router.put('/register', rescue(NotAllowed));

router.delete('/register', rescue(NotAllowed));

export default router;