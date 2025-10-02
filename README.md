# WhatsBlaster Frontend

A modern, professional React application for sending bulk WhatsApp messages at scale. Built with React, Tailwind CSS, and designed for optimal user experience.

## 🚀 Live Demo

**[View Live Application](https://whats-blaster.vercel.app/)**

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔐 Authentication

- Secure login system with demo credentials
- Session management with localStorage
- Professional login UI with password visibility toggle

### 📱 Message Management

- **Smart Country Selection**: Searchable dropdown with popular countries prioritized
- **Auto-fill Phone Numbers**: Automatically adds country code when country is selected
- **Bulk Messaging**: Send multiple messages with customizable delays
- **Real-time Validation**: Form validation with helpful error messages
- **Progress Tracking**: Live progress updates during message sending

### 🎨 User Experience

- **Modern UI/UX**: Professional design with Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: Comprehensive error messages and recovery
- **Accessibility**: ARIA attributes and keyboard navigation

### 📊 Results & Analytics

- **Detailed Results**: Success/failure statistics
- **Export Capabilities**: Download results for record keeping
- **Visual Feedback**: Color-coded status indicators
- **Summary Cards**: Quick overview of sending results

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Create React App
- **Deployment**: Vercel
- **Version Control**: Git

## 📸 Screenshots

### Login Page

- Professional login interface with demo credentials
- Password visibility toggle for better UX
- Clean, centered design

### Message Form

- Intuitive form with smart country selection
- Auto-fill phone number functionality
- Real-time validation and error handling
- Progress tracking during message sending

### Results Display

- Comprehensive results overview
- Success/failure statistics
- Export and reset functionality

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/DaniyalAlam09/WhatsBlaster-FE.git
   cd WhatsBlaster-FE
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start development server**

   ```bash
   npm start
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

### Demo Credentials

- **Username**: `admin`
- **Password**: `adminpassword123`

### Sending Messages

1. **Login** with the provided credentials
2. **Select Country** from the searchable dropdown
3. **Enter Phone Number** (country code auto-fills)
4. **Write Message** content
5. **Set Parameters**:
   - Number of messages to send
   - Delay between messages (in milliseconds)
6. **Send Messages** and track progress
7. **View Results** and export if needed

### Country Selection

- **Popular Countries**: US, Pakistan, South Korea, Singapore, India, Brazil, Mexico, Argentina
- **Search Functionality**: Type to filter countries by name, code, or dial code
- **Auto-fill**: Phone number automatically fills with selected country code

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js          # Application header with branding
│   ├── Login.js           # Authentication component
│   ├── MessageForm.js     # Main message sending form
│   ├── ProgressTracker.js # Progress tracking component
│   └── ResultsDisplay.js  # Results display component
├── services/
│   └── api.js             # API service layer
├── App.js                 # Main application component
├── index.js               # Application entry point
└── index.css              # Global styles and Tailwind utilities
```

## 🔌 API Integration

The frontend integrates with a backend API for:

- **Country Data**: Fetching list of countries with dial codes
- **Message Sending**: Bulk message sending with progress tracking
- **Health Checks**: Server status monitoring

### API Endpoints

- `GET /api/countries` - Fetch countries list
- `POST /api/send-messages` - Send bulk messages
- `GET /api/health` - Health check

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**

   - Link your GitHub repository to Vercel
   - Repository: `https://github.com/DaniyalAlam09/WhatsBlaster-FE`

2. **Build Configuration**

   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Environment Variables**

   - Set `REACT_APP_API_URL` to your backend API URL

4. **Deploy**
   - Automatic deployment on push to main branch
   - Manual deployment available in Vercel dashboard

### Manual Build

```bash
# Create production build
npm run build

# Serve locally
npm run serve
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue gradient (#3B82F6 to #1D4ED8)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)
- **Neutral**: Gray scale

### Typography

- **Headings**: Inter font family
- **Body**: System font stack
- **Code**: Monospace fonts

### Components

- **Buttons**: Gradient primary, outlined secondary
- **Inputs**: Rounded corners with focus states
- **Cards**: Subtle shadows with rounded corners
- **Badges**: Color-coded status indicators

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Serve production build
npm run serve

# Preview build
npm run preview
```

### Code Quality

- ESLint configuration for code quality
- Prettier for code formatting
- Responsive design principles
- Accessibility best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Daniyal Alam**

- GitHub: [@DaniyalAlam09](https://github.com/DaniyalAlam09)
- Email: dannyalalam09@gmail.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vercel for seamless deployment
- All contributors and users

---

**Made with ❤️ by [Daniyal Alam](https://github.com/DaniyalAlam09)**

_"Send smarter, not harder."_
