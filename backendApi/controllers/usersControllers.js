import { Router } from 'express';
import Recipient from '../models/recipientSchema';
import Provider from '../models/providerSchema';


const usersController = Router();

/*specifying the fields to return*/
const recipientsRequriedFields = '-_id name age gender address phoneNumber email isSmoking isHypertensive isDiabetic';
const providersRequiredFields = '-_id name age gender address phoneNumber email specialization, department, practiceAddress';

/*route to get all recipients */
usersController.get('/medibridge/users/recipients', async (req, res) => {
  console.log('Getting all recipients');
  await Recipient.find({}, recipientsRequriedFields)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch ((err) => {
      console.log(err)
      res.status(500).json({ error: 'Could not get recipients, Our team has been notified!' });
    })
});

/*route to get all providers */
usersController.get('/medibridge/users/providers', async (req, res) => {
  console.log('Getting all providers');
  await Provider.find({}, providersRequiredFields)
    .then((providers) => {
      res.status(200).json(providers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Could not get providers, Our team has been notified!'});
    })
});

/*route to add new recipient*/
usersController.post('/medibridge/users/recipients', async (req, res) => {
  const { name, age, gender, address, phoneNumber, email, isSmoking, isHypertensive, isDiabetic } = req.body;
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
    .then(async (result) => {
      await Recipient.findById(result._id, recipientsRequriedFields)
      .then((result) => {
        console.log('Saved new recipient:', result.email);
        res.status(201).send("Recipient Created!");
      })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Could not save user'})
    })
    })
});

/*route to add new provider*/
usersController.post('/medibridge/users/providers', async (req, res) => {
  const { name, age, gender, address, phoneNumber, email, licenseNumber, specialization, department, practiceAddress } = req.body;
  const user = new Provider({
    name,
    age,
    gender,
    address,
    phoneNumber,
    email,
    licenseNumber,
    specialization,
    department,
    practiceAddress,
  });
  await user.save()
    .then(async (result) => {
      await Provider.findById(result._id, providersRequiredFields)
      .then((result) => {
        console.log('Saved new provider:', result.email);
        res.status(201).send("Provider created!");
      })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Could not save user'})
    })
    })
});

/*route to get a recipient with email as a parameter*/
usersController.get('/medibridge/users/recipients/:email', async (req, res) => {
  const userEmail = req.params.email;
  await Recipient.findOne({ email: userEmail}, recipientsRequriedFields)
    .then((user) => {
      console.log('Get recipient:', user.email);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Could not get user' });
    });
});

/*route to get a provider with email as a parameter*/
usersController.get('/medibridge/users/providers/:email', async (req, res) => {
  const userEmail = req.params.email;
  await Provider.findOne({ email: userEmail}, providersRequiredFields)
    .then((user) => {
      console.log('Get provider:', user.email);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Could not get user' });
    });
});

/*route to update user with email as a parameter*/
usersController.put('/medibridge/users/recipients/:email', async (req, res) => {
  const userEmail = req.params.email;
  const { name, age, gender, address, phoneNumber, email, isSmoking, isHypertensive, isDiabetic } = req.body;
  const user = {
    name,
    age,
    gender,
    address,
    phoneNumber,
    email,
    isSmoking,
    isHypertensive,
    isDiabetic
  };
  console.log('Updating recipient');
  await Recipient.findOneAndUpdate({ email: userEmail }, { user }, { new: true })
    .then(async (result) => {
      await Recipient.findOne({ email: email }, recipientsRequriedFields)
        .then((result) => {
          console.log('Updated recipient', userEmail);
          res.status(200).json(result);
        })
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Could not update user' })
    })
});

usersController.put('/medibridge/users/providers/:email', async (req, res) => {
  const userEmail = req.params.email;
  const { name, age, gender, address, phoneNumber, email, specializationDepartment, practiceAddress } = req.body;
  const user = new Provider({
    name,
    age,
    gender,
    address,
    phoneNumber,
    email,
    specializationDepartment,
    practiceAddress
  });  
  console.log('Updating provider');
  await Provider.findOneAndUpdate({ email: userEmail }, { user }, { new: true })
    .then(async (result) => {
      await Provider.findOne({ email: email }, providersRequiredFields)
        .then((result) => {
          console.log('Updated provider', userEmail);
          res.status(200).json(result);
        })
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Could not update user' })
    })
});

/*route to delete a recipient with email as a parameter*/
usersController.delete('/medibridge/users/recipients/:email', async (req, res) => {
  const userEmail = req.params.email;
  await Recipient.findOneAndDelete({ email: userEmail })
    .then(() => {
      console.log('Deleted recipient', userEmail);
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Could not delete user' });
    })
});

/*route to delete a provider with email as a parameter*/
usersController.delete('/medibridge/users/providers/:email', async (req, res) => {
  const userEmail = req.params.email;
  await Provider.findOneAndDelete({ email: userEmail })
    .then(() => {
      console.log('deleted Provider', userEmail);
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Could not delete user' });
    })
});

export default usersController;
