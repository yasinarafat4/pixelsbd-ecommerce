// Symbols data
export const symbol_formats = [
    { value: 1, label: '[Symbol][Amount]' },
    { value: 2, label: '[Amount][Symbol]' },
    { value: 3, label: '[Symbol] [Amount]' },
    { value: 4, label: '[Amount] [Symbol]' },
];

// Decimal separator data
export const decimal_separators = [
    { value: 1, label: '1,23,456.70' },
    { value: 2, label: '1.23.456,70' }
];

// No of decimals data
export const no_of_decimals = [
    { value: 0, label: '12345' },
    { value: 1, label: '1234.5' },
    { value: 2, label: '123.45' },
    { value: 3, label: '12.345' },
];

// Category Type data
export const categoryTypes = [
    { value: '0', label: 'Physical' },
    { value: '1', label: 'Digital' }
];

// Video_providers data
export const video_provider = [
    { value: 'youtube', label: 'YouTube' },
    { value: 'vimeo', label: 'Vimeo' },
    { value: 'dailymotion', label: 'Dailymotion' }
];
// Stock Visibility
export const stock_visibility = [
    { value: 'hide', label: 'Hide Stock' },
    { value: 'quantity', label: 'Visible with quantity' },
    { value: 'text', label: 'Visible with text' }
];

//   Flat Persent
export const flat_persent = [
    { value: 'amount', label: 'Flat' },
    { value: 'percent', label: 'Persent' },
];
//   Shipping Fee Type
export const shipping_fee_type = [
    { value: 'flat_rate', label: 'Flat Rate' },
    { value: 'free', label: 'Free Shipping' },
];

// Delivery Status
export const delivery_status = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'picked_up', label: 'Picked Up' },
    { value: 'on_the_way', label: 'On the Way' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancel' },
];

// Payment Status
export const payment_status = [
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
];

