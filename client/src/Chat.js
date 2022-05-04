import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({socket, username, room}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    useEffect( () => {
         socket.off("receive_message").on("receive_message", async (data) => {
           // console.log("effect");
            await setMessageList((list) => [...list, data]);
        })
    }, [socket])  

    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    /*socket.on("receive_message", (data) => {
        setSentMessage(data);
    })*/

    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                {messageList.map((messageContent) => {
                    return (
                        <div className='message' id={messageContent.author === username ? "other" : "you"}>
                            <div>
                                <div className='message-content'>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className='message-meta'>
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input type="text" placeholder='Hey...' value={currentMessage} onChange={(e) => {setCurrentMessage(e.target.value)}} onKeyPress={(e) => {e.key === "Enter" && sendMessage();}}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;