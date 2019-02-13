
fs = require('fs');
var obj = {

	table : {

	}

};
/*
obj.table = {'Jatin':{'password':'pswd','age':19,'credit-card':'3000 4000 5000 1000'}};

console.log(obj);

json = JSON.stringify(obj);
console.log(json);


fs.writeFile('data.json',json,function(err){
	console.log('success');
});

*/
fs.readFile('data.json','utf-8',function(err,da){


	console.log(da);
	obj = JSON.parse(da);
	console.log(obj);
	obj.table['Ajeet'] = {'password':'pas','age':20,'credit-card':'1511 0880 8810 9221','cvv':453,'validity':'11:11:26'};
	console.log(obj);
	da = JSON.stringify(obj);
	console.log(da);
	fs.writeFile('data.json',da,function(err){
		console.log('success');
	});

});