// Language Code
export const language_code = [
    { "code": "af", "name": "Afrikaans", "nativeName": "Afrikaans", "rtl": "0" },
    { "code": "am", "name": "Amharic", "nativeName": "አማርኛ", "rtl": "0" },
    { "code": "ar", "name": "Arabic", "nativeName": "العربية", "rtl": "1" },
    { "code": "ay", "name": "Aymara", "nativeName": "Aymar", "rtl": "0" },
    { "code": "az", "name": "Azerbaijani", "nativeName": "Azərbaycanca / آذربايجان", "rtl": "0" },
    { "code": "be", "name": "Belarusian", "nativeName": "Беларуская", "rtl": "0" },
    { "code": "bg", "name": "Bulgarian", "nativeName": "Български", "rtl": "0" },
    { "code": "bi", "name": "Bislama", "nativeName": "Bislama", "rtl": "0" },
    { "code": "bn", "name": "Bengali", "nativeName": "বাংলা", "rtl": "0" },
    { "code": "bs", "name": "Bosnian", "nativeName": "Bosanski", "rtl": "0" },
    { "code": "ca", "name": "Catalan", "nativeName": "Català", "rtl": "0" },
    { "code": "ch", "name": "Chamorro", "nativeName": "Chamoru", "rtl": "0" },
    { "code": "cs", "name": "Czech", "nativeName": "Čeština", "rtl": "0" },
    { "code": "da", "name": "Danish", "nativeName": "Dansk", "rtl": "0" },
    { "code": "de", "name": "German", "nativeName": "Deutsch", "rtl": "0" },
    { "code": "dv", "name": "Divehi", "nativeName": "ދިވެހިބަސް", "rtl": "1" },
    { "code": "dz", "name": "Dzongkha", "nativeName": "ཇོང་ཁ", "rtl": "0" },
    { "code": "el", "name": "Greek", "nativeName": "Ελληνικά", "rtl": "0" },
    { "code": "en", "name": "English", "nativeName": "English", "rtl": "0" },
    { "code": "es", "name": "Spanish", "nativeName": "Español", "rtl": "0" },
    { "code": "et", "name": "Estonian", "nativeName": "Eesti", "rtl": "0" },
    { "code": "eu", "name": "Basque", "nativeName": "Euskara", "rtl": "0" },
    { "code": "fa", "name": "Persian", "nativeName": "فارسی", "rtl": "1" },
    { "code": "ff", "name": "Peul", "nativeName": "Fulfulde", "rtl": "0" },
    { "code": "fi", "name": "Finnish", "nativeName": "Suomi", "rtl": "0" },
    { "code": "fj", "name": "Fijian", "nativeName": "Na Vosa Vakaviti", "rtl": "0" },
    { "code": "fo", "name": "Faroese", "nativeName": "Føroyskt", "rtl": "0" },
    { "code": "fr", "name": "French", "nativeName": "Français", "rtl": "0" },
    { "code": "ga", "name": "Irish", "nativeName": "Gaeilge", "rtl": "0" },
    { "code": "gl", "name": "Galician", "nativeName": "Galego", "rtl": "0" },
    { "code": "gn", "name": "Guarani", "nativeName": "Avañe ẽ", "rtl": "0" },
    { "code": "gv", "name": "Manx", "nativeName": "Gaelg", "rtl": "0" },
    { "code": "he", "name": "Hebrew", "nativeName": "עברית", "rtl": "1" },
    { "code": "hi", "name": "Hindi", "nativeName": "हिन्दी", "rtl": "0" },
    { "code": "hr", "name": "Croatian", "nativeName": "Hrvatski", "rtl": "0" },
    { "code": "ht", "name": "Haitian", "nativeName": "Krèyol ayisyen", "rtl": "0" },
    { "code": "hu", "name": "Hungarian", "nativeName": "Magyar", "rtl": "0" },
    { "code": "hy", "name": "Armenian", "nativeName": "Հայերեն", "rtl": "0" },
    { "code": "id", "name": "Indonesian", "nativeName": "Bahasa Indonesia", "rtl": "0" },
    { "code": "is", "name": "Icelandic", "nativeName": "Íslenska", "rtl": "0" },
    { "code": "it", "name": "Italian", "nativeName": "Italiano", "rtl": "0" },
    { "code": "ja", "name": "Japanese", "nativeName": "日本語", "rtl": "0" },
    { "code": "ka", "name": "Georgian", "nativeName": "ქართული", "rtl": "0" },
    { "code": "kg", "name": "Kongo", "nativeName": "KiKongo", "rtl": "0" },
    { "code": "kk", "name": "Kazakh", "nativeName": "Қазақша", "rtl": "0" },
    { "code": "kl", "name": "Greenlandic", "nativeName": "Kalaallisut", "rtl": "0" },
    { "code": "km", "name": "Cambodian", "nativeName": "ភាសាខ្មែរ", "rtl": "0" },
    { "code": "ko", "name": "Korean", "nativeName": "한국어", "rtl": "0" },
    { "code": "ku", "name": "Kurdish", "nativeName": "Kurdî / كوردی", "rtl": "1" },
    { "code": "ky", "name": "Kyrgyz", "nativeName": "Кыргызча", "rtl": "0" },
    { "code": "la", "name": "Latin", "nativeName": "Latina", "rtl": "0" },
    { "code": "lb", "name": "Luxembourgish", "nativeName": "Lëtzebuergesch", "rtl": "0" },
    { "code": "ln", "name": "Lingala", "nativeName": "Lingála", "rtl": "0" },
    { "code": "lo", "name": "Laotian", "nativeName": "ລາວ / Pha xa lao", "rtl": "0" },
    { "code": "lt", "name": "Lithuanian", "nativeName": "Lietuvių", "rtl": "0" },
    { "code": "lu", "name": "Luba-Katanga", "nativeName": "Tshiluba", "rtl": "0" },
    { "code": "lv", "name": "Latvian", "nativeName": "Latviešu", "rtl": "0" },
    { "code": "mg", "name": "Malagasy", "nativeName": "Malagasy", "rtl": "0" },
    { "code": "mh", "name": "Marshallese", "nativeName": "Kajin Majel / Ebon", "rtl": "0" },
    { "code": "mi", "name": "Maori", "nativeName": "Māori", "rtl": "0" },
    { "code": "mk", "name": "Macedonian", "nativeName": "Македонски", "rtl": "0" },
    { "code": "mn", "name": "Mongolian", "nativeName": "Монгол", "rtl": "0" },
    { "code": "ms", "name": "Malay", "nativeName": "Bahasa Melayu", "rtl": "0" },
    { "code": "mt", "name": "Maltese", "nativeName": "bil-Malti", "rtl": "0" },
    { "code": "my", "name": "Burmese", "nativeName": "မြန်မာစာ", "rtl": "0" },
    { "code": "na", "name": "Nauruan", "nativeName": "Dorerin Naoero", "rtl": "0" },
    { "code": "nb", "name": "Norwegian Bokmål", "nativeName": "Norsk bokmål", "rtl": "0" },
    { "code": "nd", "name": "North Ndebele", "nativeName": "Sindebele", "rtl": "0" },
    { "code": "ne", "name": "Nepali", "nativeName": "नेपाली", "rtl": "0" },
    { "code": "nl", "name": "Dutch", "nativeName": "Nederlands", "rtl": "0" },
    { "code": "nn", "name": "Norwegian Nynorsk", "nativeName": "Norsk nynorsk", "rtl": "0" },
    { "code": "no", "name": "Norwegian", "nativeName": "Norsk", "rtl": "0" },
    { "code": "nr", "name": "South Ndebele", "nativeName": "isiNdebele", "rtl": "0" },
    { "code": "ny", "name": "Chichewa", "nativeName": "Chi-Chewa", "rtl": "0" },
    { "code": "oc", "name": "Occitan", "nativeName": "Occitan", "rtl": "0" },
    { "code": "pa", "name": "Panjabi / Punjabi", "nativeName": "ਪੰਜਾਬੀ / पंजाबी / پنجابي", "rtl": "0" },
    { "code": "pl", "name": "Polish", "nativeName": "Polski", "rtl": "0" },
    { "code": "ps", "name": "Pashto", "nativeName": "پښتو", "rtl": "1" },
    { "code": "pt", "name": "Portuguese", "nativeName": "Português", "rtl": "0" },
    { "code": "qu", "name": "Quechua", "nativeName": "Runa Simi", "rtl": "0" },
    { "code": "rn", "name": "Kirundi", "nativeName": "Kirundi", "rtl": "0" },
    { "code": "ro", "name": "Romanian", "nativeName": "Română", "rtl": "0" },
    { "code": "ru", "name": "Russian", "nativeName": "Русский", "rtl": "0" },
    { "code": "rw", "name": "Rwandi", "nativeName": "Kinyarwandi", "rtl": "0" },
    { "code": "sg", "name": "Sango", "nativeName": "Sängö", "rtl": "0" },
    { "code": "si", "name": "Sinhalese", "nativeName": "සිංහල", "rtl": "0" },
    { "code": "sk", "name": "Slovak", "nativeName": "Slovenčina", "rtl": "0" },
    { "code": "sl", "name": "Slovenian", "nativeName": "Slovenščina", "rtl": "0" },
    { "code": "sm", "name": "Samoan", "nativeName": "Gagana Samoa", "rtl": "0" },
    { "code": "sn", "name": "Shona", "nativeName": "chiShona", "rtl": "0" },
    { "code": "so", "name": "Somalia", "nativeName": "Soomaaliga", "rtl": "0" },
    { "code": "sq", "name": "Albanian", "nativeName": "Shqip", "rtl": "0" },
    { "code": "sr", "name": "Serbian", "nativeName": "Српски", "rtl": "0" },
    { "code": "ss", "name": "Swati", "nativeName": "SiSwati", "rtl": "0" },
    { "code": "st", "name": "Southern Sotho", "nativeName": "Sesotho", "rtl": "0" },
    { "code": "sv", "name": "Swedish", "nativeName": "Svenska", "rtl": "0" },
    { "code": "sw", "name": "Swahili", "nativeName": "Kiswahili", "rtl": "0" },
    { "code": "ta", "name": "Tamil", "nativeName": "தமிழ்", "rtl": "0" },
    { "code": "tg", "name": "Tajik", "nativeName": "Тоҷикӣ", "rtl": "0" },
    { "code": "th", "name": "Thai", "nativeName": "ไทย / Phasa Thai", "rtl": "0" },
    { "code": "ti", "name": "Tigrinya", "nativeName": "ትግርኛ", "rtl": "0" },
    { "code": "tk", "name": "Turkmen", "nativeName": "Туркмен / تركمن", "rtl": "0" },
    { "code": "tn", "name": "Tswana", "nativeName": "Setswana", "rtl": "0" },
    { "code": "to", "name": "Tonga", "nativeName": "Lea Faka-Tonga", "rtl": "0" },
    { "code": "tr", "name": "Turkish", "nativeName": "Türkçe", "rtl": "0" },
    { "code": "ts", "name": "Tsonga", "nativeName": "Xitsonga", "rtl": "0" },
    { "code": "uk", "name": "Ukrainian", "nativeName": "Українська", "rtl": "0" },
    { "code": "ur", "name": "Urdu", "nativeName": "اردو", "rtl": "1" },
    { "code": "uz", "name": "Uzbek", "nativeName": "O zbekcha", "rtl": "0" },
    { "code": "ve", "name": "Venda", "nativeName": "Tshivenḓa", "rtl": "0" },
    { "code": "vi", "name": "Vietnamese", "nativeName": "Tiếng Việt", "rtl": "0" },
    { "code": "xh", "name": "Xhosa", "nativeName": "isiXhosa", "rtl": "0" },
    { "code": "zh", "name": "Chinese", "nativeName": "中文", "rtl": "0" },
    { "code": "zu", "name": "Zulu", "nativeName": "isiZulu", "rtl": "0" }
]

