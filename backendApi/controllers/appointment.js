const fs = require('fs').promises;
import Recipient from '../models/recipientSchema';
import Provider from '../models/providerSchema';
const fileStructure = require('fs');
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
require('dotenv').config();















// // If modifying these scopes, delete token.json.
const SCOPES = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.readonly'
];


const jwtClient = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY,
  SCOPES[1]
);

const calendar = google.calendar({
  version: 'v3',
  project: process.env.GOOGLE_PROJECT_NUMBER,
  auth: jwtClient
});

class Appointment{

  async bookAppointment(req, res){
    try{
      let user = await Recipient.findById(req.params.id);
      user.ratings.push(req.body);
      await user.save();
      return res.status(201).json({ message: 'Appointment booked successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ 'An error occurred while submitting appointment': error });
    }
  }

  async getAppointments(req, res){
    try{
      let user = await Recipient.findById(req.params.id);
      if(user.appointment.length){
        return res.status(200).json({ 'Appointments Booked By You': user.appointment });
      } else {
        return res.status(200).json({ message: 'No Appointment Booked By You!' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ 'An error occurred while fetching appointment': error });
    }
  }









  getAppointment(req, res){
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
  };
    
  createAppointment(req,res){
    const {
      patientName,
      doctorName,
      startTime,
      endTime,
      location,
      summary,
      description,
     } = req.body;
    const event = {
      'summary': summary,
      'location': location,
      'description': description,
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
      scopes: SCOPES[0],
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
        res.status(200).send("Event successfully created!" + event);
      });
    })
  }
}

// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


// function deleteFile(filePath){
//     if (fileStructure.existsSync(filePath)) {
//         // Delete the file
//         fileStructure.unlink(filePath, (error) => {
//             if (error) {
//                 console.error('An error occurred while deleting the file:', error);
//             } else {
//                 console.log('The file has been deleted successfully.');
//             }
//         });
//     } else {
//         console.log('The file does not exist.');
//     }
// }

// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client|null>}
//  */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }

// /**
//  * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client) {
//   const content = await fs.readFile(CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: 'authorized_user',
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
// async function authorize(scope) {
//     deleteFile(TOKEN_PATH);
//     let client = await loadSavedCredentialsIfExist();
//     if (client) {
//         return client;
//     }
//     client = await authenticate({
//         scopes: scope,
//         keyfilePath: CREDENTIALS_PATH,
//     });
//     if (client.credentials) {
//         await saveCredentials(client);
//     }
//     return client;
// }

// /**
//  * Lists the next 10 events on the user's primary calendar.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// async function listEvents(auth) {
//   const calendar = google.calendar({version: 'v3', auth});
//   const res = await calendar.events.list({
//     calendarId: 'primary',
//     timeMin: new Date().toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: 'startTime',
//   });
//   const events = res.data.items;
//   if (!events || events.length === 0) {
//     console.log('No upcoming events found.');
//     return;
//   }
//   console.log('Upcoming 10 events:');
//   events.map((event, i) => {
//     const start = event.start.dateTime || event.start.date;
//     console.log(`${start} - ${event.summary}`);
//   });
// }

// // Refer to the Node.js quickstart on how to setup the environment:
// // https://developers.google.com/calendar/quickstart/node
// // Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// // stored credentials.

// const event = {
//     'summary': 'Google I/O 2023',
//     'location': '800 Howard St., San Francisco, CA 94103',
//     'description': 'A chance to hear more about Google\'s developer products.',
//     'start': {
//       'dateTime': '2023-06-28T09:00:00-07:00',
//       'timeZone': 'America/Los_Angeles',
//     },
//     'end': {
//       'dateTime': '2023-06-29T17:00:00-07:00',
//       'timeZone': 'America/Los_Angeles',
//     },
//     'recurrence': [
//       'RRULE:FREQ=DAILY;COUNT=2'
//     ],
//     'attendees': [
//       {'email': 'lpage@example.com'},
//       {'email': 'sbrin@example.com'},
//     ],
//     'reminders': {
//       'useDefault': false,
//       'overrides': [
//         {'method': 'email', 'minutes': 24 * 60},
//         {'method': 'popup', 'minutes': 10},
//       ],
//     },
// };
//   /**
//  * create event on the user's primary calendar.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function createEvent(auth){
//     const calendar = google.calendar({version: 'v3', auth});
//     calendar.events.insert({
//         auth: auth,
//         calendarId: 'primary',
//         resource: event,
//         }, function(err, event) {
//             if (err) {
//                 console.log('There was an error contacting the Calendar service: ' + err);
//                 return;
//             }
//             console.log('Event created: %s', event.htmlLink);
//         }
//     );
// };
// authorize(SCOPES[0]).then(createEvent).catch(console.error);
// // authorize(SCOPES[1]).then(listEvents).catch(console.error);




const appointment = new Appointment();
export default appointment;