# Nocode Chat Zone

Nocode Chat Zone is a modern, community-driven discussion platform designed for seamless threaded conversations, collaborative knowledge sharing, and vibrant online communities. Built with React Native and Expo, it features deeply nested comments, real-time updates, and a clean, mobile-first user experience.

---

## Features

- **Community Boards**: Create and join multiple communities to discuss topics of interest.
- **Threaded Comments**: Support for deeply nested replies, making it easy to follow complex discussions.
- **Post Creation**: Share posts with text and media, and engage with others through comments and replies.
- **Collapsible Threads**: Collapse or expand comment threads for better readability.
- **Modern UI/UX**: Responsive, accessible, and visually appealing interface.
- **Haptic Feedback**: Enhanced user interaction with tactile feedback.

---

## Screenshots

<!-- Add screenshots of the main screens here -->

<img src="./assets//images/WhatsApp%20Image%202025-06-06%20at%2019.16.17.jpeg"/>
<img src="./assets/images/WhatsApp%20Image%202025-06-06%20at%2019.16.18.jpeg"/>
<img src="./assets/images/WhatsApp%20Image%202025-06-06%20at%2019.16.19.jpeg"/>
<img src="./assets/images/WhatsApp%20Image%202025-06-06%20at%2019.16.20%20(1).jpeg"/>
<img src="./assets/images/WhatsApp%20Image%202025-06-06%20at%2019.16.20.jpeg"/>




---

## Demo Video

<!-- Add a demo video link or embed here -->

<a href="https://www.dropbox.com/scl/fi/qw0se6z4owbsolkmlkim5/WhatsApp-Video-2025-06-06-at-19.11.50.mp4?rlkey=9p89ixe5fuzy728oz48uj91zn&st=4xzkjj5s&dl=0">Demo link</a>

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/nocode-chat-zone.git
   cd nocode-chat-zone
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**

   ```sh
   npm start
   ```

4. **Run on your device:**
   - Use the Expo Go app (iOS/Android) to scan the QR code.
   - Or run on an emulator/simulator.

---

## Project Structure

```
app/
  ├── AllPosts/           # All posts feed
  ├── CommentForm/        # Comment creation UI
  ├── Comments/           # Comment list and item components
  ├── Communities/        # Community boards
  ├── CreatePost/         # Post creation UI
  ├── Replies/            # Nested replies components
components/               # Shared UI components
config/                   # API and environment config
constants/                # App-wide constants
hooks/                    # Custom React hooks
services/                 # API and business logic
scripts/                  # Utility scripts
assets/                   # Images and fonts
```

---

## Key Files

- `app/` — Main app screens and navigation
- `components/` — Reusable UI components
- `services/` — API and business logic (auth, posts, comments, communities)
- `utils/` — Utility functions (comment tree, formatting)
- `types/` — TypeScript types for core entities

---


---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)

