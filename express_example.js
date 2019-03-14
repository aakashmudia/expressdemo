    var express = require('express');
	var cookieParser = require('cookie-parser');	
	var mongoose = require('mongoose');
    var app = express(); 
	
// Database connection code	
	
	var db = 'mongodb://127.0.0.1/userinfo';
	mongoose.connect(db);
	var User2 = require('./Book');
	
// Database connection code	
	app.use(express.static('upload'));
	
	app.use(cookieParser());
	var bodyParser = require('body-parser'); 
	var urlencodedParser = bodyParser.urlencoded({ extended: false }) 
	
	app.get('/staticfiledemo', function (req, res) { 
		
		app.set('view engine', 'pug');
		app.set('views','./views');
		res.render('staticfiledemo');
	   
    }) 
		
    app.get('/', function (req, res) { 
	
	   res.send('Welcome to Express js Tutorial Guide and functional testing'); 
    }) 
	
	 app.get('/cookie', function (req, res) { 
		res.clearCookie('name');
		res.cookie('name', 'Aakash'); 
		res.status(200).send('Cookie is set'); 
    }) 
	
	app.get('/cookieget', function(req, res) {  
		console.log("req Cookies :  ", req.cookies);  
		res.status(200).send(req.cookies);  
	});
	
	
	
    

	app.get('/home', function (req, res) { 
	    //res.attachment(__dirname + '/upload/IMG_20160506_171159.jpg');
       res.send('Welcome to Home page1');  
    })

	app.get('/google', function (req, res) { 
       res.redirect('https://www.google.co.in/');  
    })		
	
	app.get('/download', function(req, res){
	  var file = __dirname + '/upload/camahotel.pdf';
	  res.download(file); // Set disposition and send it.
	})
	
	app.get('/showdata', function(req, res){
		User2.find(function(err, response){
			//res.json(response);

			//app.set('view engine', 'ejs');// for support ejs file
			//res.render('home',{data:'test'});
			
			//setting for support html file
			app.engine('html', require('ejs').renderFile);
			app.set('view engine', 'html');
			//setting for support html file

			res.render('homeview',{data:response});
		});
	})
	
	app.get('/edit/:id', function(req, res){
	  var query = { '_id' : req.params.id };
		User2.findOne(query, function(err, response) {
			app.engine('html', require('ejs').renderFile);
			app.set('view engine', 'html');
            res.render('updateview',{data:response});
            //res.send(response);
        });
	})
	
	app.post('/updatedata/:id',urlencodedParser, function(req, res){
		User2.findOneAndUpdate({_id: req.params.id}, {
				$set: {
				  first_name: req.body.first_name,
				  last_name: req.body.last_name,
				  password : req.body.password
				}
			  }, (err, result) => {
				if (err) return res.send(err)
				res.redirect('/showdata');
			  })
	 
	})
	
	app.get('/delete/:id', function(req, res){
		User2.remove({_id: req.params.id}, (err, result) => {
				if (err) return res.send(err)
				res.redirect('/showdata');
			  })
	 
	})
	
	
	
	app.get('/viewform', function(req, res){
	  res.sendFile( __dirname + "/" + "index.html" ); // for display form from html file
	})
	
	app.get('/process_get', function (req, res) { 
// for database save code //
		var myData = new User2(req.query);
		 myData.save()
		 .then(item => {	 
				res.send("item saved to database <br> <a href='/showdata'>Show Table Data!</a>");
		 })
		 .catch(err => {
				res.status(400).send("unable to save to database");
		 });

// for database save code //

// for display get parameter code //
	
		//res.send('<p>Username: ' + req.query['first_name']+'</p><p>Lastname: '+req.query['last_name']+'</p>');  
	/*	response = {  
			   first_name:req.query.first_name,  
			   last_name:req.query.last_name,
			   password:req.query.password 
		};  
	   console.log(response);  
	   res.end(JSON.stringify(response));  */
// for display get parameter code //	   
	   
	})  

	app.get('/viewform2', function(req, res){
	  res.sendFile( __dirname + "/" + "index2.html" ); // for display form from html file
	})
	
	app.post('/process_post',urlencodedParser, function (req, res) {   
		response = {  
			   first_name:req.body.first_name,  
			   last_name:req.body.last_name,
			   password:req.body.password
		};  
	   console.log(response);  
	   res.end(JSON.stringify(response));  
	})  
	
	app.get('*', function(req, res){
	   res.status(404).send('Sorry, this is an invalid URL.');
	});

	var server = app.listen(8000, function () {  
    var host = server.address().address  
      var port = server.address().port  
     console.log("Example app listening at http://%s:%s", host, port)  
    }) 
	