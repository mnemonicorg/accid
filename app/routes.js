import express from 'express';

import renderApp from './render-app';
import { STATIC_PATH } from '../config/app_config';


const router = express.Router();

router.get('/500', () => {
  throw Error('Fake Internal Server Error');
});

router.get('*', (req, res) => {
  return res.send(renderApp());
});

router.use(STATIC_PATH, express.static('dist'));
router.use(STATIC_PATH, express.static('public'));

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


export default router;
