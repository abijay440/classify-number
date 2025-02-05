# Number Classification API

This is a simple API built with Next.js that classifies numbers and provides interesting mathematical properties along with a fun fact.

## Setup Instructions

1. Clone the repository:
```bash
  git clone https://github.com/yourusername/your-repo.git
  cd your-repo
```

2. Install dependencies:
```bash
  npm install 
```

3. Run the development server:
```bash 
  npm run dev
```

## API Documentation

Endpoint:

GET /api/classify-number?number=371

Response Format:
1. Success Response (200 OK)
```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

2. Error Response (400 Bad Request)
```json
{
  "number": "alphabet",
  "error": true
}
```

Example Usage:
```bash
curl http://localhost:3000/api/classify-number?number=371
```

## Deployment

Deploy the API to a platform of your choice (e.g., Vercel, Heroku).

Example (Vercel):
1. Install Vercel
```bash
npm install -g vercel
```
2. Deploy the project:
```bash
vercel
```

## Backlink
[Hire Node.js Developers]
https://hng.tech/hire/nodejs-developers
