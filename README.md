# Movie Download Tool

A modern React.js application for searching movies and finding streaming/download options. Built as part of the Anslation Front End Developer Internship application.

## 🎬 Features

- **Movie Search**: Search for movies using the OMDb API with fallback to mock data
- **Detailed Information**: View comprehensive movie details including plot, cast, ratings, and more
- **Streaming Links**: Find movies on popular streaming platforms (Netflix, Amazon Prime, Hulu, etc.)
- **Download Options**: Access free and legal download sources
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## 🚀 Live Demo

The application has been tested locally and is ready for deployment. All core functionality works as expected.

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Lucide React** - Beautiful icons
- **OMDb API** - Movie database API

## 📁 Project Structure

```
movie-download-tool/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── SearchBar.jsx    # Movie search component
│   │   ├── MovieCard.jsx    # Movie display card
│   │   ├── MovieDetails.jsx # Detailed movie view
│   │   ├── StreamingLinks.jsx # Streaming/download links
│   │   └── LoadingSpinner.jsx # Loading indicator
│   ├── services/
│   │   ├── omdbApi.js       # OMDb API integration
│   │   ├── streamingServices.js # Streaming service utilities
│   │   └── mockData.js      # Mock data for testing
│   ├── App.jsx              # Main application component
│   ├── App.css              # Custom styles and animations
│   └── main.jsx             # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie-download-tool
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Get OMDb API Key** (Optional)
   - Visit [OMDb API](http://www.omdbapi.com/apikey.aspx)
   - Get your free API key
   - Replace the API key in `src/services/omdbApi.js`

4. **Start development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

5. **Build for production**
   ```bash
   pnpm run build
   # or
   npm run build
   ```

## 🎯 Key Features Implemented

### Search Functionality
- Real-time movie search with OMDb API
- Fallback to mock data when API is unavailable
- Error handling and loading states
- Responsive search results grid

### Movie Details
- Comprehensive movie information display
- Tabbed interface for better organization
- High-quality movie posters with fallbacks
- Ratings from multiple sources

### Streaming & Download Links
- Integration with major streaming platforms
- Free and legal download options
- External link handling
- Clear disclaimers about copyright

### UI/UX Excellence
- Modern gradient backgrounds
- Smooth animations and transitions
- Hover effects and micro-interactions
- Mobile-responsive design
- Professional color scheme

## 🔑 API Integration

The application uses the OMDb API for movie data:

```javascript
// Example API call
const searchMovies = async (query) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
  );
  return response.json();
};
```

**Note**: The application includes mock data fallback for demonstration purposes when the API is unavailable.

## 🎨 Design Highlights

- **Color Scheme**: Modern blue gradient with glass morphism effects
- **Typography**: Clean, readable fonts with proper hierarchy
- **Animations**: Smooth fade-in and slide-up animations
- **Responsive**: Mobile-first design approach
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🔒 Legal Compliance

- All streaming links are search-based, not direct downloads
- Includes proper disclaimers about copyright
- Promotes legal streaming services
- Educational purposes only

## 🚀 Performance

- Optimized bundle size with Vite
- Lazy loading of components
- Efficient API calls with error handling
- Smooth animations with CSS transitions

## 🧪 Testing

The application has been thoroughly tested:
- ✅ Search functionality
- ✅ Movie details display
- ✅ Streaming links
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

## 📄 License

This project is created for educational purposes as part of an internship application.

## 👨‍💻 Developer

Created as part of the Anslation Front End Developer Internship application.

---

**Note**: This application demonstrates modern React.js development practices, clean code architecture, and professional UI/UX design. It's ready for production deployment with proper API key configuration.

