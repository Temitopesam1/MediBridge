import Recipient from '../models/recipientSchema';
import authController from './auth';


class HistoryConroller{
  /* Saving new history by provider */
  async postHistory(req, res){
    const user = authController.authenticate(req);
    if (user){
      try{
        const { provider, symptoms, diagnosis, notes, prescriptions } = req.body;

        // Update the recipient's history record
        const recipient = await Recipient.findById(req.params.id);
        recipient.history.push({
          provider,
          symptoms,
          diagnosis,
          notes,
          prescriptions
        });
        await recipient.save();

        return res.status(201).json({ message: 'History submitted successfully!' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while submitting the history' });
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  /*getting histories by user */
   async getHistory(req, res){
    const user = authController.authenticate(req);
    if (user){
      try {
        const recipientId = req.params.id;

        const recipient = await Recipient.findById(recipientId);
        if (!recipient) {
          return res.status(404).json({ message: 'Recipient not found.' });
        }

        return res.status(200).json({ Histories: recipient.history });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching recipient history' });
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

const historyContoller = new HistoryConroller();
export default historyContoller;