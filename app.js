const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('kanban');
});

app.get('/habits', (req, res) => {
  res.render('habits');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
