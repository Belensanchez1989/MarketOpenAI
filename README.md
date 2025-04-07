# 🛒 Supermarket Chatbot - Street Market  

**AI-powered customer support chatbot specialized for supermarkets**  

## 🌟 Key Features  
- 💬 Interactive chat with real-time responses  
- 🧠 Conversation memory per user  
- 🛍️ 100% focused on supermarket information  
- ⚡ Fast and accurate answers  
- 🔄 Responsive design (works on mobile & desktop)  

## 🛠️ Technologies  
### Frontend  
- Modern HTML5 + CSS3  
- JavaScript ES6  
- Clean, accessible UI  

### Backend  
- Node.js + Express  
- OpenAI API (GPT-3.5-turbo)  
- Persistent conversation management  

## 🚀 Installation  

### Prerequisites  
- Node.js (v18+)  
- OpenAI account (for API Key)  
- NPM or Yarn  

### Setup Steps  

1. **Clone repository**  
```bash
git clone https://github.com/Belensanchez1989/MarketOpenAI.git
```

2. **Configure environment**  
Create `.env` file in project root:  
```env
OPENAI_API_KEY=your_openai_api_key
PORT=your_port
```

3. **Install dependencies**  
```bash
npm install
# or
yarn install
```

4. **Start server**  
```bash
npm start
# or
yarn start
```

5. **Open in browser**  
Visit: `http://localhost:your_port`

## 📂 File Structure  
```
supermarket-chatbot/
├── public/               # Frontend
│   ├── assets/
│   │   ├── css/          # Styles
│   │   └── js/           # Frontend logic
│   └── index.html        # Main view
├── server.js             # Backend
├── .env.example          # Environment template
├── package.json
└── README.md
```

## 🔧 Customization  

1. **Change supermarket info**  
Edit context in `server.js`:  
```javascript
const context = `You are a support assistant...`; // Modify this string
```

2. **Adjust message limit**  
Change in `server.js`:  
```javascript
if (conversations[userId].length > 12) {  // Adjust this number
```

3. **Customize design**  
Edit CSS files in `public/assets/css/styles.css`

## 🤖 Backend Workflow  

1. Receives questions from frontend  
2. Manages unique user conversations  
3. Queries OpenAI API with specialized context  
4. Returns accurate responses about:  
   - Business hours  
   - Available products  
   - Payment methods  
   - Promotions  

## 💡 Usage Examples  

**Customer asks:**  
"Do you carry lactose-free milk?"  

**Chatbot responds:**  
"Yes, we have lactose-free milk from Pascual and Central Asturiana brands. Available in the dairy section!"  

## 📄 License  
MIT License - Free for use and modification  

## 🌍 Contributions  
Contributions welcome! Fork and submit PRs.  

---  
**Questions?** Open an issue in the repository.  

*Built with ❤️ to revolutionize retail*  
