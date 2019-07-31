import * as React from 'react';
import { sendMessage } from '../services';


class MessageForm extends React.Component<any, any> {
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
		sendMessage(this.state.author, this.state.text).then(json => {
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


export default MessageForm;