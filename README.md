# High-Performance Data Matrix with Batch Actions

A high-performance attendee management system built with **React**, **TypeScript**, and **TanStack Virtual**. The application is designed to efficiently handle thousands of records while providing a smooth user experience with advanced filtering, client-side sorting, inline editing, batch actions, and debounced auto-save.

## 🚀 Features

### ⚡ High Performance

- DOM virtualization using **TanStack Virtual**
- Optimized to handle **10,000+ rows**
- Efficient rendering with `React.memo`
- Optimized state updates using `useCallback` and `useMemo`

### 🔍 Advanced Filtering

Filter attendees using multiple criteria simultaneously:

- Name
- Email
- Join date range
- Minimum score

### 📊 Client-Side Sorting

Sort attendees by:

- Name
- Email
- Join Date
- Score

Supports both ascending and descending order.

### ✏️ Inline Editing

Edit attendee information directly inside the table:

- Name
- Email
- Join Date
- Score

Changes are reflected instantly in the UI.

### 💾 Debounced Auto Save

- Automatically saves edited data after **600ms**
- Prevents continuous save requests while typing
- Simulated API delay to mimic a real backend

### ✅ Batch Actions

- Select individual rows
- Select all visible rows
- Delete selected attendees
- Clear current selection

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Virtual

## 📂 Project Structure

```text
src
├── components
│   ├── AttendeesTable.tsx
│   ├── AttendeeRow.tsx
│   ├── EditableCell.tsx
│   ├── FilterRow.tsx
│   ├── TableHeader.tsx
│   └── BatchActions.tsx
│
├── hooks
│   ├── useAttendeeFilter.ts
│   ├── useAttendeeSort.ts
│   ├── useDebouncedSave.ts
│   └── useRowSelection.ts
│
├── utils
│   └── debounce.ts
│
├── data
│   └── mockData.ts
│
├── types
│   └── attendee.ts
│
├── App.tsx
└── main.tsx
```

## ⚙️ Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## 📈 Performance Optimizations

- DOM Virtualization to render only visible rows
- Stable debounced callbacks using `useRef`
- Memoized row components with `React.memo`
- Memoized derived data with `useMemo`
- Stable event handlers using `useCallback`
- `Set`-based row selection for O(1) lookup performance

## 🎯 Assignment Requirements Covered

### Build the core attendee management ledger

- ✅ Built a scalable attendee management table capable of handling thousands of records efficiently.
- ✅ Implemented fast client-side sorting.
- ✅ Added inline modification hooks for editing attendee information.

### Implement DOM Virtualization

- ✅ Implemented DOM Virtualization using **TanStack Virtual**.
- ✅ Optimized rendering to efficiently support **10,000+ attendee records**.

### Create an advanced multi-column filtering matrix

- ✅ Added multi-column filtering by:
  - Name
  - Email
  - Join Date Range
  - Minimum Score
- ✅ Enabled applying all filters simultaneously.

### Build inline Excel-like editing with debounced auto-save

- ✅ Implemented inline editing for attendee fields.
- ✅ Added reusable editable cell components.
- ✅ Implemented debounced auto-save (600ms) to simulate API requests and prevent unnecessary network calls.

### Additional Improvements

- ✅ Added batch row selection.
- ✅ Implemented Select All functionality.
- ✅ Added Delete Selected and Clear Selection actions.
- ✅ Refactored the project into reusable components and custom hooks.
- ✅ Optimized rendering using React.memo, useMemo, and useCallback.
- ✅ Maintained strict TypeScript typing throughout the project.

## 👨‍💻 Author

**Mazen Mostafa**
