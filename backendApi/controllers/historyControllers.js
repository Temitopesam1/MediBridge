import Recipient from '../models/recipientSchema';


class HistoryConroller{
  /* Saving new history by provider */
  async postHistory(req, res){
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

      return res.status(201).json({ message: 'History submitted successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while submitting the history.' });
    }
  }

 

  /*getting histories by provider */
   async getHistory(req, res){
    try {
      const recipientId = req.params.id;

      const recipient = await Recipient.findById(recipientId);
      if (!recipient) {
        return res.status(404).json({ message: 'Recipient not found.' });
      }

      return res.status(200).json({ Histories: recipient.history });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while fetching recipient history.' });
    }
  }
}

const historyContoller = new HistoryConroller();
export default historyContoller;