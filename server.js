require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const { google } = require('googleapis');


const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
const port = process.env.PORT || 3000;



const jwtClient = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY,
  process.env.SCOPES
);
  
const calendar = google.calendar({
  version: 'v3',
  project: process.env.GOOGLE_PROJECT_NUMBER,
  auth: jwtClient
});
  
app.get('/appointment', (req, res) => {
  calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, result) => {
    if (err) {
      res.status(500).send('There was an error contacting the Calendar service: ' + err);
    } else {
      if (result.data.items.length) {
        res.status(200).json({ events: result.data.items });
      } else {
        res.status(200).json({ message: 'No upcoming events found.' });
      }
    }
  });
});
  
app.post("/appointment",(req,res)=>{
  const {
    patientName,
    doctorName,
    startTime,
    endTime,
    location,
    summary,
    description,
   } = req.body;
  var event = {
    'summary': summary,
    'location': location,
    'description': description || summary,
    'start': {
      'dateTime': startTime,
      'timeZone': 'Africa/Lagos',
    },
    'end': {
      'dateTime': endTime,
      'timeZone': 'Africa/Lagos',
    },
    'attendees': [doctorName, patientName],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
    
  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.KEYFILE,
    scopes: 'https://www.googleapis.com/auth/calendar',
  });
  auth.getClient().then(a=>{
    calendar.events.insert({
      auth:a,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
    }, function(err, event) {
      if (err) {
        res.status(500).send('There was an error contacting the Calendar service: ' + err);
        return;
      }
      res.status(200).send("Event successfully created!");
    });
  })
})

app.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});