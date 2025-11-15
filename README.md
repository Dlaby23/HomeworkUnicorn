# HomeworkUnicorn - Shopping List Application

A React-based shopping list application with role-based permissions and collaborative features.

## Features

### Shopping List Detail Page

- **Role-Based Permissions**: Automatic detection of Owner, Member, or Guest roles
- **List Management**:
  - Edit list name (Owner only)
  - View list information
- **Member Management**:
  - Add new members by email (Owner only)
  - Remove members (Owner only)
  - Leave list (Members only)
- **Items Management**:
  - Add new items to the list
  - Mark items as resolved/unresolved
  - Delete items
  - Filter view (show all items or unresolved only)
- **Responsive Design**: Works seamlessly on mobile and desktop devices

## Tech Stack

- **React 18.3** - UI framework
- **TypeScript 5.2** - Type safety
- **React Router 6.26** - Client-side routing
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

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ShoppingListDetail.tsx    # Main detail page component
│   └── ShoppingListDetail.css    # Component styling
├── App.tsx                        # Router configuration
├── main.tsx                       # React entry point
└── index.css                      # Global styles
```

## Usage

The application currently loads a single shopping list detail page at `/lists/1`.

You can test different user roles by changing the `CURRENT_USER_ID` constant in `src/components/ShoppingListDetail.tsx`:

- `"u1"` - Owner (full permissions)
- `"u2"` - Member (limited permissions)
- `"u3"` - Guest (view only)

## Business Logic

### Owner Capabilities
- Edit list name
- Add/remove members
- Add/remove/resolve items
- Filter items

### Member Capabilities
- View list
- Add/remove/resolve items
- Filter items
- Leave the list

### Guest Capabilities
- View list (no modifications)

## License

This project is for educational purposes.
