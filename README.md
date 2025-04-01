# Vue3 Admin Dashboard

A modern admin dashboard built with Vue 3, Nuxt 3, and Tailwind CSS.

## Features

- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🔒 Authentication system
- 📊 Dashboard components
- 🎯 PrimeVue integration
- 📦 Pinia state management
- 🔄 API integration

## Tech Stack

- Vue 3
- Nuxt 3
- Tailwind CSS
- PrimeVue
- Pinia
- JavaScript

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vue3-admin.git
cd vue3-admin
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the environment variables in `.env` file with your configuration.

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── assets/                 # Static assets
├── components/            # Vue components
├── composables/          # Vue composables
├── config/               # Configuration files
├── layouts/              # Layout templates
├── middleware/           # Route middleware
├── pages/                # Route pages
├── plugins/              # Nuxt plugins
├── public/               # Static files
├── services/             # API services
├── store/                # Pinia stores
└── utils/                # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
