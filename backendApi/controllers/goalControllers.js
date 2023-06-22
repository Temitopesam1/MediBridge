import authController from './auth';

class goalControllers {

  /* Saving new goal */
  async addGoal(req, res){
    const user = authController.authenticate(req);
    if (user){
      try{
        const { goal, days } = req.body;
        user.healthGoals.push({
          goal,
          days
        });
        await user.save();
        return res.status(200).json({ message: 'New goal saved successfully' });      
      } 
      catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding new goal' });
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  /*editing a goal */
  async editGoals(req, res) {

    const user = authController.authenticate(req);
    if (user) {
      try{
        const id = req.params;
        const { goal, days } = req.body;
        user.healthGoals.forEach((goals) => {
          if (goals._id.toString() == id) {
            goals.goal = goal;
            goals.days = days;
          }
        });
        await user.save();
        return res.staus(200).json({message: 'Goal edited successfully!'});
      } 
      catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while editing goal' });
      }

    }
    return res.status(401).json({ error: 'Unauthorized'})

  }

  /*deleting a goal */
  async deleteGoals(req, res) {

    const user = authController.authenticate(req);
    if (user) {
      try{
        const { id } = req.params;
        goal = user.healthGoals.id(id);
        goal.remove();
        await user.save();
        return res.status(200).json({ message: 'Goal deleted successfully!' })
      } 
      catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while adding new goal' });
      }

    }
    return res.status(401).json({ error: 'Unauthorized'})
  }
}

const goalsContoller = new goalControllers();
export default goalsContoller;
