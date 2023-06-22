import Recipient from '../models/recipientSchema';
import Provider from '../models/providerSchema';
import authController from './auth';
const fs = require('fs');



class UsersController{
  async getUser(req, res) {
    const user = await authController.authenticate(req);
    if (user) {
      return res.json({ user });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  /*route to add new recipient*/
  async addUser(req, res){
    if (req.body.provider){
      const { name, age, gender, password, address, phoneNumber, 
        email, licenceNumber, specialization, department, practiceAddress, charges } = req.body;
      try {
        const user = new Provider({
          name,
          age,
          gender,
          address,
          phoneNumber,
          email,
          licenceNumber,
          specialization,
          department,
          practiceAddress,
          charges,
          password: sha1(password)
        });
        await user.save();
        return res.status(201).send("Provider Created!");
      } 
      catch(error){
        return res.status(400).json({ 'Error saving user': error })
      }
    }
    const { name, age, gender, password, address, phoneNumber, email, isSmoking, isHypertensive, isDiabetic } = req.body;
    try{
        const user = new Recipient({
        name,
        age,
        gender,
        address,
        phoneNumber,
        email,
        isSmoking,
        isHypertensive,
        isDiabetic,
        password: sha1(password)
      });
      await user.save();
      return res.status(201).send("Recipient Created!");
    } 
    catch(error){
      return res.status(400).json({ 'Error saving user': error })
    }
  }

  /*route to update user */
  async editUser(req, res){
    const user = await authController.authenticate(req);
    if (user) {
      if(user.hasOwnProperty('specialization')){
        console.log('Updating recipient');
        try{
          await Provider.findOneAndUpdate(
            {
              _id: id,
            },
            req.body,
            {
              new: true,
              runValidators: true,
            }
          )
          return res.status(200).send("Recipient updated!");
        } catch(error) {
          return res.status(400).json({ 'Error saving user': error });
        }
      }
      try{
        await Recipient.findOneAndUpdate(
          {
            _id: id,
          },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        )
        return res.status(200).send("Provider updated!");
      } catch(error){
        return res.status(400).json({ 'Error saving user': error });
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  /*route to delete a recipient */
  async deleteUser(req, res){
    const user = await authController.authenticate(req);
    if (user) {
      if(user.hasOwnProperty('specialization')){
        try{
          await Provider.deleteOne({ _id: id })
          console.log('Deleted provider');
          return res.status(204).end("user deleted!");
        } catch(error){
          res.status(400).json({ 'Could not delete user': error });
        }
      }
      try{
        await Recipient.deleteOne({ _id: id })
        console.log('Deleted recipient');
        return res.status(204).end("user deleted!");
      } catch(error){
        return res.status(400).json({ 'Could not delete user': error });
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
}


const usersController = new UsersController();
export default usersController;
