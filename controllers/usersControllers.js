import { Router } from 'express';
import Recipient from '../models/recipientSchema';
import Provider from '../models/providerSchema';

const usersController = Router();

usersController.get('/medibridge/users/recipients', async (req, res) => {
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

usersController.get('/medibridge/users/providers', async (req, res) => {
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

usersController.post('/medibridge/users/recipients', async (req, res) => {
  const { name, age, gender, address, phoneNumber, email } = req.body;
  const user = new Recipient({
    name,
    age,
    gender,
    address,
    phoneNumber,
    email,
    isSmoking,
    isHypertensive,
    isDiabetic
  });
  await user.save()
    .then((result) => {
      console.log('Saved new recipient:', result.email);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Cannot save user'})
    })
});

usersController.post('/medibridge/users/providers', async (req, res) => {
  const { name, age, gender, address, phoneNumber, email } = req.body;
  const user = new Provider({
    name,
    age,
    gender,
    address,
    phoneNumber,
    email,
    licenseNumber,
    specializationDepartment,
    practiceAddress
  });
  await user.save()
    .then((result) => {
      console.log('Saved new provider:', result.email);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Cannot save user'})
    })
});

usersController.delete('/medibridge/users/recipients', async (req, res) => {
  const userEmail = req.query.email;
  await Recipient.findOneAndDelete({ email: userEmail })
    .then(() => {
      console.log('Deleted recipient', userEmail);
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Bad Request!'});
    })
});

usersController.delete('/medibridge/users/providers', async (req, res) => {
  const userEmail = req.query.email;
  await Provider.findOneAndDelete({ email: userEmail })
    .then(() => {
      console.log('deleted Provider', userEmail);
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Bad Request!'});
    })
});

export default usersController;
