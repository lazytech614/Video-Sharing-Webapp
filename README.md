# 🎥 Nuevue - A Video Sharing Webapp

A modern, full-featured video sharing platform built with Next.js that allows users to upload, share, and discover videos in a YouTube-inspired interface.

## ✨ Features

- **Video Upload & Management**: Upload videos in multiple formats with drag-and-drop support
- **Video Streaming**: Optimized video playback with adaptive quality
- **User Authentication**: Secure user registration and login system
- **Comments System**: Interactive commenting on videos
- **Responsive Design**: Fully responsive across all devices
- **Dark/Light Mode**: Toggle between theme preferences

## 🚀 Tech Stack

- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS with shadcn UI components
- **Authentication**: Clerk authentication
- **Database**: PostgreSQL
- **Video Storage**: AWS S3 bucket
- **Deployment**: Vercel 

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- PostgreSQL database
- Cloud storage service (AWS S3, Cloudinary, etc.)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lazytech614/Video-Sharing-Webapp.git
   cd Video-Sharing-Webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_database_connection_string"
   
   # Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL="/auth/callback"
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL="/auth/callback"

   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID="your_google_client_id"
   GOOGLE_CLIENT_SECRET="your_google_client_secret"

   # Cloud Storage
   NEXT_PUBLIC_HOST_URL="yhttp://localhost:3000"
   NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL="cloudfront_strem_url_from_AWS"
   
   # Video Storage
   AWS_ACCESS_KEY_ID="your_aws_access_key"
   AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
   AWS_BUCKET_NAME="your_s3_bucket_name"
   AWS_REGION="your_aws_region"

   # For Mailing
   MAILER_PASSWORD="your_mailer_password"
   MAILER_EMAIL="example@example.com"

   # Payment Gateway
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="stripe_publishable_key"
   STRIPE_CLIENT_SECRET="stripe_secret_key"
   STRIPE_SUBSCRIPTION_PRICE_ID="price_id"
   
   # Or Cloudinary
   CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
   ```

4. **Set up the database**
   ```bash
   # If using Prisma
   npx prisma generate
   npx prisma db push
   
   # If using MongoDB with Mongoose
   # Make sure your MongoDB instance is running
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
Video-Sharing-Webapp/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utility functions and configurations
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   └── styles/           # Global styles
├── prisma/               # Database schema (if using Prisma)
├── .env.local           # Environment variables
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies
```

# Local Setup Guide

This guide will help you set up the complete Video Sharing Webapp locally on your machine. The application consists of three main components:

1. **Frontend (Web App)** - Next.js application (this repository)
2. **Backend API** - Server-side application
3. **Desktop App** - Electron application

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

## Step 1: Clone All Repositories

You'll need to clone three repositories to get the complete application running:

```bash
# Create a project directory
mkdir video-sharing-app
cd video-sharing-app

# Clone the frontend (web app)
git clone https://github.com/lazytech614/Video-Sharing-Webapp.git frontend

# Clone the backend
git clone https://github.com/lazytech614/video-sharing-webapp-backend.git backend

# Clone the desktop app
git clone https://github.com/lazytech614/Video-Sharing-Desktop-App.git desktop-app
```

## Step 2: Setup Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Configure environment variables (create a `.env` file based on `.env.example` if available):

```bash
# Copy environment template (if exists)
cp .env.example .env

# Edit the .env file with your configuration
# Add database connections, API keys, etc.
```

Start the backend server:

```bash
npm run dev
# or
npm start
```

The backend should now be running (typically on `http://localhost:5000` or similar).

## Step 3: Setup Frontend (Web App)

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

Configure environment variables:

```bash
# Create environment file
cp .env.example .env.local

# Edit .env.local with your backend API URL
# Example:
# NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

The web application should now be running on [http://localhost:3000](http://localhost:3000).

## Step 4: Setup Desktop App (Optional)

Navigate to the desktop app directory and install dependencies:

```bash
cd ../desktop-app
npm install
```

Configure the desktop app to connect to your local backend:

```bash
# Create or edit configuration file
# Update API endpoints to point to your local backend
```

Start the desktop application:

```bash
npm run dev
```

## Step 5: Verify Setup

1. **Backend**: Check if the API is responding at your backend URL
2. **Frontend**: Open [http://localhost:3000](http://localhost:3000) in your browser
3. **Desktop App**: The Electron app should open in a new window

## Common Issues & Troubleshooting

### Port Conflicts
If you encounter port conflicts, you can change the ports in the respective configuration files:
- Backend: Usually in `package.json` scripts or environment variables
- Frontend: Next.js will automatically suggest an alternative port
- Desktop App: Check the development configuration

### Database Connection
Make sure your database is running and the connection string in the backend `.env` file is correct.

### CORS Issues
If you face CORS issues, ensure the backend is configured to allow requests from your frontend domain (`http://localhost:3000`).

### Environment Variables
Double-check that all required environment variables are set in the respective `.env` files.

## Development Workflow

1. Start the backend server first
2. Start the frontend development server
3. Start the desktop app if needed
4. Make changes to any component and they should hot-reload

## Production Build

To create production builds:

```bash
# Frontend
cd frontend
npm run build

# Backend
cd ../backend
npm run build  # if build script exists

# Desktop App
cd ../desktop-app
npm run build
```

## Contributing

1. Make sure all three components are working locally
2. Test your changes across all platforms
3. Submit pull requests to the respective repositories

For more detailed information about each component, refer to their individual repository documentation.

## 🎯 Usage

### For Users
1. Register for an account or log in
2. Upload videos using the upload button
3. Browse and discover videos on the home page
4. Search for specific content using the search bar
5. Like, comment, and subscribe to channels
6. Manage your profile and uploaded videos

### For Developers
1. Modify components in the `src/components` directory
2. Add new pages in the `src/app` directory
3. Update the database schema in `prisma/schema.prisma`
4. Customize styling in `src/styles` or component files

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Add environment variables in the Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📈 Performance Optimization

- **Video Compression**: Automatic video compression on upload
- **CDN Integration**: Fast video delivery through CDN
- **Lazy Loading**: Components and videos load on demand
- **Image Optimization**: Next.js automatic image optimization
- **Caching**: Redis caching for improved performance

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- The open-source community for inspiration and tools

## 📞 Support

If you encounter any issues or have questions:

- Open an issue on GitHub
- Email: [derupanjan2021@gmail.com](mailto:derupanjan2021@gmail.com)
- WhatsApp: [+91 9362029992](https://wa.me/919362029992)

## 🗺️ Roadmap

- [ ] Live streaming functionality
- [ ] Video editing tools
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] AI-powered content recommendations

---

Made with ❤️ by [lazytech614](https://github.com/lazytech614)