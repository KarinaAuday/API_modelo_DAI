# Node.js Project

A simple Node.js project with Express.js server.

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Running the Project

### Development Mode

```bash
npm run dev
```

This will run the server with hot reload using nodemon.

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## Project Structure

```
├── src/
│   └── index.js          # Main application entry point
├── package.json          # Project dependencies and scripts
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Available Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint

## Environment Variables

Create a `.env` file in the root directory based on `.env.example`:

```
PORT=3000
NODE_ENV=development
```

## Development

### Adding Dependencies

```bash
npm install <package-name>
```

### Adding Dev Dependencies

```bash
npm install --save-dev <package-name>
```

## License

ISC
"# API_modelo_DAI" 
