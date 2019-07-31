import * as React from 'react';


const Message = ({ author, children }) => (
	<div className="message">
		<span className="message-username message-username--admin">{author}:</span>
		<span className="message-text">{children}</span>
	</div>
);


export default Message;