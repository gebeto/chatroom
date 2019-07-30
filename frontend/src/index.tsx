console.log('ENV:', NODE_ENV);

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import cn from 'classnames';
import store from './store/';

import './index.scss';


class InputForm extends React.Component<any, any> {
	input = null;
	state = {
		text: "",
		author: "admin",
		loading: false,
	}

	onFieldChange = (e) => {
		const { name, value } = e.target;
		this.setState(state => ({
			[name]: value,
		}));
	}

	onSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
		this.setState(state => ({ loading: true }));
		fetch(`/messages?text=${encodeURI(this.state.text)}&author=${encodeURI(this.state.author)}`)
			.then(res => res.json())
			.then(json => {
				this.props.onMessageSent && this.props.onMessageSent(json);
				this.setState(state => ({ text: "", author: "admin", loading: false }), () => {
					this.input.focus();
				});
			}).catch(err => {
				this.setState(state => ({ loading: false }), () => {
					this.input.focus();
				});
			});
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} className="chat-form">
				<input disabled={this.state.loading} ref={ref => this.input = ref} autoComplete="off" className="chat-textarea scroll-style" name="text" onChange={this.onFieldChange} value={this.state.text} />
				<div className="chat-buttons">
					<div className="chat-button chat-button--emote"><i className="far fa-grin"></i></div>
					<button type="submit" className="chat-button chat-button--submit">Chat</button>
				</div>
				<div className="chat-emotelist scroll-style"></div>
			</form>
		);
	}
}


const Message = ({ author, children }) => (
	<div className="message">
		<span className="message-username message-username--admin">{author}:</span>
		<span className="message-text">{children}</span>
	</div>
);


class App extends React.Component<any, any> {
	container: HTMLElement = null;
	state = {
		messages: [],
	};

	componentDidMount() {
		fetch("/messages").then(res => res.json()).then(json => {
			this.setState(state => ({
				...state,
				...json,
			}));
		});
	}

	onMessageSent = (message) => {
		this.setState(state => ({
			...state,
			messages: [
				...state.messages,
				message,
			].sort((a, b) => a.id - b.id),
		}), () => {
			console.dir(this.container);
			this.container.scrollTo(0, this.container.scrollHeight);
		});
	}

	render() {
		return (
			<div className="chat-container">
				<div className="chat-actions">
					<InputForm onMessageSent={this.onMessageSent} />
				</div>
				<ul className="messages scroll-style" ref={ref => this.container = ref}>
				{this.state.messages.map(message =>
					<Message key={message.id} author={message.author}>{message.text}</Message>
				)}
				</ul>
			</div>

		);
	}
}


const element = document.createElement("div");
document.body.appendChild(element);


render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	),
	element
);

