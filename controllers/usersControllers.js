import { Router } from 'express';
import recipient from '../models/recipientSchema';

const recipientController = Router();

recipientController.get('/medibridge/users/recipients', async (req, res) => {
  await recipient.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch ((err) => {
      console.log('Error retrieving all recipients', err)
      res.status(500).json({ error: 'Could not get recipients, Our team has been notified!' })
    })
});

export default recipientController;