# 🌍 GlobeView

A premium-styled world country explorer featuring real-time search and filtering. Browse all countries with details like capital, region, and country code — powered by the REST Countries API.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat&logo=bootstrap&logoColor=white)

---

## ✨ Features

- 🔍 Real-time filtering by country name, code, region, and capital
- 🏳️ Lazy-loaded country flags
- 🌐 Data from the [REST Countries API](https://studies.cs.helsinki.fi/restcountries/)
- 💎 Dark glassmorphism UI with smooth animations
- 📱 Fully responsive across all screen sizes
- ⚡ Fast rendering using `DocumentFragment`

---

## 🖥️ Preview

> Browse and filter all world countries in a sleek card grid with flag images, capital, region, and country code.

---

## 🚀 Getting Started

No installation or build step needed. Just open the file in your browser:

```bash
# Clone the repository
git clone https://github.com/MeghanaReddyMG/GlobeView.git

# Open in browser
open index.html
```

Or simply download the ZIP and open `index.html` directly.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure |
| CSS3 | Styling & animations |
| Vanilla JavaScript | Logic & API calls |
| Bootstrap 5 | Responsive layout |
| Bootstrap Icons | UI icons |
| Google Fonts (Inter) | Typography |
| REST Countries API | Country data |

---

## 📁 Project Structure

```
GlobeView/
├── index.html      # Main HTML structure
├── style.css       # Custom styles & glassmorphism theme
└── script.js       # API fetch, filtering & rendering logic
```

---

## 🔗 API

Data is fetched from:
```
https://studies.cs.helsinki.fi/restcountries/api/all
```

Each country card displays:
- 🏳️ Flag
- 🏙️ Capital city
- 🌍 Region / Continent
- 🔤 3-letter country code (CCA3)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by <a href="https://github.com/MeghanaReddyMG">Meghana Reddy M G</a></p>
