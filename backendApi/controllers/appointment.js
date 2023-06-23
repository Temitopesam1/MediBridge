import authController from './auth';

class Appointment{

  async bookAppointment(req, res){
    const user = authController.authenticate(req);
    if (user){
      try{
        user.appointments.push(req.body);
        await user.save();
        return res.status(201).json({ message: 'Appointment booked successfully.' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ 'An error occurred while submitting appointment': error });
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  async getAppointments(req, res){
    const user = authController.authenticate(req);
    if (user){
      try{
        if(user.appointments.length){
          return res.status(200).json({ 'Appointments Booked By You': recipient.appointment });
        } else {
          return res.status(200).json({ message: 'No Appointment Booked By You!' });
        }
      } catch (error) {
        console.error(error);
       return res.status(500).json({ 'An error occurred while fetching appointment': error });
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // async editAppointment(req, res){
  //   const user = authController.authenticate(req);
  //   if (user){
  //     try{

  // }

  async deleteAppointment(req, res){
    const user = authController.authenticate(req);
    if (user){
      try{
        const appointment = user.appointments.find(app => app._id.toString() === req.params.id);
        user.appointments.remove(appointment);
        await user.save();
        return res.status(200).json({message:'Successfully Deleted'});
      }catch(error){
        return res.status(500).json({'An error occurred while deleting appointment': error});
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  }











}






const appointment = new Appointment();
export default appointment;