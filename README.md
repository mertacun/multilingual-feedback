
# Multilingual Customer Feedback Hub - X Store

## Overview

The **Multilingual Customer Feedback Hub** is a web application that allows customers to submit feedback in their preferred language at X Store. The app translates the feedback into English, providing store management with valuable insights from diverse customer feedback. 

### Note: 
The translation feature requires a Google Cloud API subscription and may not be functional without it.

## Features

1. **Language Selection:**
   - Users can select their preferred language from a dropdown list.
   - The app dynamically translates interface text based on the selected language.

2. **Feedback Form:**
   - Users can submit feedback on various issues such as product quality, cleanliness, customer service, and more.
   - Optional photo upload to support the feedback.
   - The feedback is automatically translated into English and displayed in the "Translated Feedback" field.

3. **Dynamic Translation:**
   - As users type their feedback, the application translates it in real-time from their selected language to English.

4. **Thank You Message:**
   - After submitting feedback, a thank you message is displayed to acknowledge the submission.

5. **Responsive Design:**
   - The application is optimized for both desktop and mobile devices.

## Technologies Used

- **HTML5:** Structuring the web application.
- **CSS3:** Styling the web application, including responsive design features.
- **JavaScript:** Handling client-side logic, including dynamic translation and real-time feedback updates.
- **Google Translate API:** Used to translate feedback and interface text to and from different languages (requires Google API subscription).

## How It Works

1. **Language Selection:**
   - Users select their preferred language from a dropdown menu. 
   - The page content, including form labels and placeholders, is translated into the selected language using the Google Translate API.

2. **Submit Feedback:**
   - Users fill in the feedback form, which includes selecting the issue type, providing feedback text, and optionally uploading a photo.
   - The feedback is automatically translated into English and displayed in the "Translated Feedback" field.
   - Upon submission, the form is reset, and a thank you message is shown.

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/multilingual-customer-feedback-hub.git
   cd multilingual-customer-feedback-hub
   ```

2. **API Key Configuration:**
   - Obtain a Google Cloud API key for the Translate API.
   - Replace the placeholder API key in `script.js` with your own:
     ```javascript
     const API_KEY = 'YOUR_GOOGLE_API_KEY';
     ```

3. **Open the Project:**
   - Open the `index.html` file in a web browser to run the application locally.

## Future Enhancements

- **Backend Integration:** Store feedback in a database for further analysis.
- **Advanced Language Support:** Add more languages and improve translation accuracy.
- **Analytics Dashboard:** Provide store management with insights into customer feedback trends.

## License

This project is for educational purposes and is open for collaboration. Feel free to fork and contribute!
