# KonnectStudios — Studio Bookings Dashboard

A premium, interactive, real-time single-page dashboard built using **React (v19)**, **Vite**, **TypeScript**, and **Vanilla CSS**. This project was created as part of the Full Stack Developer assessment.

---

## 🌟 Key Features

1. **Luxury Dark Mode UI**: A responsive, modern studio aesthetic with HSL-derived colors, glassmorphic styling, neon gradients, and elegant focus indicator animations.
2. **Visual Hierarchy & Badge Cues**: Clear layouts starting from the main header and statistics panels down to bookings list. Statuses are indicated using glowing, color-coded badges:
   - `Confirmed`: Mint/Emerald green glow.
   - `Pending`: Amber/Gold glow.
   - `Cancelled`: Rose/Crimson glow.
3. **Interactive Search & Filtering**: 
   - A tabs/pills filter system to view bookings by status (`All`, `Confirmed`, `Pending`, `Cancelled`) with live counters matching each.
   - Case-insensitive searching across client names and session types in real time.
4. **Interactive Booking Form**:
   - Allows users to add mock bookings which append instantly to the list.
   - Supports client initials avatar generation.
5. **Robust Validation**: 
   - Rejects empty fields.
   - Validates that client names are at least 3 characters.
   - Restricts dates: dates in the past (prior to local today) are rejected with clear inline errors, and the date input's browser picker is restricted to `min` date today.
6. **Polished Empty State**: Displays a custom icon, descriptive text, and a quick-reset button when filtering returns 0 results.
7. **Live Scheduling Assistant (Bonus Goal)**: Features a collapsible, fully interactive scheduler widget embedding a Cal.com dark-themed interface, demonstrating external booking calendar integration.

---

## 🛠️ File Structure

The project structure is organized to be clean, modular, and instantly understandable:

```text
StudioBookingList/
├── public/                       # Static public assets
├── src/
│   ├── assets/                   # SVG and image assets
│   ├── components/               # Modular UI Components
│   │   ├── BookingCard.tsx       # Booking row display card
│   │   ├── BookingForm.tsx       # Sidebar addition form & validation
│   │   ├── EmptyState.tsx        # UI fallback for empty search/filters
│   │   └── SchedulerWidget.tsx   # Live Cal.com scheduling embed (Bonus)
│   ├── data/
│   │   └── bookings.ts           # Types & Initial mock data
│   ├── App.tsx                   # Main state coordinator and layout
│   ├── index.css                 # Custom design tokens, transitions, layouts
│   └── main.tsx                  # Application entry point
├── index.html                    # SEO optimized markup entry
├── package.json                  # Dependencies & script configurations
├── tsconfig.json                 # TypeScript global settings
├── tsconfig.app.json             # TypeScript app compilation rules
└── tsconfig.node.json            # TypeScript Node environment rules
```

---

## 🚀 Running the Project Locally

Follow these quick steps to get the app running on your machine:

### 1. Prerequisites
Make sure you have Node.js and npm installed:
- **Node.js**: v18.0.0 or higher (Tested on v22.15.0)
- **npm**: v9.0.0 or higher (Tested on v10.9.2)

### 2. Install Dependencies
Run the following command in the project root directory:
```bash
npm install
```

### 3. Start Development Server
Launch the local development server:
```bash
npm run dev
```
Once started, open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
To build and optimize the project for hosting:
```bash
npm run build
```
This generates the optimized static assets inside the `dist/` directory.

### 5. Code Quality Check
Check for lint issues or code errors:
```bash
npm run lint
```

---

## 📝 Design Decisions & Trade-offs

- **TypeScript Strictness**: Enabled type-safe imports and strict typings for the bookings data structure. Handled the `verbatimModuleSyntax` rules by cleanly separating type-only imports (`import type { Booking }`) from values.
- **Vanilla CSS over Tailwind**: Configured clear design tokens (variables) in `src/index.css` for background colors, animations, borders, and typography. This avoids package bloat, provides absolute control over transition timings, and implements high-quality glow shadow animations.
- **Responsive Flex/Grid Layouts**: The dashboard uses a CSS Grid layout which automatically collapses from a 2-column sidebar layout into a single-column layout on viewport widths below `1024px`, ensuring a premium user experience on laptops, tablets, and phones.
- **Bonus Scheduling tool**: Embedded Cal.com's public widget. Designed it as a toggled section so it doesn't clutter the core requirements, keeping the main interface focused while providing functional value. It took roughly 15 minutes to embed and style in dark mode.
