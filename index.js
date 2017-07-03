var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json());

app.set('proxy_token', (process.env.PROXY_TOKEN || ''));
app.set('base_uri', (process.env.BASE_URI || 'https://graph.facebook.com'));
app.set('port', (process.env.PORT || 5000));
app.set('verify_token', (process.env.VERIFY_TOKEN || 'TEST'));
app.set('page_access_token', (process.env.PAGE_ACCESS_TOKEN || 'NULL'));

app.get('/', function (req, res) {
  res.send('It works!');
});

app.get('/messenger/webhooks', function (req, res) {
  if (req.query['hub.verify_token'] === app.get('verify_token')) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

app.post('/messenger/webhooks', function (req, res) {
  console.log (req.body);
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      sendTextMessage(sender, text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: app.get('base_uri') + '/v2.6/me/messages',
    qs: {access_token:app.get('page_access_token')},
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Proxy-Token': app.get('proxy_token')
    },
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
