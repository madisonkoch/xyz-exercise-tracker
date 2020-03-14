// 'require', aka install, express, handlebars and bodyparser for this app
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var bodyParser = require('body-parser');
var path = require('path');

// The app can process both urlencoded and json object data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Make the efault file type .handlebars
app.engine('handlebars', handlebars.engine);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'handlebars');

// Set port
//app.set('port', 3000)
//app.set('port', process.argv[2]);
app.set('port', process.env.PORT || 3000);

// Connect to MySQL database
var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'y5s2h87f6ur56vae.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user  : 'mc85gdvobt6hg0wf',
  password: 'z0qw5rsrnoa2cuj1',
  database: 'xkllsej1hmyxpxce'
});

// ROUTES //
app.post('/', function(req, res){
  var data = {};
  var date = new Date(req.body.year, req.body.month - 1 , req.body.day);

  if ( req.body.formType == 'input') {
    var insertSQL = "INSERT INTO Assignment6 SET name=?,reps=?,weight=?,unit=?,date=?";
    var insertValues = [req.body.name, parseInt(req.body.reps), parseInt(req.body.weight), req.body.unit, date.toISOString().slice(0,10)];
    pool.query(insertSQL,insertValues, function(err, result){
      if(err){
        console.log("Error: \n" + err);
      } else {
        data.result = "Inserted exercise: " + result.name;
        console.log(result);
      }
    });
  } else if ( req.body.formType == 'update' ) {
    console.log("Starting UPDATE");
    var updateSQL = "UPDATE Assignment6 SET name=?,reps=?,weight=?,unit=?,date=? WHERE id=?";
    var deleteValuesupdateValues = [req.body.name, parseInt(req.body.reps), parseInt(req.body.weight), req.body.unit, date.toISOString().slice(0,10), req.body.id];
    
    pool.query(updateSQL,updateValues, function(err, result){
      if(err){
        console.log("UPDATE Error: \n" + err);
      } else {
        data.result = "Successfully UPDATED exercise: " + result.name;
        console.log(data.result);
      }
    });
  } else if ( req.body.formType == 'delete' ) {
    console.log("Starting DELETE");
    var deleteSQL = "DELETE FROM Assignment6 WHERE id=?";
    var deleteValues = [req.body.id]

    pool.query(deleteSQL,deleteValues, function(err, result){
      if(err){
        console.log("DELETE Error: \n" + err);
      } else {
        data.result = "Successfully DELETED exercise: " + result.id;
        console.log(data.result);
      }
    });
  }


  console.log("Redirect to app.get('/') ");
  res.redirect('/');
});


app.get('/', function (req, res) {

  // For all states get # of votes and % of total votes
  var dataObj = {};
    var queryAsString = "SELECT	* FROM Assignment6";
    pool.query(queryAsString, function(err, rows, fields){
      if(err){
        console.log("Location app.get('/'): " + err);
        return;
      }
      dataObj.results = JSON.stringify(rows);
      dataObj.results = JSON.parse(dataObj.results);
      //console.log(dataObj);
      console.log(dataObj.results);

      //console.log(dataObj.results[0]);
      res.render('./home', dataObj);
    })
});

// Status 404 & 500 code copied from learning material examples
// based on the permission given in the assignment instructions
app.use(function (req, res) {
  res.status(404);
  res.render('404');
});

app.use(function (err, req, res, next) {
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate.');
});


