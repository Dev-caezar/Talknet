import axios from "axios";
import { useState, useRef, useEffect } from "react"
import { Input, Empty } from "antd"
import { SearchOutlined, SendOutlined, ArrowLeftOutlined } from "@ant-design/icons"

// --- ConversationPanel Component (Mostly unchanged) ---
const ConversationPanel = ({
   conversations,
   filteredConversations,
   selectedConversationId,
   searchQuery,
   onSearchChange,
   onSelectConversation,
   primaryPurple,
   // New prop for Mobile: to explicitly switch to the MessageArea
   onSelectConversationMobile,
}) => (
   // Updated: w-full on mobile, fixed width on desktop
   <div className="w-full sm:w-[300px] bg-white p-4 rounded-xl shadow-md flex flex-col h-full">
      <Input
         placeholder="Search conversations..."
         prefix={<SearchOutlined style={{ color: primaryPurple }} />}
         className="mb-6 p-2 rounded-lg"
         style={{ backgroundColor: "#f3f4f6", borderColor: "#e5e7eb" }}
         value={searchQuery}
         onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="flex-1 overflow-y-auto">
         {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
               <div
                  key={conv.id}
                  onClick={() => onSelectConversationMobile(conv.id)} // Use the mobile selection handler
                  className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${selectedConversationId === conv.id
                     ? "bg-purple-100 border-l-4"
                     : "hover:bg-gray-100"
                     }`}
                  style={selectedConversationId === conv.id ? { borderLeftColor: primaryPurple } : {}}
               >
                  <h3 className="font-semibold text-gray-800 text-sm">{conv.name}</h3>
                  <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                  <p className="text-xs text-gray-400 mt-1">
                     {conv.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
               </div>
            ))
         ) : (
            <Empty
               image={Empty.PRESENTED_IMAGE_SIMPLE}
               description={<span className="text-gray-500">No conversations found</span>}
            />
         )}
      </div>
   </div>
)

// --- MessageArea Component (Updated with back button) ---
const MessageArea = ({
   selectedConversation,
   messageInput,
   onMessageInputChange,
   onSendMessage,
   onKeyPress,
   messagesEndRef,
   primaryPurple,
   inputRef,
   // New prop for Mobile: to go back to the conversation list
   onBackToConversations,
}) => {
   if (!selectedConversation) {
      return (
         <div className="flex-1 bg-white p-12 rounded-xl shadow-md flex justify-center items-center h-full">
            <div className="text-center text-gray-500">
               <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome to messages</h2>
               <p className="text-sm">Select a conversation to start messaging</p>
            </div>
         </div>
      )
   }

   return (
      <div className="flex-1 bg-white rounded-xl shadow-md flex flex-col h-full">
         <div className="border-b border-gray-200 p-4 flex items-center">
            {/* Back button visible only on mobile (sm:hidden) */}
            <button
               onClick={onBackToConversations}
               className="sm:hidden mr-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
               <ArrowLeftOutlined style={{ color: primaryPurple }} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">{selectedConversation.name}</h2>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedConversation.messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                  <div
                     className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === "You" ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                     style={msg.sender === "You" ? { backgroundColor: primaryPurple } : {}}
                  >
                     <p className="text-sm">{msg.text}</p>
                     <p
                        className={`text-xs mt-1 ${msg.sender === "You" ? "text-purple-100" : "text-gray-500"
                           }`}
                     >
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                     </p>
                  </div>
               </div>
            ))}
            <div ref={messagesEndRef} />
         </div>

         <div className="border-t border-gray-200 p-4 flex gap-2">
            <Input
               ref={inputRef}
               placeholder="Type a message..."
               value={messageInput}
               onChange={(e) => onMessageInputChange(e.target.value)}
               onKeyPress={onKeyPress}
               className="flex-1 p-2 rounded-lg"
               style={{ backgroundColor: "#f3f4f6", borderColor: "#e5e7eb" }}
            />
            <button
               onClick={onSendMessage}
               className="px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
               style={{ backgroundColor: primaryPurple }}
            >
               <SendOutlined />
            </button>
         </div>
      </div>
   )
}

// --- MessagePanel Component (Main Logic for Responsiveness) ---
const MessagePanel = () => {
   const primaryPurple = "#6b21a8"
   const messagesEndRef = useRef(null)
   const inputRef = useRef(null)

   const [conversations, setConversations] = useState([
      // ... (Your conversation data remains the same)
      {
         id: "1",
         name: "John Runner",
         lastMessage: "I completed the morning run",
         timestamp: new Date(Date.now() - 3600000),
         messages: [
            { id: "1", sender: "John Runner", text: "Hi, I wanted to check in", timestamp: new Date(Date.now() - 7200000) },
            { id: "2", sender: "You", text: "Hey John! How are you doing?", timestamp: new Date(Date.now() - 6900000) },
            {
               id: "3",
               sender: "John Runner",
               text: "I completed the morning run",
               timestamp: new Date(Date.now() - 3600000),
            },
         ],
      },
      {
         id: "2",
         name: "Sarah Athlete",
         lastMessage: "Thanks for the feedback!",
         timestamp: new Date(Date.now() - 7200000),
         messages: [
            {
               id: "1",
               sender: "Sarah Athlete",
               text: "Can you review my training plan?",
               timestamp: new Date(Date.now() - 10800000),
            },
            { id: "2", sender: "You", text: "Sure, looks great!", timestamp: new Date(Date.now() - 9000000) },
            {
               id: "3",
               sender: "Sarah Athlete",
               text: "Thanks for the feedback!",
               timestamp: new Date(Date.now() - 7200000),
            },
         ],
      },
      {
         id: "3",
         name: "Mike Coach",
         lastMessage: "See you at the track tomorrow",
         timestamp: new Date(Date.now() - 86400000),
         messages: [
            { id: "1", sender: "Mike Coach", text: "How was your workout?", timestamp: new Date(Date.now() - 172800000) },
            { id: "2", sender: "You", text: "Great! Feeling strong", timestamp: new Date(Date.now() - 169200000) },
            {
               id: "3",
               sender: "Mike Coach",
               text: "See you at the track tomorrow",
               timestamp: new Date(Date.now() - 86400000),
            },
         ],
      },
   ])

   const [selectedConversationId, setSelectedConversationId] = useState("1")
   const [searchQuery, setSearchQuery] = useState("")
   const [messageInput, setMessageInput] = useState("")

   // NEW STATE: Tracks if the MessageArea is visible on small screens
   const [isMessageAreaVisible, setIsMessageAreaVisible] = useState(false);

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
   }, [selectedConversationId, conversations])

   const filteredConversations = conversations.filter((conv) =>
      conv.name.toLowerCase().includes(searchQuery.toLowerCase())
   )

   const selectedConversation = conversations.find((c) => c.id === selectedConversationId)

   // NEW HANDLER: Selects conversation and shows MessageArea on mobile
   const handleSelectConversationMobile = (id) => {
      setSelectedConversationId(id);
      setIsMessageAreaVisible(true); // Switch view to MessageArea on mobile
   };

   // NEW HANDLER: Hides MessageArea and shows ConversationPanel on mobile
   const handleBackToConversations = () => {
      setIsMessageAreaVisible(false); // Switch view back to ConversationPanel
   };

   const handleSendMessage = async () => {
      if (!messageInput.trim() || !selectedConversation) return

      const newMessage = {
         id: Date.now().toString(),
         sender: "You",
         text: messageInput,
         timestamp: new Date(),
      }

      setConversations((prevConversations) =>
         prevConversations.map((conv) =>
            conv.id === selectedConversationId
               ? {
                  ...conv,
                  messages: [...conv.messages, newMessage],
                  lastMessage: messageInput,
                  timestamp: new Date(),
               }
               : conv
         )
      )

      setMessageInput("")
      inputRef.current?.focus()

      // ... (Your axios call remains the same)
      try {
         const token = localStorage.getItem("token")

         const payload = {
            receiverId: selectedConversation.id,
            text: messageInput,
         }

         await axios.post(
            "https://yourapi.com/api/v1/write/message",
            payload,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
               },
            }
         )
      } catch (error) {
         console.error("Error sending message:", error)
      }
   }

   const handleKeyPress = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault()
         handleSendMessage()
      }
   }

   return (
      <div className="w-full mx-auto h-full p-4"> {/* Added padding for overall layout */}
         <div className="flex gap-6 h-full">
            {/* 1. Conversation Panel */}
            <div className={`
                    // Mobile: Full width, conditionally visible (hidden if isMessageAreaVisible is true)
                    w-full 
                    ${isMessageAreaVisible ? 'hidden' : 'block'} 
                    
                    // Desktop (sm and up): Fixed width, always visible
                    sm:block sm:w-[300px] 
                `}>
               <ConversationPanel
                  conversations={conversations}
                  filteredConversations={filteredConversations}
                  selectedConversationId={selectedConversationId}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSelectConversation={setSelectedConversationId} // Original function for desktop
                  onSelectConversationMobile={handleSelectConversationMobile} // New function for mobile
                  primaryPurple={primaryPurple}
               />
            </div>

            {/* 2. Message Area */}
            <div className={`
                    // Mobile: Full width, conditionally visible (hidden if isMessageAreaVisible is false)
                    w-full 
                    ${!isMessageAreaVisible && selectedConversationId ? 'hidden' : 'block'} 
                    
                    // Desktop (sm and up): Takes remaining width, always visible (assuming a conversation is selected)
                    sm:flex-1
                `}>
               <MessageArea
                  selectedConversation={selectedConversation}
                  messageInput={messageInput}
                  onMessageInputChange={setMessageInput}
                  onSendMessage={handleSendMessage}
                  onKeyPress={handleKeyPress}
                  messagesEndRef={messagesEndRef}
                  primaryPurple={primaryPurple}
                  inputRef={inputRef}
                  onBackToConversations={handleBackToConversations} // New function for mobile back button
               />
            </div>
         </div>
      </div>
   )
}

export default MessagePanel