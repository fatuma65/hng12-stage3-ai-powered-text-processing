# AI Powered Text Processing Interface

This application will allow users to input text and utilize features such as summarization, translation, and language detection. It is built with React and Chrome AI APIs.

## Features

- The Interface adjusts seamlessly across different screen sizes.
- All text field, buttons, and error messages are screen-reader accessible.
- Users can input text, send text and it renders in the output field.
- Users can summarize text outputs if the output text is more than 150 characters.
- Users can translate output texts to the different languages listed.
- The app successfully communicates with the Chrome AI APIs to retrieve accurate results.
- The Interface displays processed results in the output area after API calls are complete.

## Technologies Used

- React: Frontend framework for building the user interface.
- Chrome AI APIs: To process the input text asynchronously
- Tailwind: To rapidly build modern websites.

## Installation

1. Clone the Repository:

```bash
git clone https://github.com/fatuma65/hng12-stage3-ai-powered-text-processing.git
```

2. Install Dependencies:

```bash
npm install
```

3. Set Up Translator, Language Detector, Summarizer Chrome AI APIs:

DownLoad Chrome Canary

Turn on experimental feature flag in your Chrome browser to access the native AI APIs.

[Vist Chrome APIs](https://developer.chrome.com/docs/ai/) to get started

```env
VITE_TRANSLATOR_TOKEN=your-translator-origin-trial
VITE_SUMMARIZATION_TOKEN=your-summarizer-origin-trial
VITE_LANGUAGE_TOKEN=your-language-detector-origin-trial
```

4 Run the Application:

```bash
npm run dev
```

5. Open in Browser:
   Visit http://localhost:5173 to view the application.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.