// Mailers
export const mailers = [
    { value: 'sendmail', label: 'Sendmail' },
    { value: 'smtp', label: 'SMTP' },
    { value: 'mailgun', label: 'Mailgun' },
];

// States
export const states = [
    { value: 'andhra_pradesh', label: 'Andhra Pradesh' },
    { value: 'mailgun', label: 'Mailgun' },
];

// Varification Options
export const varificationOptions = [
    { value: '1', label: 'Approved' },
    { value: '0', label: 'Non Approved' },
]

// Timezones
export const timezones = [

    {
        "zone": "UTC",
        "gmt": "",
        "name": "Coordinated Universal Time"
    },
    {
        "zone": "Pacific/Midway",
        "gmt": "(GMT-11:00)",
        "name": "Midway Island"
    },
    {
        "zone": "US/Samoa",
        "gmt": "(GMT-11:00)",
        "name": "Samoa"
    },
    {
        "zone": "US/Hawaii",
        "gmt": "(GMT-10:00)",
        "name": "Hawaii"
    },
    {
        "zone": "US/Alaska",
        "gmt": "(GMT-09:00)",
        "name": "Alaska"
    },
    {
        "zone": "US/Pacific",
        "gmt": "(GMT-08:00)",
        "name": "Pacific Time (US &amp; Canada)"
    },
    {
        "zone": "America/Tijuana",
        "gmt": "(GMT-08:00)",
        "name": "Tijuana"
    },
    {
        "zone": "US/Arizona",
        "gmt": "(GMT-07:00)",
        "name": "Arizona"
    },
    {
        "zone": "US/Mountain",
        "gmt": "(GMT-07:00)",
        "name": "Mountain Time (US &amp; Canada)"
    },
    {
        "zone": "America/Chihuahua",
        "gmt": "(GMT-07:00)",
        "name": "Chihuahua"
    },
    {
        "zone": "America/Mazatlan",
        "gmt": "(GMT-07:00)",
        "name": "Mazatlan"
    },
    {
        "zone": "America/Mexico_City",
        "gmt": "(GMT-06:00)",
        "name": "Mexico City"
    },
    {
        "zone": "America/Monterrey",
        "gmt": "(GMT-06:00)",
        "name": "Monterrey"
    },
    {
        "zone": "Canada/Saskatchewan",
        "gmt": "(GMT-06:00)",
        "name": "Saskatchewan"
    },
    {
        "zone": "US/Central",
        "gmt": "(GMT-06:00)",
        "name": "Central Time (US &amp; Canada)"
    },
    {
        "zone": "US/Eastern",
        "gmt": "(GMT-05:00)",
        "name": "Eastern Time (US &amp; Canada)"
    },
    {
        "zone": "US/East-Indiana",
        "gmt": "(GMT-05:00)",
        "name": "Indiana (East)"
    },
    {
        "zone": "America/Bogota",
        "gmt": "(GMT-05:00)",
        "name": "Bogota"
    },
    {
        "zone": "America/Lima",
        "gmt": "(GMT-05:00)",
        "name": "Lima"
    },
    {
        "zone": "America/Caracas",
        "gmt": "(GMT-04:30)",
        "name": "Caracas"
    },
    {
        "zone": "Canada/Atlantic",
        "gmt": "(GMT-04:00)",
        "name": "Atlantic Time (Canada)"
    },
    {
        "zone": "America/La_Paz",
        "gmt": "(GMT-04:00)",
        "name": "La_Paz"
    },
    {
        "zone": "America/Santiago",
        "gmt": "(GMT-04:00)",
        "name": "Santiago"
    },
    {
        "zone": "Canada/Newfoundland",
        "gmt": "(GMT-03:30)",
        "name": "Newfoundland"
    },
    {
        "zone": "America/Buenos_Aires",
        "gmt": "(GMT-03:00)",
        "name": "Buenos Aires"
    },
    {
        "zone": "Greenland",
        "gmt": "(GMT-03:00)",
        "name": "Greenland"
    },
    {
        "zone": "Atlantic/Stanley",
        "gmt": "(GMT-02:00)",
        "name": "Stanley"
    },
    {
        "zone": "Atlantic/Azores",
        "gmt": "(GMT-01:00)",
        "name": "Azores"
    },
    {
        "zone": "Atlantic/Cape_Verde",
        "gmt": "(GMT-01:00)",
        "name": "Cape Verde Is."
    },
    {
        "zone": "Africa/Casablanca",
        "gmt": "(GMT)",
        "name": "Casablanca"
    },
    {
        "zone": "Europe/Dublin",
        "gmt": "(GMT)",
        "name": "Dublin"
    },
    {
        "zone": "Europe/Lisbon",
        "gmt": "(GMT)",
        "name": "Libson"
    },
    {
        "zone": "Europe/London",
        "gmt": "(GMT)",
        "name": "London"
    },
    {
        "zone": "Africa/Monrovia",
        "gmt": "(GMT)",
        "name": "Monrovia"
    },
    {
        "zone": "Europe/Amsterdam",
        "gmt": "(GMT+01:00)",
        "name": "Amsterdam"
    },
    {
        "zone": "Europe/Belgrade",
        "gmt": "(GMT+01:00)",
        "name": "Belgrade"
    },
    {
        "zone": "Europe/Berlin",
        "gmt": "(GMT+01:00)",
        "name": "Berlin"
    },
    {
        "zone": "Europe/Bratislava",
        "gmt": "(GMT+01:00)",
        "name": "Bratislava"
    },
    {
        "zone": "Europe/Brussels",
        "gmt": "(GMT+01:00)",
        "name": "Brussels"
    },
    {
        "zone": "Europe/Budapest",
        "gmt": "(GMT+01:00)",
        "name": "Budapest"
    },
    {
        "zone": "Europe/Copenhagen",
        "gmt": "(GMT+01:00)",
        "name": "Copenhagen"
    },
    {
        "zone": "Europe/Ljubljana",
        "gmt": "(GMT+01:00)",
        "name": "Ljubljana"
    },
    {
        "zone": "Europe/Madrid",
        "gmt": "(GMT+01:00)",
        "name": "Madrid"
    },
    {
        "zone": "Europe/Paris",
        "gmt": "(GMT+01:00)",
        "name": "Paris"
    },
    {
        "zone": "Europe/Prague",
        "gmt": "(GMT+01:00)",
        "name": "Prague"
    },
    {
        "zone": "Europe/Rome",
        "gmt": "(GMT+01:00)",
        "name": "Rome"
    },
    {
        "zone": "Europe/Sarajevo",
        "gmt": "(GMT+01:00)",
        "name": "Sarajevo"
    },
    {
        "zone": "Europe/Skopje",
        "gmt": "(GMT+01:00)",
        "name": "Skopje"
    },
    {
        "zone": "Europe/Stockholm",
        "gmt": "(GMT+01:00)",
        "name": "Stockholm"
    },
    {
        "zone": "Europe/Vienna",
        "gmt": "(GMT+01:00)",
        "name": "Vienna"
    },
    {
        "zone": "Europe/Warsaw",
        "gmt": "(GMT+01:00)",
        "name": "Warsaw"
    },
    {
        "zone": "Europe/Zagreb",
        "gmt": "(GMT+01:00)",
        "name": "Zagreb"
    },
    {
        "zone": "Europe/Athens",
        "gmt": "(GMT+02:00)",
        "name": "Athens"
    },
    {
        "zone": "Europe/Bucharest",
        "gmt": "(GMT+02:00)",
        "name": "Bucharest"
    },
    {
        "zone": "Africa/Cairo",
        "gmt": "(GMT+02:00)",
        "name": "Cairo"
    },
    {
        "zone": "Africa/Harare",
        "gmt": "(GMT+02:00)",
        "name": "Harere"
    },
    {
        "zone": "Europe/Helsinki",
        "gmt": "(GMT+02:00)",
        "name": "Helsinki"
    },
    {
        "zone": "Europe/Istanbul",
        "gmt": "(GMT+02:00)",
        "name": "Istanbul"
    },
    {
        "zone": "Asia/Jerusalem",
        "gmt": "(GMT+02:00)",
        "name": "Jerusalem"
    },
    {
        "zone": "Europe/Kiev",
        "gmt": "(GMT+02:00)",
        "name": "Kiev"
    },
    {
        "zone": "Europe/Minsk",
        "gmt": "(GMT+02:00)",
        "name": "Minsk"
    },
    {
        "zone": "Europe/Riga",
        "gmt": "(GMT+02:00)",
        "name": "Riga"
    },
    {
        "zone": "Europe/Sofia",
        "gmt": "(GMT+02:00)",
        "name": "Sofia"
    },
    {
        "zone": "Europe/Tallinn",
        "gmt": "(GMT+02:00)",
        "name": "Tallinn"
    },
    {
        "zone": "Europe/Vilnius",
        "gmt": "(GMT+02:00)",
        "name": "Vilnius"
    },
    {
        "zone": "Asia/Baghdad",
        "gmt": "(GMT+03:00)",
        "name": "Baghdad"
    },
    {
        "zone": "Asia/Kuwait",
        "gmt": "(GMT+03:00)",
        "name": "Kuwait"
    },
    {
        "zone": "Africa/Nairobi",
        "gmt": "(GMT+03:00)",
        "name": "Nairobi"
    },
    {
        "zone": "Asia/Riyadh",
        "gmt": "(GMT+03:00)",
        "name": "Riyadh"
    },
    {
        "zone": "Asia/Tehran",
        "gmt": "(GMT+03:30)",
        "name": "Tehran"
    },
    {
        "zone": "Europe/Moscow",
        "gmt": "(GMT+04:00)",
        "name": "Moscow"
    },
    {
        "zone": "Asia/Baku",
        "gmt": "(GMT+04:00)",
        "name": "Baku"
    },
    {
        "zone": "Europe/Volgograd",
        "gmt": "(GMT+04:00)",
        "name": "Volgograd"
    },
    {
        "zone": "Asia/Muscat",
        "gmt": "(GMT+04:00)",
        "name": "Muscat"
    },
    {
        "zone": "Asia/Tbilisi",
        "gmt": "(GMT+04:00)",
        "name": "Tbilisi"
    },
    {
        "zone": "Asia/Yerevan",
        "gmt": "(GMT+04:00)",
        "name": "Yerevan"
    },
    {
        "zone": "Asia/Kabul",
        "gmt": "(GMT+04:30)",
        "name": "Kabul"
    },
    {
        "zone": "Asia/Karachi",
        "gmt": "(GMT+05:00)",
        "name": "Karachi"
    },
    {
        "zone": "Asia/Tashkent",
        "gmt": "(GMT+05:00)",
        "name": "Tashkent"
    },
    {
        "zone": "Asia/Kolkata",
        "gmt": "(GMT+05:30)",
        "name": "Kolkata"
    },
    {
        "zone": "Asia/Kathmandu",
        "gmt": "(GMT+05:45)",
        "name": "Kathmandu"
    },
    {
        "zone": "Asia/Yekaterinburg",
        "gmt": "(GMT+06:00)",
        "name": "Yekaterinburg"
    },
    {
        "zone": "Asia/Almaty",
        "gmt": "(GMT+06:00)",
        "name": "Almaty"
    },
    {
        "zone": "Asia/Dhaka",
        "gmt": "(GMT+06:00)",
        "name": "Dhaka"
    },
    {
        "zone": "Asia/Novosibirsk",
        "gmt": "(GMT+07:00)",
        "name": "Novosibirsk"
    },
    {
        "zone": "Asia/Bangkok",
        "gmt": "(GMT+07:00)",
        "name": "Bangkok"
    },
    {
        "zone": "Asia/Jakarta",
        "gmt": "(GMT+07:00)",
        "name": "Jakarta"
    },
    {
        "zone": "Asia/Krasnoyarsk",
        "gmt": "(GMT+08:00)",
        "name": "Krasnoyarsk"
    },
    {
        "zone": "Asia/Chongqing",
        "gmt": "(GMT+08:00)",
        "name": "Chongqing"
    },
    {
        "zone": "Asia/Hong_Kong",
        "gmt": "(GMT+08:00)",
        "name": "Hong Kong"
    },
    {
        "zone": "Asia/Kuala_Lumpur",
        "gmt": "(GMT+08:00)",
        "name": "Kuala Lumpur"
    },
    {
        "zone": "Australia/Perth",
        "gmt": "(GMT+08:00)",
        "name": "Perth"
    },
    {
        "zone": "Asia/Singapore",
        "gmt": "(GMT+08:00)",
        "name": "Singapore"
    },
    {
        "zone": "Asia/Taipei",
        "gmt": "(GMT+08:00)",
        "name": "Taipei"
    },
    {
        "zone": "Asia/Ulaanbaatar",
        "gmt": "(GMT+08:00)",
        "name": "Ulaan Bataar"
    },
    {
        "zone": "Asia/Urumqi",
        "gmt": "(GMT+08:00)",
        "name": "Urumqi"
    },
    {
        "zone": "Asia/Irkutsk",
        "gmt": "(GMT+09:00)",
        "name": "Irkutsk"
    },
    {
        "zone": "Asia/Seoul",
        "gmt": "(GMT+09:00)",
        "name": "Seoul"
    },
    {
        "zone": "Asia/Tokyo",
        "gmt": "(GMT+09:00)",
        "name": "Tokyo"
    },
    {
        "zone": "Australia/Adelaide",
        "gmt": "(GMT+09:30)",
        "name": "Adelaide"
    },
    {
        "zone": "Australia/Darwin",
        "gmt": "(GMT+09:30)",
        "name": "Darwin"
    },
    {
        "zone": "Asia/Yakutsk",
        "gmt": "(GMT+10:00)",
        "name": "Yakutsk"
    },
    {
        "zone": "Australia/Brisbane",
        "gmt": "(GMT+10:00)",
        "name": "Brisbane"
    },
    {
        "zone": "Australia/Canberra",
        "gmt": "(GMT+10:00)",
        "name": "Canberra"
    },
    {
        "zone": "Pacific/Guam",
        "gmt": "(GMT+10:00)",
        "name": "Guam"
    },
    {
        "zone": "Australia/Hobart",
        "gmt": "(GMT+10:00)",
        "name": "Hobart"
    },
    {
        "zone": "Australia/Melbourne",
        "gmt": "(GMT+10:00)",
        "name": "Melbourne"
    },
    {
        "zone": "Pacific/Port_Moresby",
        "gmt": "(GMT+10:00)",
        "name": "Port Moresby"
    },
    {
        "zone": "Australia/Sydney",
        "gmt": "(GMT+10:00)",
        "name": "Sydney"
    },
    {
        "zone": "Asia/Vladivostok",
        "gmt": "(GMT+11:00)",
        "name": "Vladivostok"
    },
    {
        "zone": "Asia/Magadan",
        "gmt": "(GMT+12:00)",
        "name": "Magadan"
    },
    {
        "zone": "Pacific/Auckland",
        "gmt": "(GMT+12:00)",
        "name": "Auckland"
    },
    {
        "zone": "Pacific/Fiji",
        "gmt": "(GMT+12:00)",
        "name": "Fiji"
    }

];

// Coupon Type Data
export const coupon_type_data = [
    { value: 'product_base', label: 'For Products' },
    { value: 'cart_base', label: 'For Total Orders' },
    { value: 'welcome_base', label: 'Welcome Coupon' },
]
