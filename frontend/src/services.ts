const API = (url) => fetch(url).then(res => res.json());

export const getMessages = () =>
	API("/api/getMessages");

export const sendMessage = (author: string, text: string) =>
	API(`/api/sendMessage?text=${encodeURI(text)}&author=${encodeURI(author)}`);