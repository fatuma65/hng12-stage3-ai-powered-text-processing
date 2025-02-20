/* eslint-disable react/prop-types */
const ActiveButtons = ({
  handleLanguageChange,
  selectedLanguage,
  targetLanguages,
  handleSummarize,
  loading,
  handleTranslate,
  inputText,
  detectedLanguage,
}) => {
  return (
    <div className="w-full max-w-3xl flex items-center gap-4 mb-4">
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="px-4 py-2 bg-gray-700 text-white border border-gray-500 rounded-md focus:ring-1 focus:ring-yellow-400"
        aria-label="Select language">
        <option value="" default>
          Select Language
        </option>
        {targetLanguages.map((lang) => (
          <option key={lang.target} value={lang.target}>
            {lang.label}
          </option>
        ))}
      </select>

      <button
        className="px-4 py-2 bg-[#859F3C] cursor-pointer font-semibold text-white rounded-md disabled:bg-gray-500 focus:ring-1 focus:ring-yellow-400"
        onClick={handleTranslate}
        disabled={loading}
        // tab-Index={1}
        aria-label="Translate text">
        Translate
      </button>

      {inputText.length > 150 &&
        detectedLanguage !==
          "en"(
            <button
              className="px-2 py-2 bg-[#859F3C] cursor-pointer text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              onClick={handleSummarize}
              aria-label="Summarize text">
              Summarize
            </button>
          )}
    </div>
  );
};

export default ActiveButtons;
