async function fetchLanguages() {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2/languages?key=AIzaSyDOATgZcmAHhQowNviYpGTv-uDcj8dBS28`);
    const data = await response.json();
    return data.data.languages;
}

async function populateLanguages() {
    const languageSelect = document.getElementById('languageSelect');
    
    for (const languageCode in languageNames) {
        const languageName = languageNames[languageCode];
        const option = document.createElement('option');
        option.value = languageCode;
        option.textContent = languageName;
        languageSelect.appendChild(option);
    }
}

async function translateText(text, targetLanguage) {

    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyDOATgZcmAHhQowNviYpGTv-uDcj8dBS28&source=en&target=${targetLanguage}&q=${text}`, {
        method: 'POST'
    });
    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.message);
    }
    return data.data.translations[0].translatedText;
}


function showThankYouMessage() {
    document.getElementById('thankYouMsg').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('thankYouMsg').classList.add('hidden');
    }, 7000);
}

document.getElementById('languageSelect').addEventListener('change', async function() {
    const selectedLanguage = this.value;

    if (selectedLanguage) {
        const pageTitle = document.getElementById('pageTitle');
        const languageSelection = document.querySelector('#languageSelection h2');
        const issueTypeSelect = document.getElementById('issueType');
        const formTitle = document.getElementById('formTitle');
        const issueTypeLabel = document.querySelector('label[for="issueType"]');
        const feedbackLabel = document.querySelector('label[for="feedback"]');
        const feedback = document.getElementById('feedback');
        const photoLabel = document.querySelector('label[for="photo"]');
        const translatedFeedbackLabelElement = document.querySelector('label[for="translatedFeedback"]');
        const placeholder = "Write your feedback here...";
        const submitButton = document.getElementById('submit');

        try {
            const translatedPageTitle = await translateText('Multilingual Customer Feedback Hub', selectedLanguage);
            const translatedLanguageSelection = await translateText('Select Your Preferred Language:', selectedLanguage);
            const translatedFormTitle = await translateText('Submit Your Feedback', selectedLanguage);
            const translatedIssueTypeLabel = await translateText('Issue Type:', selectedLanguage);
            const FeedbackLabelText = await translateText('Your Feedback:', selectedLanguage);
            const translatedFeedbackLabelText = await translateText('Translated Feedback:', selectedLanguage);
            const translatedPlaceholder = await translateText(placeholder, selectedLanguage);
            const translatedPhotoLabel = await translateText('Upload Photo (optional):', selectedLanguage);
            const translatedSubmitButton = await translateText('Submit Your Feedback', selectedLanguage);

            const translatedOptions = {
                "": await translateText('Select an Issue Type', selectedLanguage),
                "product_quality": await translateText('Product Quality', selectedLanguage),
                "cleanliness": await translateText('Cleanliness', selectedLanguage),
                "customer_service": await translateText('Customer Service', selectedLanguage),
                "store_facilities": await translateText('Store Facilities', selectedLanguage),
                "stock_availability": await translateText('Stock Availability', selectedLanguage),
                "pricing_concerns": await translateText('Pricing Concerns', selectedLanguage),
                "other": await translateText('Other', selectedLanguage)
            };

            issueTypeSelect.innerHTML = '';

            for (const value in translatedOptions) {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = translatedOptions[value];
                issueTypeSelect.appendChild(option);
            }

            pageTitle.textContent = translatedPageTitle;
            languageSelection.textContent = translatedLanguageSelection;
            photoLabel.textContent = translatedPhotoLabel;
            formTitle.textContent = translatedFormTitle;
            issueTypeLabel.textContent = translatedIssueTypeLabel;
            feedbackLabel.textContent = FeedbackLabelText;
            translatedFeedbackLabelElement.textContent = translatedFeedbackLabelText;
            submitButton.textContent = translatedSubmitButton;
            feedback.setAttribute('placeholder', translatedPlaceholder);

            document.getElementById('feedbackForm').classList.remove('hidden');
        } catch (error) {
            console.error('Translation error:', error.message);
            document.getElementById('feedbackForm').classList.remove('hidden');

            pageTitle.textContent = 'Multilingual Customer Feedback Hub';
            languageSelection.textContent = 'Select Your Preferred Language:';
            photoLabel.textContent = 'Upload Photo (optional):';
            formTitle.textContent = 'Submit Your Feedback';
            issueTypeLabel.textContent = 'Issue Type:';
            feedbackLabel.textContent = 'Your Feedback:';
            translatedFeedbackLabelElement.textContent = 'Translated Feedback:';
            submitButton.textContent = 'Submit Your Feedback';
            feedback.setAttribute('placeholder', placeholder);


            issueTypeSelect.innerHTML = '';
            const originalOptions = {
                "": 'Select an Issue Type',
                "product_quality": 'Product Quality',
                "cleanliness": 'Cleanliness',
                "customer_service": 'Customer Service',
                "store_facilities": 'Store Facilities',
                "stock_availability": 'Stock Availability',
                "pricing_concerns": 'Pricing Concerns',
                "other": 'Other'
            };

            for (const value in originalOptions) {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = originalOptions[value];
                issueTypeSelect.appendChild(option);
            }
        }
    }
});

