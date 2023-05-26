const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

const API_KEY = '12a6a10c9bcda3f8591aeb08d44a22b6';
const TOKEN = 'ATTAccbee9b042a522c0edf699c6de029f8212db5231f335cb1e0b9881169ddd0eba07FD9C42';
const LIST_ID = '646f41ddc2a3ad1c255fa29e'
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/create-card', (req, res) => {
  const { name, description, dueDate, startDate } = req.body;
  console.log(name,description,dueDate,startDate)

  // Creating the Trello Card By using POST METHOD in the Trello API
  axios.post(`https://api.trello.com/1/cards?key=${API_KEY}&token=${TOKEN}&idList=${LIST_ID}`, {
    name,
    desc: description,
    start: new Date(startDate).toISOString(),
    due: new Date(dueDate).toISOString()
  })
  .then(response => {
    res.send({ success: true, cardId: response.data.id });
  })
  .catch(error => {
    console.log(error.message)
    res.send({ success: false, message: 'Trello Card is Not Created' });
    
  });
});


// Listening on the Port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
