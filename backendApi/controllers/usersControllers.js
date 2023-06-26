import authController from './auth';



class UsersController{


  async getUser(req, res) {
    const user = await authController.authenticate(req);
    if (user) {
      return res.json({ user });
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }


  /*route to update user */
  async editUser(req, res){
    const user = await authController.authenticate(req);
    if (user) {
      try{
        Object.assign(user, req.body);
        await user.save();
        return res.status(200).send("User updated!");
      } catch(error) {
        return res.status(400).json({ 'Error saving user': error });
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  /*route to delete a recipient */
  async deleteUser(req, res){
    const user = await authController.authenticate(req);
    if (user) {
      try{
        await user.remove();
        console.log('Deleted provider');
        return res.status(204).end("user deleted!");
      } catch(error){
        res.status(400).json({ 'Could not delete user': error });
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }
}


const usersController = new UsersController();
export default usersController;
