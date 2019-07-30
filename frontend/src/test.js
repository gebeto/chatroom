const DOM_STRINGS = {
    chatForm: '.chat-form',
    chatBox: '.chat-textarea',
    emoteList: '.chat-emotelist',
    emotesButton: '.chat-button--emote',
    emoteItem: '.emote-item',
    messages: '.messages',
    emoteListActive: 'chat-emotelist--active'
}
//Create a random user-id for a visitor
const userId = Math.round(Math.random() * 1000);

const EMPTY_STRING = "";
//I need to use a QUEUE instead
//Replaces each instance of an emote name with an img tag containing the emote src
function replaceEmoteNameWithImgDOM(text) {
    const textArr = text.split(' ');
    const formattedTextArr =  textArr.map(word => {
        if(word === EMPTY_STRING) return EMPTY_STRING;
        if(global_emotes[word]) {
            return(
                `<img
                    class="message-emote" 
                    src="https://static-cdn.jtvnw.net/emoticons/v1/${global_emotes[word].id}/1.0"
                    data-emotename=${word} 
                    alt="${word}"
                />`
            );
        }
        return word;
    });
    return formattedTextArr.join(' ');
}

function appendMessageToMessageList(text) {
    const messages = document.querySelector(DOM_STRINGS.messages)
    const messageDOM = 
    `
    <div class="message">  
        <span class="message-username">codepen-user-${userId}:</span>
        <span class="message-text">${replaceEmoteNameWithImgDOM(text)}</span>
    </div>
    `;
    messages.insertAdjacentHTML('beforeend', messageDOM);
    messages.scrollTop = messages.scrollHeight;
    // messages.scrollTop = messages.scrollHeight;
    // messages.scrollTop = messages.scrollHeight;
}

function handleFormSubmit(event) {
    event.preventDefault();
    const text = document.querySelector(DOM_STRINGS.chatBox).value;
    if(text.length === 0) return;
    appendMessageToMessageList(text);
    window.navigator.vibrate(10);
    this.reset();
    
}

function handleEmoteClick(event) {
    if(event.target === this) return;
    
    const emoteName = event.target.dataset['emotename'];
    updateTextArea(emoteName);
    window.navigator.vibrate(10);
}

function updateTextArea(txt) {
    document.querySelector(DOM_STRINGS.chatBox).value += ` ${txt} `;
}
//Handles Emote Button Click
function handleEmotesButton(event) {
    const emote_list = document.querySelector(DOM_STRINGS.emoteList);
    emote_list.classList.toggle(DOM_STRINGS.emoteListActive);
    return;
}

//Adds Emote to Emote Box
function appendEmoteToEmoteBox(emote) {
    const emote_list = document.querySelector(DOM_STRINGS.emoteList);
    const {code, id} = emote;
    const emote_elem = 
       ` <li class="emote-item" data-emotename=${code}>
             <img 
                class="emote-image"
                src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0"
                data-emotename=${code}
                alt="${code}"
             />
         </li>
      `;
    emote_list.insertAdjacentHTML('beforeend', emote_elem);
    
}

function addEmotesToEmotesList() {
    for(let emote_name in global_emotes) {
        appendEmoteToEmoteBox(global_emotes[emote_name])
    }
}

function setupEventListeners() {
    //Listen for Emote Button Click
    document.querySelector(DOM_STRINGS.emotesButton)
        .addEventListener('click', handleEmotesButton)
    //Listen for Emote Img Click in emote list
    document.querySelector(DOM_STRINGS.emoteList)
        .addEventListener('click', handleEmoteClick);
    //Handle form on submit
    document.querySelector(DOM_STRINGS.chatForm)
        .addEventListener('submit', handleFormSubmit);
}

function init() {
    setupEventListeners();
    addEmotesToEmotesList();
    const messages = document.querySelector(DOM_STRINGS.messages);
    messages.scrollTop = messages.scrollHeight;
}

window.onload = init;
