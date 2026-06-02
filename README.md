# Pokemon Search UI

A modern and responsive Pokedex application built with React that allows users to search Pokemon by name and view detailed Pokemon information through a clean and interactive interface.

---

## Features

- Search Pokemon by name
- Responsive user interface
- Pokemon image display
- Pokemon type badges
- Height, Weight and Base Experience information
- Detailed Pokemon statistics visualization
- Pokemon abilities display
- Loading and error handling
- Clean dark-themed UI

---

## Preview

The application provides an interactive Pokedex experience where users can search for any Pokemon and instantly view:

- Pokemon Image
- Pokemon Name
- Pokemon Type
- Height
- Weight
- Base Experience
- Base Stats
- Abilities

---

## Tech Stack

### Frontend

- React
- JavaScript (ES6+)
- HTML
- CSS
- Axios
- Vite

---

## Project Structure

```text
pokemon-ui
│
├── public
│
├── src
│   ├── assets
│   ├── main.jsx
│   ├── Pokedex.jsx
│   └── Pokedex.css
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

---

## Getting Started

### Clone Repository

```bash
git clone git@github.com:Manishh221/PokiDex-ui.git
```

### Navigate To Project

```bash
cd pokemon-ui
```

### Install Dependencies

```bash
npm install
```

### Run Application

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:5173
```

---

## Backend Requirement

Ensure the backend service is running before starting the frontend application.

Default Backend URL:

```text
http://localhost:8080
```

Example Endpoint:

```text
http://localhost:8080/api/pokemon/pikachu
```

---

## Error Handling

The application handles the following scenarios:

- Empty search input
- Invalid Pokemon names
- Pokemon not found
- Backend unavailable
- Network failures
- Unexpected API responses

---

## Performance

- Lightweight React components
- Fast development server using Vite
- Optimized API requests
- Responsive UI rendering

---

## Future Improvements

- Search suggestions
- Pokemon comparison
- Favorites system
- Search history
- Dark/Light theme switch
- Pagination and filtering

---

## Author

Manish Singh

Developed as part of the Finfactor Technologies Software Engineer (Java) Coding Challenge.
