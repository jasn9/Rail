var fs = require('fs');
var exp = require('express');
var app = exp();

app.use(exp.json());       // to support JSON-encoded bodies
app.use(exp.urlencoded());
app.use(exp.static(__dirname+'/public'));
app.listen(8080);

app.set('view engine','ejs');

app.get('/test/:name',function(req,res){

	res.send(' This is test to the name '+req.params.name);

});
/*
app.get('/',function(req,res){

	res.sendFile(__dirname+'/index.html');

});*/

app.get('/profile/:name',function(req,res){

	data = {
		name:req.params.name,
	};
	res.render('profile_book',data);

});

app.get('/contact',function(req,res){

	qs = req.query;
	console.log(qs);
	res.render('contact_book',qs);

});

app.get('/',function(req,res){

	res.render('index1');

});

app.post('/login', function(req, res) {
    var un = req.body.username;
    var pswd = req.body.password;
    console.log(un);
    console.log(pswd);
    //let obj;
    var da = fs.readFileSync('data.json','utf-8');
    console.log(da);
    var obj = JSON.parse(da);
    console.log(obj);
    if(un in obj.table){
    	if(pswd==obj.table[un].password){
    	da = fs.readFileSync('scdat.json','utf-8');
    	var ob = JSON.parse(da);
    	console.log(ob.sc);
    	res.render('profile_book',data = {name:un,obj:ob});
    	}
    	else{
    		res.render('contact_book',data={name:"Unauthorized"});
    	}
    }
    else{
    	res.render('contact_book',data={name:"Unauthorized"});
    }
});

app.post('/book',function(req,res){
    var un = req.body.user;
	var src = req.body.sec;
	var dec = req.body.dec;
	var time = req.body.time;
	var da = fs.readFileSync('data.json','utf-8');
    var ob = JSON.parse(da);
    var da1 = fs.readFileSync('scdat.json','utf-8');
    var ob1 = JSON.parse(da1);
	console.log(src);
	console.log(dec);
	console.log(time);
    var t1 = 0;
    var t2 = 0;
	ob1.sc.forEach(function(item){

		if(item.szc==src){
			t1 = item.price; 
		}
		if(item.szc==dec){
			t2 = item.price;
		}

	});

	var t = t1 - t2;
	if(t<1){
		t = -t;
	}
	res.render('book',data = {user:un,cost:t});

});

app.post('/ticket', function(req,res){
	var un = req.body.user;
	var cc = req.body.cc;
	var cvv = req.body.cvv;
	var dat = req.body.date;
var da = fs.readFileSync('data.json','utf-8');
    var ob = JSON.parse(da);
    console.log(ob.table['Ajeet']);
    console.log(cc);
    console.log(cvv);
    console.log(dat);
    if(ob.table[un]["credit-card"] == cc && ob.table[un].cvv==cvv && ob.table[un].validity==dat){
    	res.render('suc');
    }
    else{
    	res.render('fail')
    }

});


app.get('/register',function(req,res){

	console.log('register');
	res.render('register');

});

app.post('/reg',function(req,res){

	var un = req.body.user;
	//var un = "Raghav";
	console.log(un);
	var pswd = req.body.passwd;
	var age = req.body.age;
	var cc = req.body.cc;
	var cvv = req.body.cvv;
	var date = req.body.date;
	var da = fs.readFileSync('data.json','utf-8');
    var ob = JSON.parse(da);
    ob.table[un] = {'password':pswd,'age':age,'credit-card':cc,'cvv':cvv,'validity':date};
    da = JSON.stringify(ob);
    fs.writeFile('data.json',da,function(err){
    	console.log(' Successfully registered ');
    });
    res.render('index1');

});