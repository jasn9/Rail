
var http = require('http');
var fs = require('fs');
var ser = http.createServer(function(req,res){
	console.log('forwarding.........');
	res.writeHead(200,{'Content-type':'text/html'});
	//res.end('Hello World');
	var rStream = fs.createReadStream(__dirname+'/index.html','utf-8');
	rStream.pipe(res);

	// JSON data .....
	/*
	res.writeHead(200,{'Content-Type':'application/JSON'});
	var newObj = {
		name:'Jason',
		age:'19',

	};
	res.end(JSON.stringify(newObj));*/

});
ser.listen(8080,'127.0.0.1');

var io_event = require('events');

var event_emitter = new io_event.EventEmitter();

var one_event_handler = function(){

	console.log(' one key is pressed ');

}

event_emitter.on('pressed1',one_event_handler);


event_emitter.on('pressed2',function(){

	console.log(' two key is pressed ');
	// withou utf it is a buffer with char in hex
	fs.readFile('index.html','utf-8',function(err,data){

		console.log(data);

	});
	console.log('reading a file...');


});



event_emitter.emit('pressed1');
event_emitter.emit('pressed2');
/*
var events = require('events');
var eventEmitter = new events.EventEmitter();

//Create an event handler:
var myEventHandler = function () {
  console.log('I hear a scream!');
}

//Assign the event handler to an event:
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
eventEmitter.emit('scream');

*/