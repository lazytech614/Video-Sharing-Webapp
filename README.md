# 🎥 Video Sharing Webapp

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