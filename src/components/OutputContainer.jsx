import { useChat } from "../context/customContext";

const OutputContainer = () => {
  const { messages, messageRef } = useChat();
  return (
    <div className="w-full max-w-3xl h-[70vh] overflow-y-auto bg-[#1B1E22] p-4 rounded-md mb-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-start gap-4 mb-2 ${
            msg.type === "user" ? "justify-end" : "justify-start"
          }`}>
          {msg.type === "bot" && (
            <i
              className="bx bxs-bot text-white text-2xl bg-[#31521E] p-3 rounded-full"
              aria-hidden="true"></i>
          )}
          {msg.type === "user" && (
            <i className="bx bxs-user text-black text-2xl ml-2 p-2 bg-white rounded-full"></i>
          )}
          <p
            className={`p-3 rounded-lg max-w-[70%] ${
              msg.type === "user"
                ? "bg-[#2F2F2F] text-white"
                : "bg-gray-800 text-white"
            }`}>
            {msg.text}
          </p>
        </div>
      ))}
      <div ref={messageRef}></div>
    </div>
  );
};

export default OutputContainer;
