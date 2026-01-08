import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {ChevronLeft, Trash2 } from "lucide-react" ; 
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useGlobalContext } from "../../GlobalContext";
import { useRef } from "react";
import { io } from "socket.io-client";
import ReactMarkdown from "react-markdown";
import { ClipLoader } from "react-spinners";
import clsx from "clsx";

function Chats() {
    const [active, setActive] = useState(true);
    const socketRef = useRef(null);
    const { activeChatId, url, fetchChats, setMessages, wait, setWait } = useGlobalContext();


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
            <main className="pt-16 min-h-screen  text-neutral-200 flex">
                <SideBar active={active} setActive={setActive} />
                {!active && (
                    <button
                        onClick={() => setActive(true)}
                        className="fixed left-3 top-24 z-20 p-2 rounded-xl md:hidden bg-neutral-900 border border-white/10">
                        <ChevronRightIcon />
                    </button>
                )}
                <section className="flex-1 flex flex-col max-h-[calc(100vh-80px)]">
                    <MessagePanel />
                    <InputBox socketRef={socketRef} />
                </section>
            </main>
            <Footer />
        </>
    );
}

function SideBar({ active, setActive }) {
    const { chats, activeChatId, url, setActiveChatId, setMessages, setChatType, chatType } = useGlobalContext();
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

    const DeleteChat = async(id)=>{
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
        <aside className={clsx("fixed md:static z-30  left-0 h-[calc(100vh-80px)] w-72 transition-transform",active ? "translate-x-0" : "-translate-x-full md:translate-x-0")}>
            <div className="h-full  backdrop-blur-2xl border-r border-white/10 flex flex-col">
                <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                    <h3 className="font-semibold text-lg">Chats</h3>
                    <ChevronLeft className="cursor-pointer md:hidden" onClick={() => setActive(false)} />
                </div>

                {/* Chat List */}
                <ul className="flex-1 overflow-y-auto p-3 space-y-1">
                    <li onClick={() => setChatType(true)}
                        className={clsx(
                            "px-3 py-2 rounded-xl cursor-pointer text-sm",
                            chatType
                                ? "bg-cyan-400/20 text-cyan-400"
                                : "hover:bg-white/10" )} >
                        💬 General
                    </li>

                    {chats.map((chat) => (
                        <li
                            key={chat.id}
                            onClick={() => fetchPrevChat(chat.id)}
                            className={clsx(
                                "px-3 py-2 rounded-xl cursor-pointer text-sm truncate flex items-center justify-between gap-2",
                                chat.id === activeChatId && !chatType
                                    ? "bg-violet-500/20 text-violet-400"
                                    : "hover:bg-white/10"
                            )}
                        >
                            {chat.title}
                            <Trash2 size={15} className="text-red-500" onClick={DeleteChat}/>
                        </li>
                    ))}
                </ul>

            </div>
        </aside>


    );
}

function MessagePanel() {
    const { messages, chatType } = useGlobalContext();
    return (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            {!chatType &&
                messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={clsx(
                            "max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed",
                            msg.role === "user"
                                ? "ml-auto bg-cyan-500/20 text-white"
                                : "mr-auto bg-neutral-800/80 text-neutral-200 border border-white/10"
                        )}>
                        {msg.role === "bot" ? (
                            <ReactMarkdown >
                                {msg.message}
                            </ReactMarkdown>
                        ) : (
                            msg.message
                        )}
                    </div>
                ))}
        </div>
    );
}

function InputBox({ socketRef }) {
    const { setMessages, activeChatId, wait, setWait } = useGlobalContext();
    const [query, setQuery] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (query.trim() === "") return;
        if (wait) return;
        setMessages((prev) => {
            return [...prev, { role: "user", message: query }];
        });
        setWait(true);
        socketRef.current.emit("user_query", { id: activeChatId, query });
        setQuery("");
    };
    return (
        <form
            onSubmit={onSubmitHandler}
            className="p-4 border-t border-white/10 bg-neutral-900/70 backdrop-blur-xl"
        >
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Ask anything..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 backdrop-blur-2xl rounded-xl px-4 py-2
        outline-none text-sm border border-white/10"
                />

                {wait ? (
                    <ClipLoader size={20} color="white" />
                ) : (
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-sm font-medium
          bg-linear-to-r from-cyan-500 to-violet-500
          hover:opacity-90 transition"
                    >
                        Send
                    </button>
                )}
            </div>
        </form>
    );
}

export default Chats;
