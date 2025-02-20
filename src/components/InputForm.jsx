/* eslint-disable react/prop-types */
import { useChat } from "../context/customContext";
const InputForm = () => {
  const { handleSubmit, handleText, inputText } = useChat();
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl flex items-center gap-4 bg-[#1B1E22] p-4 rounded-md">
      <textarea
        value={inputText}
        onChange={handleText}
        placeholder="Write your message here"
        className="w-full p-3 text-white bg-transparent rounded-md resize-none focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        aria-label="Input text area"
      />
      <button
        type="submit"
        className="px-3 py-3 bg-[#859F3C] cursor-pointer flex gap-2 items-center font-bold hover:bg-black text-white rounded-md focus:ring-1 focus:ring-yellow-400"
        aria-label="Send message">
        {" "}
        Send
        <i className="bx bxs-send text-center font-bold text-xl"></i>
      </button>
    </form>
  );
};

export default InputForm;
