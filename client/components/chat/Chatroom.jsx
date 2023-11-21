import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../../context/LoginContext";
import MessageInput from "./MessageInput";

function Chatroom(){

    const {user} = useContext(LoginContext);
    const {username} = useContext(LoginContext);
    const [messages, setMessages] = useState([])
    const [room, setRoom] = useState();

    const { roomName } = useParams();
    console.log("Roomname in chatroom = ", roomName, room)

    async function fetchRoom(){
        const res = await fetch(`/api/chat/getRoom/${roomName}`, )
        const data = await res.json();
        console.log("Data = room = ", data)

        if (res.ok && data) {
            console.log("setting room")
            console.log(data)
            setRoom(data);
            fetchMessages();
        } else {
            console.log("Did not find room");
        }

    }

    useEffect(() => {
        fetchRoom()
    }, []);

    async function fetchMessages(){

        const res = await fetch(`/api/chat/getAllMessages/${roomName}`, {

        })
        const msg = await res.json();
        console.log("MSG = ", msg.messages)

        if (res.ok){
            setMessages(msg.messages);
        } else {
            console.log("Did not retrieve messages")
        }

    }



    return (
        <>
            {username ? (
                <div className={"message-board"}>
                    {room ? (
                        <>
                            <div className="message-board">
                                <h2>Chatroom: {room.room.roomName}</h2>
                                <div className="messageList">
                                    {messages.map((message, index) => (
                                        <div className="message-container" key={index}>
                                            <p className="message-line">{message.username} : {message.message}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="message-input">
                                    <label htmlFor="messageInput"></label>
                                    <MessageInput room={room} />
                                </div>
                                <div className="button-container">
                                    <Link to={"/chat/new"}>
                                        <button>New chat</button>
                                    </Link>
                                </div>
                            </div>


                        </>
                    ) : (
                        <p>Loading room...</p>
                    )}

                </div>
            ) : (
                <h2>Login to see chatroom</h2>
            )}
        </>
    );


}
export default Chatroom;