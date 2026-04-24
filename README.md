# PR TOOLS Admin Panel

A modern React admin dashboard for PR TOOLS e-commerce platform.

## Features

- **Authentication**: Secure login with JWT tokens
- **Configuration Management**: Brands, Categories, Offer Categories, Home Page Sections, Banners
- **Product Management**: CRUD operations, image uploads, offers
- **Order Management**: View and manage customer orders
- **User Management**: Admin user creation and management
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 18
- React Router 6
- Axios for API calls
- React Hook Form with Zod validation
- Tailwind CSS for styling
- React Hot Toast for notifications

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pr-tools-admin-panel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Backend Setup

Make sure your backend API is running on the configured `VITE_API_BASE_URL`.

Expected API endpoints:
- `POST /users/login` - User authentication
- `GET /users/profile` - Get current user profile
- `POST /users/register` - Create admin user
- `GET/POST/PUT/DELETE /configuration/*` - Configuration management
- `GET/POST/PUT/DELETE /products/*` - Product management
- `GET/PUT /order/*` - Order management

## Project Structure

```
src/
├── api/                    # API service layer
│   ├── client.js          # Axios client configuration
│   ├── authApi.js         # Authentication APIs
│   └── configurationApi.js # Configuration APIs
├── components/            # Reusable components
│   ├── common/           # Common components
│   ├── modals/           # Modal components
│   ├── tables/           # Table components
│   └── forms/            # Form components
├── constants/            # Application constants
├── context/              # React context providers
├── hooks/                # Custom hooks
├── layout/               # Layout components
├── pages/                # Page components
├── routes/               # Routing configuration
├── utils/                # Utility functions
└── main.jsx             # Application entry point
```

## Authentication

The application uses JWT tokens for authentication:

1. Login stores the token in `localStorage`
2. API requests automatically include the `Authorization: Bearer <token>` header
3. Invalid/expired tokens automatically redirect to login
4. Protected routes require authentication

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use TypeScript-style prop validation with PropTypes (future enhancement)
- Keep components modular and reusable
- Use consistent naming conventions

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. The `dist` folder contains the production build.

3. Configure your web server to serve the `dist` folder.

4. Set the `VITE_API_BASE_URL` environment variable to your production API URL.

## Contributing

1. Follow the existing code style
2. Use meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## License

This project is proprietary software for PR TOOLS.