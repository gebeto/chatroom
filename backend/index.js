// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/static', express.static('static'))


// app.get('/', (req, res) => {
// 	res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>ChatRoom</title></head><body><script src="/static/main.js"></script></body></html>`);
// });

// app.get('/api/', (req, res) => {
// 	res.send({
// 		express: 'Hello From Express'
// 	});
// });


// app.listen(port, () => console.log(`Listening on port ${port}`));
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

let counter = 1;

module.exports = (req, res) => {
	if (req.query.author && req.query.text) {
		const message = identifyMessage(req.query);
		messages.push(message);
		res.json(message);
		res.end();
		return;
	}
	res.send({
		response: `Hi ${counter++}!`,
		messages: messages,
	});
	res.end();
}