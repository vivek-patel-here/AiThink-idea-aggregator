import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CloseIcon from '@mui/icons-material/Close';
import "./Chats.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useGlobalContext } from "../../GlobalContext";
import { useRef } from "react";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown"; 
import { ClipLoader } from "react-spinners";

function Chats() {
    const [active, setActive] = useState(false);
    const socketRef = useRef(null);
    const { activeChatId, url, fetchChats, setMessages,wait, setWait } = useGlobalContext();
    

    useEffect(() => {
        fetchChats();
        socketRef.current = io(`${url}`, {
            withCredentials: true,
        });

        socketRef.current.emit("chat_init", { id: activeChatId });

        socketRef.current.on("llm_response", (msg) => {
            setWait(false);
            setMessages((prev) => {
                return [...prev, { role: "bot", message: msg }];
            });
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [activeChatId]);

    return (
        <>
            <Navbar />

            <div className="chat">
                <SideBar active={active} setActive={setActive} />
                {!active && <ChevronRightIcon className="icon" onClick={() => setActive(true)} />}
                <div className="chat-main">
                    <MessagePanel />
                    <InputBox socketRef={socketRef} />
                </div>
            </div>

            <Footer />
        </>
    );
}

function SideBar({ active, setActive }) {
    const { chats, activeChatId, url, setActiveChatId, setMessages,setChatType,chatType } = useGlobalContext();
    const fetchPrevChat = async (id) => {
        setActiveChatId(id);
        setChatType(false);
        try {
            const response = await fetch(`${url}/chat/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            })

            const parsedResp = await response.json();

            if (!parsedResp.success || !response.ok) {
                return console.log(parsedResp.message);
            }
            setMessages(parsedResp.chat?.messages ?? []);
        }
        catch (err) {
            console.error(err);
        }
    }


    return (
        <aside className={active ? "sidebar open" : "sidebar"}>
            <div className="sidebar-header">
                <h3>Chats</h3>
                <CloseIcon className="icon" onClick={() => setActive(false)} />
            </div>
            <ul>
                <li className={chatType?"active":""} onClick={()=>setChatType(true)}>General</li>
                {chats.map((chat) => {
                    return <li key={chat.id} className={(chat.id === activeChatId) && !chatType  ? "active" : ""} onClick={() => fetchPrevChat(chat.id)}>{chat?.title}</li>
                })}
            </ul>
        </aside>

    );
}

function MessagePanel() {
    const { messages,setChatType,chatType } = useGlobalContext();
    // useEffect(()=>{
    //     console.log(messages);
    // },[activeChatId])
 
    return (
        <div className="messages">
            {
                !chatType && messages.map((msg, idx) => {
                    return msg.role === "bot" ? <div key={idx} className= "message received"><ReactMarkdown>{msg.message}</ReactMarkdown></div>:<div key={idx} className= "message sent">{msg.message}</div>
                })
            }
        </div>
    );
}

function InputBox({ socketRef }) {
    const { setMessages, activeChatId,wait, setWait } = useGlobalContext();
    const [query, setQuery] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (query.trim() === "") return;
        if (wait) return;
        setMessages((prev) => {
            return [...prev, { role: "user", message: query }];
        });
        setWait(true);
        socketRef.current.emit("user_query", { id:activeChatId, query });
        setQuery("");
    };
    return (
        <form onSubmit={onSubmitHandler} className="input-box">
            <input type="text" placeholder="Type your message..." value={query} onChange={(e) => setQuery(e.target.value)} />
           {wait?<ClipLoader
        color={"white"}
        loading={wait}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />: <button>Send</button>}
        </form>
    );
}

export default Chats;
