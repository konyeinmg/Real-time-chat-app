import React, { useState, useEffect } from 'react';

const Chat = ({socket, username, room}) => {
    const [currentMessage, setCurrentMessage] = useState("");
//    const [sentMessage, setSentMessage] = useState();

    useEffect( () => {
         socket.off("receive_message").on("receive_message", async (data) => {
           // console.log("effect");
            await console.log(data);
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
        }
    };

    /*socket.on("receive_message", (data) => {
        setSentMessage(data);
    })*/

    return (
        <div>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body'></div>
            <div className='chat-footer'>
                <input type="text" placeholder='Hey...' onChange={(e) => {setCurrentMessage(e.target.value)}} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;