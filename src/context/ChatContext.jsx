/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { InterfaceContext } from "./customContext";

const InterfaceProvider = ({ children }) => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(false);
  const [error, setError] = useState("");
  const messageRef = useRef(null);

  const targetLanguages = [
    { target: "en", label: "English" },
    { target: "pt", label: "Portuguese" },
    { target: "es", label: "Spanish" },
    { target: "ru", label: "Russian" },
    { target: "tr", label: "Turkish" },
    { target: "fr", label: "French" },
  ];

  const handleText = (e) => {
    setInputText(e.target.value);
    setError("");
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputText.trim()) {
      setError("Please enter your message");
      return;
    }

    setLoading(true);
    setError("");

    try {
      setMessages((prev) => [
        ...prev,
        { type: "user", text: inputText.trim() },
      ]);

      await detectLanguage(inputText);

      setInputText("");
    } catch (error) {
      setError("Failed to detect language.");
      console.error("Error detecting language:", error);
    } finally {
      setLoading(false);
    }
  };

  const detectLanguage = async (text) => {
    // Check if the language detector is able to run on user machine
    if ("ai" in self && "languageDetector" in self.ai) {
      setOutput(true);

      const languageAvailability = await ai.languageDetector.capabilities();

      // if not available, show an error
      if (languageAvailability.available === "no") {
        setError("Language detection is not supported.");
        return;
      }

      // if available, but needs to be downloaded, request for the download
      if (languageAvailability.available === "after-download") {
        try {
          setLoading(true);
          await self.ai.languageDetector.create({
            monitor(m) {
              m.addEventListener("downloadprogress", (e) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
              });
            },
          });
        } catch (error) {
          setError("Unable to download language model", error);
        } finally {
          setLoading(false);
        }
      }

      // if available, detect the language
      const detector = await ai.languageDetector.create();

      const results = await detector.detect(text);

      if (!results || results.length === 0) {
        setError("No language detected.");
        return;
      }

      // get the best match
      const bestMatch = results.reduce((max, lang) =>
        lang.confidence > max.confidence ? lang : max
      );

      // if the confidence is less than 0.4, show an error
      if (bestMatch.confidence < 0.4) {
        setError("Language is not detected");

        setTimeout(() => {
          setError("");
        }, 2000);
        return inputText;
      }

      // show the detected language
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: `Detected Language: ${
            bestMatch.detectedLanguage === "en"
              ? "English"
              : bestMatch.detectedLanguage === "pt"
              ? "Portuguese"
              : bestMatch.detectedLanguage === "ru"
              ? "Russian"
              : bestMatch.detectedLanguage === "es"
              ? "Spanish"
              : bestMatch.detectedLanguage === "fr"
              ? "French"
              : bestMatch.detectedLanguage === "tr"
              ? "Turkish"
              : "Language Not found"
          }`,
        },
      ]);
      setDetectedLanguage(bestMatch.detectedLanguage);

      return bestMatch.detectedLanguage;
    } else {
      setError("Language detection is not supported on your machine");
    }
  };
  const value = {
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
    handleSubmit,
    handleText,
    setError,
    setLoading,
    setMessages,
    setDetectedLanguage,
    setOutput,
  };

  return (
    <InterfaceContext.Provider value={value}>
      {children}
    </InterfaceContext.Provider>
  );
};

export default InterfaceProvider;
