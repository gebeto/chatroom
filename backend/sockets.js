var path = require('path')
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(444);

function sendFile(req, res, path) {
	return function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end(`Error loading ${path}`);
		}

		res.writeHead(200);
		res.end(data);
	}
}

function handler (req, res) {
	console.log(req.url);
	if (req.url === '/static/main.js') {
		fs.readFile(path.resolve(__dirname, '../frontend/dist', 'main.js'), sendFile(req, res, 'main.js'));
	} else if (req.url === '/static/main.css') {
		fs.readFile(path.resolve(__dirname, '../frontend/dist', 'main.css'), sendFile(req, res, 'main.css'));
	} else {
		fs.readFile(path.resolve(__dirname, '../frontend/', 'index.html'), sendFile(req, res, 'index.html'));
	}
}

io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});