console.log('ENV:', NODE_ENV);

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import cn from 'classnames';
import store from './store/';

import { getMessages, sendMessage } from './services';

import Message from './components/Message';
import MessageForm from './components/MessageForm';

import './index.scss';


class App extends React.Component<any, any> {
	container: HTMLElement = null;
	state = {
		messages: [],
	};

	updateScroll = () => {
		this.container.scrollTo(0, this.container.scrollHeight);
	}

	componentDidMount() {
		getMessages().then(json => {
			this.setState(state => ({
				...state,
				...json,
			}), this.updateScroll);
		});
	}

	onMessageSent = (message) => {
		this.setState(state => ({
			...state,
			messages: [
				...state.messages,
				message,
			].sort((a, b) => a.id - b.id),
		}), this.updateScroll);
	}

	render() {
		return (
			<div className="chat-container">
				<div className="chat-actions">
					<MessageForm onMessageSent={this.onMessageSent} />
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

