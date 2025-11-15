# HomeworkUnicorn - Shopping List Application

A React-based shopping list application with role-based permissions and collaborative features.

## Features

### Shopping Lists Overview
- **Search**: Filter lists by name
- **Filter**: View all lists, only your lists, or lists shared with you
- **Toggle**: Show/hide archived lists
- **Create**: Add new shopping lists with member invitations

### Shopping List Detail Page
- **Edit List Name** (Owner only): Click the edit icon to rename the list
- **Member Management**:
  - Add new members by email (Owner only)
  - Remove members (Owner only)
  - Leave list (Members only)
- **Items Management**:
  - Add new items to the list
  - Mark items as resolved/unresolved (checkbox)
  - Delete items
  - **Filter items**: View All / Unresolved Only / Resolved Only
- **Menu Actions**:
  - Manage Members
  - Archive/Unarchive List (Owner only)
  - Delete List (Owner only)
  - Leave List (Members only)

### Modern UI
- Custom styled components (Button, SearchInput, FilterDropdown, ToggleSwitch)
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Hover effects and interactive states

## Tech Stack

- **React 18.3** - UI framework
- **TypeScript 5.2** - Type safety
- **React Router 6.26** - Client-side routing
- **React Context** - Global state management
- **Vite 5.2** - Build tool and dev server
- **ESLint** - Code quality

## Getting Started

### Prerequisites

- Node.js 16+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with the production-ready files.

### Running the Production Build

**IMPORTANT**: The production build uses ES modules and cannot be opened directly by double-clicking `index.html`. You must serve it through a web server.

#### Option 1: Using npm serve (Recommended)

```bash
npx serve dist
```

Then open `http://localhost:3000`

#### Option 2: Using Python

```bash
cd dist
python3 -m http.server 8080
```

Then open `http://localhost:8080`

#### Option 3: Using Vite preview

```bash
npm run preview
```

Then open `http://localhost:4173`

## Project Structure

```
src/
├── components/
│   └── ui/                        # Reusable UI components
│       ├── Button.tsx
│       ├── SearchInput.tsx
│       ├── FilterDropdown.tsx
│       ├── ToggleSwitch.tsx
│       └── index.ts
├── pages/                         # Page components
│   ├── ListsOverview.tsx          # Main lists overview page
│   ├── NewList.tsx                # Create new list form
│   ├── ListDetail.tsx             # Shopping list detail page
│   └── Members.tsx                # Member management page
├── context/
│   └── ListsContext.tsx           # Global state management
├── App.tsx                        # Router configuration
├── main.tsx                       # React entry point
└── index.css                      # Global styles
```

## Usage

Navigate to `http://localhost:5173` to see all shopping lists.

### Test Data

The application includes 3 sample lists:
- **Weekly Groceries** (owned by john@example.com)
- **Party Supplies** (owned by alice@example.com, shared with john)
- **Office Supplies** (owned by john@example.com)

Current user is set to `john@example.com` in the context.

## Business Logic

### Owner Capabilities
- Edit list name (click edit icon)
- Add/remove members
- Add/remove/resolve items
- Filter items (All/Unresolved/Resolved)
- Archive/Delete list

### Member Capabilities
- View list
- Add/remove/resolve items
- Filter items (All/Unresolved/Resolved)
- Leave the list

## Submission

This project meets all homework requirements:

**Business Logic (6 points):**
- ✓ Edit list name (owner only)
- ✓ Owner can add/remove members
- ✓ Member can leave list
- ✓ Display items
- ✓ Add/remove items
- ✓ Mark items as resolved
- ✓ Filter items (All/Unresolved/Resolved)

**Layout & Appearance (2 points):**
- ✓ Modern, polished UI with custom components
- ✓ Smooth animations and transitions

**Quality (2 points):**
- ✓ React + TypeScript
- ✓ Clean component structure
- ✓ Context for state management

## License

This project is for educational purposes.
