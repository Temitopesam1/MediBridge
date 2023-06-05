import { Router } from 'express';
import Recipient from '../models/recipientSchema';
import Provider from '../models/providerSchema';

const recipientController = Router();

recipientController.get('/medibridge/users/recipients', async (req, res) => {
  console.log('Getting all recipients');
  await Recipient.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch ((err) => {
      console.log('Error retrieving all recipients', err)
      res.status(500).json({ error: 'Could not get recipients, Our team has been notified!' });
    })
});

recipientController.get('/medibridge/users/providers', async (req, res) => {
  console.log('Getting all providers');
  await Provider.find()
    .then((providers) => {
      res.status(200).json(providers);
    })
    .catch((err) => {
      console.log('Error retrieving all providers', err);
      res.status(500).json({ error: 'Could not get all providers, Our team has been notified!'});
    })
});

recipientController.post('/medibridge/users/recipients', async (req, res) => {
  const { name, age, gender, address, phoneNumber, email } = req.body;
  const user = new Recipient
});


export default recipientController;