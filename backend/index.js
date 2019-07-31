const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('../frontend/dist'));


function createIdentifier(start) {
	let index = start || 0;
	return function identify(item) {
		item.id = ++index;
		return item;
	};
}

const identifyMessage = createIdentifier();
const messages = [
	{
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
		author: "carlosdlroca",
	},
	{
		text: "Lorem ipsum dolor sit amet",
		author: "carlosdlroca",
	},
	{
		text: "Hope you like my codepen",
		author: "carlosdlroca",
	},
	{
		text: "I worked a bit to make this",
		author: "carlosdlroca",
	},
	{
		text: "Twitch inspired",
		author: "carlosdlroca",
	},
	{
		text: "Kappa123",
		author: "carlosdlroca",
	},
	{
		text: "Hello world",
		author: "carlosdlroca",
	},
	{
		text: "Welcome to my Twitch chat codepen",
		author: "carlosdlroca",
	},
	{
		text: "Add some words",
		author: "carlosdlroca",
	},
	{
		text: "Then add some emotes",
		author: "carlosdlroca",
	},
	{
		text: "and submit",
		author: "carlosdlroca",
	},
];
messages.forEach(identifyMessage);


app.get('/', (req, res) => {
	res.send(`<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<title>Chatroom</title>
	<link rel="stylesheet" href="/static/main.css">
</head>
<body>
	<script src="/static/main.js"></script>
</body>
</html>
`);
});

io.on('connection', function (socket) {
	console.log('SOCKET CONNNNECTED!!!!!');
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});

app.get('/api/getMessages', (req, res) => {
	res.send({
		messages: messages,
	});
});

app.get('/api/sendMessage', (req, res) => {
	if (!req.query.author || !req.query.text) {
		return res.json({
			error: true
		});
	}

	const message = identifyMessage(req.query);
	messages.push(message);
	return res.json(message);
});


app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;