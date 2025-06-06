# Nocode Chat Zone

Nocode Chat Zone is a modern, community-driven discussion platform designed for seamless threaded conversations, collaborative knowledge sharing, and vibrant online communities. Built with React Native and Expo, it features deeply nested comments, real-time updates, and a clean, mobile-first user experience.

---

## Features

- **Community Boards**: Create and join multiple communities to discuss topics of interest.
- **Threaded Comments**: Support for deeply nested replies, making it easy to follow complex discussions.
- **Post Creation**: Share posts with text and media, and engage with others through comments and replies.
- **Collapsible Threads**: Collapse or expand comment threads for better readability.
- **Modern UI/UX**: Responsive, accessible, and visually appealing interface.
- **Authentication**: Secure sign-in and user management.
- **Haptic Feedback**: Enhanced user interaction with tactile feedback.
- **Custom Theming**: Light and dark mode support.

---

## Screenshots

<!-- Add screenshots of the main screens here -->

| Home Feed | Post Details | Nested Comments |
|-----------|--------------|-----------------|
| ![Home](assets/images/WhatsApp%20Image%202025-06-06%20at%2019.16.17.jpeg) | ![Posts](assets/images/WhatsApp%20Image%202025-06-06%20at%2019.16.18.jpeg) | ![Comments](assets/images/WhatsApp%20Image%202025-06-06%20at%2019.16.19.jpeg) | ![Comments](assets/images/WhatsApp%20Image%202025-06-06%20at%2019.16.20%20(1).jpeg) | ![Comments](assets/images/WhatsApp%20Image%202025-06-06%20at%2019.16.20.jpeg)

---

## Demo Video

<!-- Add a demo video link or embed here -->

[![Watch the demo](assets/images/screenshot-home.png)](https://your-demo-video-link.com)

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/nocode-chat-zone.git
   cd nocode-chat-zone
   ```
2. **Install dependencies:**
   ```sh
   yarn install
   # or
   npm install
   ```
3. **Start the development server:**
   ```sh
   expo start
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

## Customization

- **Theming:** Edit `constants/Colors.ts` and use hooks in `hooks/` for custom color schemes.
- **Fonts & Images:** Add assets to `assets/fonts/` and `assets/images/`.
- **API Endpoints:** Update `config/api.ts` to point to your backend.

---

## Contributing

Contributions are welcome! Please open issues and pull requests for bug fixes, features, or improvements.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

## Contact

For questions or support, please open an issue or contact the maintainer.

