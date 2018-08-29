const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let buzzwords = {
  buzzWords: [],
};

let currentScore = {
  'success': null,
   newScore: 0,
};

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.render('index');
});

app.get('/buzzwords', (req,res) => {
  res.send(buzzwords);
});

app.post('/buzzwords', (req, res) => {
  let checkBuzzword = req.body.buzzword;
  let currentArray = buzzwords.buzzWords;
  let test = currentArray.filter(filterBuzzwords);

  if(test.length > 0){
    res.send({ "success": false });
  }

  if(test.length === 0){
  let score = req.body.score;
  let convertToNumber = Number(score);
  req.body.score = convertToNumber;
  buzzwords.buzzWords.push(req.body);
  res.send({ "success": true });
  }

  function filterBuzzwords(item){
    if(item.buzzword === checkBuzzword){
      return true;
    }
  }

});

app.put('/buzzwords', (req,res) =>{
  let checkBuzzword = req.body.buzzword;
  let currentArray = buzzwords.buzzWords;
  let test = currentArray.filter(filterBuzzwords);

  if(test.length === 0){
    currentScore.success = false;
    res.send(currentScore);
  }

  if(test.length > 0){
    test[0].heard = true;
    currentScore.success = true;
    currentScore.newScore += test[0].score;
    res.send(currentScore);
  }

  function filterBuzzwords(item){
    if(item.buzzword === checkBuzzword){
      return true;
    }
  }
});

app.delete('/buzzwords', (req, res) => {
  let checkBuzzword = req.body.buzzword;
  let currentArray = buzzwords.buzzWords;
  let test = currentArray.filter(filterBuzzwords);

  if(test.length === 0){
    res.send({ "success": false });
  }

  if(test.length > 0){
    currentScore.newScore -= test[0].score;
    let hello = currentArray.map(function(e){
      return e.buzzword;}).indexOf(checkBuzzword);

    let removeWord = buzzwords.buzzWords.splice(hello,1);
    res.send({ "success": true });
  }

  function filterBuzzwords(item){
    if(item.buzzword === checkBuzzword){
      return item;
    }
  }

});

app.post('/reset', (req, res)=>{
  buzzwords.buzzWords = [];
  currentScore.newScore = 0;
  res.send({ "success": true });
});

let server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log('server is on');
});