async function translateFeedback(text, sourceLanguage, targetLanguage) {
    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyDOATgZcmAHhQowNviYpGTv-uDcj8dBS28&source=${sourceLanguage}&target=${targetLanguage}&q=${text}`, {
        method: 'POST'
    });
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error.message);
    }
    return data.data.translations[0].translatedText;
}

document.getElementById('feedback').addEventListener('input', async function() {
    const feedback = this.value;
    const selectedLanguage = document.getElementById('languageSelect').value;
    
    try {
        if (selectedLanguage !== 'en') {
            const translatedFeedback = await translateFeedback(feedback, selectedLanguage, 'en');
            document.getElementById('translatedFeedback').value = translatedFeedback;
        } else {
            document.getElementById('translatedFeedback').value = feedback;
        }
    } catch (error) {
        console.error('Translation error:', error.message);
    }
});


async function submitFeedback(event) {
    event.preventDefault();
    
    const form = document.getElementById('issueForm');
    const formData = new FormData(form);
    
    const feedback = formData.get('feedback');
    const selectedLanguage = document.getElementById('languageSelect').value;
    
    try {
        if (selectedLanguage) {
            const translatedFeedback = await translateText(feedback, selectedLanguage);
            document.getElementById('translatedFeedback').value = translatedFeedback;
        } else {
            document.getElementById('translatedFeedback').value = feedback;
        }
        showThankYouMessage();
        form.reset();
    } catch (error) {
        console.error('Translation error:', error.message);
    }
}

document.getElementById('issueForm').addEventListener('submit', submitFeedback);


const languageNames = {
    "af": "Afrikaans",
    "sq": "Albanian",
    "am": "Amharic",
    "ar": "Arabic",
    "hy": "Armenian",
    "as": "Assamese",
    "ay": "Aymara",
    "az": "Azerbaijani",
    "bm": "Bambara",
    "eu": "Basque",
    "be": "Belarusian",
    "bn": "Bengali",
    "bho": "Bhojpuri",
    "bs": "Bosnian",
    "bg": "Bulgarian",
    "ca": "Catalan",
    "ceb": "Cebuano",
    "zh-CN": "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    "co": "Corsican",
    "hr": "Croatian",
    "cs": "Czech",
    "da": "Danish",
    "dv": "Dhivehi",
    "doi": "Dogri",
    "nl": "Dutch",
    "en": "English",
    "eo": "Esperanto",
    "et": "Estonian",
    "ee": "Ewe",
    "fil": "Filipino (Tagalog)",
    "fi": "Finnish",
    "fr": "French",
    "fy": "Frisian",
    "gl": "Galician",
    "ka": "Georgian",
    "de": "German",
    "el": "Greek",
    "gn": "Guarani",
    "gu": "Gujarati",
    "ht": "Haitian Creole",
    "ha": "Hausa",
    "haw": "Hawaiian",
    "he": "Hebrew",
    "hi": "Hindi",
    "hmn": "Hmong",
    "hu": "Hungarian",
    "is": "Icelandic",
    "ig": "Igbo",
    "ilo": "Ilocano",
    "id": "Indonesian",
    "ga": "Irish",
    "it": "Italian",
    "ja": "Japanese",
    "jv": "Javanese",
    "kn": "Kannada",
    "kk": "Kazakh",
    "km": "Khmer",
    "rw": "Kinyarwanda",
    "gom": "Konkani",
    "ko": "Korean",
    "kri": "Krio",
    "ku": "Kurdish",
    "ckb": "Kurdish (Sorani)",
    "ky": "Kyrgyz",
    "lo": "Lao",
    "la": "Latin",
    "lv": "Latvian",
    "ln": "Lingala",
    "lt": "Lithuanian",
    "lg": "Luganda",
    "lb": "Luxembourgish",
    "mk": "Macedonian",
    "mai": "Maithili",
    "mg": "Malagasy",
    "ms": "Malay",
    "ml": "Malayalam",
    "mt": "Maltese",
    "mi": "Maori",
    "mr": "Marathi",
    "mni-Mtei": "Meiteilon (Manipuri)",
    "lus": "Mizo",
    "mn": "Mongolian",
    "my": "Myanmar (Burmese)",
    "ne": "Nepali",
    "no": "Norwegian",
    "ny": "Nyanja (Chichewa)",
    "or": "Odia (Oriya)",
    "om": "Oromo",
    "ps": "Pashto",
    "fa": "Persian",
    "pl": "Polish",
    "pt": "Portuguese (Portugal, Brazil)",
    "pa": "Punjabi",
    "qu": "Quechua",
    "ro": "Romanian",
    "ru": "Russian",
    "sm": "Samoan",
    "sa": "Sanskrit",
    "gd": "Scots Gaelic",
    "nso": "Sepedi",
    "sr": "Serbian",
    "st": "Sesotho",
    "sn": "Shona",
    "sd": "Sindhi",
    "si": "Sinhala (Sinhalese)",
    "sk": "Slovak",
    "sl": "Slovenian",
    "so": "Somali",
    "es": "Spanish",
    "su": "Sundanese",
    "sw": "Swahili",
    "sv": "Swedish",
    "tl": "Tagalog (Filipino)",
    "tg": "Tajik",
    "ta": "Tamil",
    "tt": "Tatar",
    "te": "Telugu",
    "th": "Thai",
    "ti": "Tigrinya",
    "ts": "Tsonga",
    "tr": "Turkish",
    "tk": "Turkmen",
    "ak": "Twi (Akan)",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "ug": "Uyghur",
    "uz": "Uzbek",
    "vi": "Vietnamese",
    "cy": "Welsh",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "zu": "Zulu"
};

populateLanguages();