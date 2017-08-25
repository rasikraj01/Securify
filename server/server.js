const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;


app.use(bodyParser.json());
//HOME
app.get('/', function (req, res) {
   res.send('hello');
});

app.listen(PORT, () => {
   console.log(`Sever running on PORT ${PORT}`);
});
