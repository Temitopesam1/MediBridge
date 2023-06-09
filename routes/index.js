import { Router } from "express"; 
import appointment from "../controllers/Appointment";

const router = Router();

router.get('/appointment', appointment.getAppointment);
router.post('/appointment', appointment.createAppointment);

module.exports = router;