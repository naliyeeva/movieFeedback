import {fileURLToPath} from 'url'
import express from "express"
import path from "path"
import mongoose from 'mongoose'
import bodyParser from 'body-parser'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


mongoose.connect('mongodb://localhost:27017/moviefeedback');


const db = mongoose.connection;

const clearData = (text) => {
      return text.replace(/<script[^>]*>(?:(?!<\/script>)[^])*<\/script>/g, "")
}
 
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  
  console.log("Connection Successful!");

});

  const movie_feedback_schema = mongoose.Schema({
    rate: Number,
    email: String,
    feedback_text: String
  });


  app.post('/getFeedback', (req, res) => {

    let rate = req.body.rate;
    let email = req.body.email; 
    let feedback_text = clearData(req.body.feedback_text);

    res.json(
      {status: 1}
    )

    
    let movie_feedback = mongoose.model('movieFeedback', movie_feedback_schema, 'feedbackFromUser');

    
    let feedbackData = new movie_feedback({ rate: rate, email: email, feedback_text: feedback_text });
    
    
    feedbackData.save(function (err, user) {
      if (err) return console.error(err);
      console.log(user + " saved to db");
    });

  })
  

app.set('view engine', 'ejs');

app.get('/insert', (req, res) => {

  res.send("success")

})

app.get('/', (req, res) => {

  res.render('pages/index');
  
});


app.get('/movies', (req, res) => {

  res.render('pages/movies');

});

app.get('/feedback', (req, res) => {

  res.render('pages/feedback');

});

app.get('/index', (req, res) => {

  res.render('pages/index');

});

app.get('/info', (req, res) => {

  res.render('pages/info');

});

app.get('/movie_list', (req, res) => {

  res.render('pages/movie_list');

});

app.get('/genre', (req, res) => {

  res.render('pages/genre');

});

app.get('/contacts', (req, res) => {

  res.render('pages/contacts');

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static(__dirname + '/public'));

