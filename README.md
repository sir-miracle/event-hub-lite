# EventHub Lite

A React Native event discovery and ticketing app built with offline-first architecture using SQLite.

## Features

### Core Functionality
- **Event Discovery**: Browse paginated events with search and category filtering
- **Event Details**: View comprehensive event information including speakers, venue, and availability
- **Favorites**: Save events for offline access with persistent storage
- **Checkout**: Complete ticket purchase with form validation and success/failure handling
- **Offline Support**: Full offline functionality with cached data and favorites

### Technical Features
- **Offline-First Architecture**: SQLite for local data persistence
- **Mock API**: Simulated network calls with configurable latency and failure rates
- **Clean Architecture**: Separated concerns with services, components, and navigation
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Adaptive UI with proper scaling for different screen sizes
- **Accessibility**: Screen reader support and dynamic type compatibility

## Project Structure

```
src/
├── components/
│   ├── atoms/           # Basic UI components (Button, Input, Text)
│   ├── molecules/       # Composite components (EventCard, SearchBar, etc.)
│   └── organisms/       # Complex components (AppRootWrapper)
├── navigation/          # Navigation configuration
├── screens/            # Screen components
├── services/           # Business logic and API services
├── database/           # SQLite database configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
└── data/               # Mock data files
```

## Setup Instructions

### Prerequisites
- Node.js (>= 20)
- React Native CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EventHubLite
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **iOS Setup**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the app**
   ```bash
   # iOS
   yarn ios
   
   # Android
   yarn android
   ```

## Architecture

### Data Layer
- **SQLite**: Local SQLite database for offline storage
- **Mock API Service**: Simulates network calls with configurable delays and failure rates
- **Database Service**: Handles data persistence and retrieval

### State Management
- **Redux Toolkit**: Global state management
- **Local State**: React hooks for component-level state

### Navigation
- **React Navigation**: Stack and tab navigation
- **Type-safe**: Full TypeScript support for navigation parameters

## Key Components

### EventCard
Displays event information with thumbnail, title, date, location, and price. Includes favorite toggle functionality.

### SearchBar
Real-time search with clear functionality and focus states.

### CategoryFilter
Horizontal scrollable category filter with visual indicators.

### EventDetails
Comprehensive event view with speakers, venue information, and availability status.

### Checkout
Form validation and payment processing with success/failure handling.

## Offline Functionality

The app is designed to work seamlessly offline:

1. **Data Caching**: Events are cached locally when first loaded
2. **Favorites Persistence**: Favorite events are stored locally and available offline
3. **Graceful Degradation**: App falls back to cached data when network is unavailable
4. **Cache Management**: Old cached data is automatically cleaned up

## Mock API

The app includes a comprehensive mock API that simulates real-world conditions:

- **Configurable Latency**: 300-800ms response times
- **Failure Simulation**: 10% chance of network failures
- **Realistic Data**: 60 sample events across 5 categories
- **Validation**: Proper input validation and error handling

## Customization

### Colors
Colors are defined in `src/utils/theme/colors/Colors.ts` and can be easily customized.

### Scaling
The app uses a custom scaling system in `src/utils/scaling.ts` for responsive design.

### Icons
Currently using emoji icons. I can replace with preferred icon library:
- `react-native-vector-icons`
- `react-native-svg`
- Custom icon components from real figma designs, which is the best for me

## Performance Considerations

- **Lazy Loading**: Events are loaded in pages of 10
- **Image Optimization**: Thumbnails are loaded efficiently
- **Memory Management**: Proper cleanup of listeners and subscriptions
- **Database Optimization**: Efficient queries and indexing
