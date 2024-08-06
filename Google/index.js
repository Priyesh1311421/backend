const express = require('express');
const { google } = require('googleapis');

const app = express();

app.get('/' ,async (req,res) =>{
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({version:'v4', auth:client});

    const spreadsheetId = '16kQI7Gd2jtLiFWOX4HBpDNmIc1OyXgfi8tz9NGrN0QQ'

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })


    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range:'Database',
        
    })

    res.send(getRows.data.values);
});

app.listen(3000,(req,res)=>{console.log('running on 3000')});