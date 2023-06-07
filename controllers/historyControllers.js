import { Router } from 'express';
import History from '../models/historySchema';
import Recipient from '../models/recipientSchema';
import Provider from '../models/providerSchema';

const historyContoller = Router();

const historyRequiredFields = '-recipientEmail -providerEmail diagnosis symptoms notes prescriptions';
const recipientsRequriedFields = '-_id name age gender address phoneNumber email isSmoking isHypertensive isDiabetic';
const providersRequiredFields = '-_id name age gender address phoneNumber email specializationDepartment practiceAddress';

/*Saving new history by provider */
historyContoller.post('/medibridge/historys/:email', async (req, res) => {
  const { recipientEmail, symptoms, diagnosis, notes, prescriptions } = req.body;
  const providerEmail = req.params.email;
  await Recipient.findOne({ email: recipientEmail}, recipientsRequriedFields)
    .then(async(recipientOb) => {
      const recipientName = recipientOb.name;
      const providerOb = await Provider.findOne({ email: providerEmail}, providersRequiredFields);
      if (providerOb) {
        const providerName = providerOb.name;
        const history = new History({
          providerEmail,
          providerName,
          recipientEmail,
          recipientName,
          symptoms,
          diagnosis,
          notes,
          prescriptions
        });
        await history.save()
          .then((result) => {
            console.log('Saved new history for', recipientName, 'by', providerName);
            res.status(204).end()
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ error: 'Bad request' });
          })
      }
      res.status(400).json({ error: 'Could not save history, no provider found!'})
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({ error: 'Could not save history, no recipient found!'})
    })
});

/*getting historys by provider */
historyContoller.get('/medibridge/historys/:email', async (req, res) => {
  const recipientEmail = req.params.email;
  await History.find({ email: recipientEmail }, historyRequiredFields)
    .then((result) => {
      console.log('Get history for:', recipientEmail);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: 'Could not get history for user'})
    });
});

export default historyContoller;