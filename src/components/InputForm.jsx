/* eslint-disable react/prop-types */
import { useChat } from "../context/customContext";
const InputForm = () => {
  const { handleSubmit, handleText, inputText } = useChat();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={handleKeyPress}
      className="w-full max-w-3xl flex items-center gap-4 bg-[#1B1E22] p-3 rounded-md ">
      <textarea
        value={inputText}
        onChange={handleText}
        aria-required={true}
        placeholder="Write your message here"
        className="w-full p-3 text-white bg-transparent rounded-md resize-none focus:ring-2 focus:ring-gray-400 focus:outline-none"
        aria-label="Input text area"
      />
      <button
        type="submit"
        className="px-3 py-3 bg-[#859F3C] self-end cursor-pointer flex  items-center font-bold hover:bg-black text-white rounded-md focus:ring-2 focus:ring-gray-400"
        aria-label="Send message">
        {" "}
        <i className="bx bxs-send text-center font-bold text-xl"></i>
      </button>
    </form>
  );
};

export default InputForm;
