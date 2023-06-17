import Recipient from '../models/recipientSchema';
import Provider from '../models/providerSchema';



class UsersController{
  /*route to get all recipients */
  async getRecipients(req, res){
    console.log('Getting all recipients');
    await Recipient.find({})
      .then((users) => {
        res.status(200).json(users);
      })
      .catch ((err) => {
        console.log(err)
        res.status(500).json({ error: 'Could not get recipients, Our team has been notified!' });
      })
  }

  /*route to get all providers */
  async getProviders(req, res){
    console.log('Getting all providers');
    await Provider.find({})
      .then((providers) => {
        res.status(200).json(providers);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Could not get providers, Our team has been notified!'});
      })
  }

  /*route to add new recipient*/
  async postRecipient(req, res){
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
        await Recipient.findById(result._id)
        .then((result) => {
          console.log('Saved new recipient:', result.email);
          res.status(201).send("Recipient Created!");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ error: 'Could not save user'})
        })
      })
  }

  /*route to add new provider*/
  async postProvider(req, res){
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
        await Provider.findById(result._id)
        .then((result) => {
          console.log('Saved new provider:', result.email);
          res.status(201).send("Provider created!");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({ error: 'Could not save user'})
        })
      })
  }

  /*route to get a recipient */
  async getRecipient(req, res){
    const { id } = req.params;
    await Recipient.findById(id)
      .then((user) => {
        console.log('Get recipient:', user.email);
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Could not get user' });
      });
  }

  /*route to get a provider */
  async getProvider(req, res){
    const { id } = req.params;
    await Provider.findById(id)
      .then((user) => {
        console.log('Get provider:', user.email);
        res.status(200).json(user);
      })
        .catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Could not get user' });
      });
  }

  /*route to update user */
  async editRecipient(req, res){
    const { id } = req.params;
    console.log('Updating recipient');
    await Recipient.findOneAndUpdate(
      {
      _id: id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      })
      .then((result) => {
        console.log('Updated recipient:', result.email);
        res.status(200).send("Recipient updated!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Could not update user' })
      });
  }

  async editProvider(req, res){
    const { id } = req.params;  
    console.log('Updating provider');
    await Provider.findOneAndUpdate(
      {
        _id: id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      })
      .then((result) => {
        console.log('Updated provider:', result.email);
        res.status(200).send("Provider updated!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Could not update user' })
      })
  }

  /*route to delete a recipient */
  async deleteRecipient(req, res){
    const { id } = req.params;
    await Recipient.deleteOne({ _id: id })
      .then(() => {
        console.log('Deleted recipient');
        res.status(204).end("user deleted!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Could not delete user' });
      })
  }

  /*route to delete a provider */
  async deleteProvider(req, res){
    const { id } = req.params;
    await Provider.deleteOne({ _id: id })
      .then(() => {
        console.log('deleted Provider');
        res.status(204).end("user deleted!");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ error: 'Could not delete user' });
      })
  }
}


const usersController = new UsersController();
export default usersController;
