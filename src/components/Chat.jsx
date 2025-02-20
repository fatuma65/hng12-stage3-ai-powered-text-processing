import { useEffect } from "react";
import "boxicons";
import { useChat } from "../context/customContext";
import InputForm from "./InputForm";
import ActiveButtons from "./ActiveButtons";
import OutputContainer from "./OutputContainer";

const Chat = () => {
  const {
    inputText,
    messages,
    messageRef,
    detectedLanguage,
    selectedLanguage,
    loading,
    output,
    error,
    targetLanguages,
    handleLanguageChange,
    setError,
    setLoading,
    setMessages,
  } = useChat();

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleTranslate = async () => {
    if (!selectedLanguage) {
      setError("Please enter text and select a language.");
      return;
    }

    if (selectedLanguage === detectedLanguage) {
      setError("Please select a different language.");
      return;
    }

    setError("");

    try {
      setLoading(true);

      const outPutText = messages
        .slice()
        .reverse()
        .find((message) => message.type === "user");

      const textFromUser = outPutText.text;
      console.log(textFromUser);

      const translatedText = await translateText(
        textFromUser,
        selectedLanguage
      );

      setMessages((prev) => [
        ...prev,
        { type: "bot", text: `Translation: ${translatedText}` },
      ]);
    } catch (error) {
      setError("Failed to translate text.");
      console.error("Error translating text:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (inputText <= 150 || detectedLanguage !== "en") {
      setError(
        "Summarization is only available for English text over 150 characters."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const summary = await summarizeText(inputText);

      setMessages((prev) => [
        ...prev,
        { type: "bot", text: `Summary: ${summary}` },
      ]);
    } catch (error) {
      setError("Failed to Summarize the text at this moment");
      console.error("Error summarizing text:", error);
    } finally {
      setLoading(false);
    }
  };

  const translateText = async (text, targetLanguage) => {
    if ("ai" in self && "translator" in self.ai) {
      const translateAvailabilty = await ai.translator.capabilities();

      if (translateAvailabilty.available === "no") {
        setError("Translation is not supported.");
        return;
      }

      // check if the selected language and target language is available
      if (
        !translateAvailabilty.languagePairAvailable(
          selectedLanguage,
          targetLanguage
        )
      ) {
        setError("Language model not available, downloading...");

        // Request the language model download

        setLoading(true);
        await translateAvailabilty.downloadLanguagePair(
          selectedLanguage,
          targetLanguage
        );

        setError("Language model downloaded successfully.");
      }
      const translator = await ai.translator.create({
        sourceLanguage: detectedLanguage,
        targetLanguage: targetLanguage,
      });

      const translatedText = await translator.translate(text);

      return translatedText;
    } else {
      setError("The Translator API is not supported on your device");
    }
  };

  const summarizeText = async (text) => {
    // Check summarization availabilty
    
    if ("ai" in self && "summarizer" in self.ai) {
      const summarizerAvailabilty = await ai.summarizer.capabilities();

      if (summarizerAvailabilty.available === "no") {
        console.log("Summarizer API is not supported.");
        setError("Summarizer API is not supported.");
        return;
      }

      if (summarizerAvailabilty.available === "after-download") {
        try {
          await self.ai.summarizer.create({
            monitor(m) {
              m.addEventListener("downloadprogress", (e) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          });
        } catch (error) {
          setError("Unable to download language model", error);
        }
      }

      const summarizer = await ai.summarizer.create();
      const summary = await summarizer.summarize(text);
      return summary;
    } else {
      setError("The Summarizer API is not supported on your device");
    }
  };

  return (
    <div className="chat-container min-h-screen flex flex-col items-center bg-[#030712] px-4 py-4">
      {output ? (
        <>
          <OutputContainer />
          <ActiveButtons
            handleLanguageChange={handleLanguageChange}
            handleSummarize={handleSummarize}
            handleTranslate={handleTranslate}
            loading={loading}
            inputText={inputText}
            targetLanguages={targetLanguages}
            selectedLanguage={selectedLanguage}
            detectedLanguage={detectedLanguage}
          />
        </>
      ) : (
        <>
          <div className="text-center text-white py-48">
            <h3 className="text-2xl font-bold">Hi there</h3>
            <p className="text-lg mt-2">How can I help you today?</p>
          </div>
        </>
      )}

      {loading && (
        <p className="text-yellow-400 py-4" role="status">
          Loading...
        </p>
      )}

      {error && (
        <p className="text-red-500 py-8" role="alert">
          {error}
        </p>
      )}

      <InputForm />
    </div>
  );
};

export default Chat;
