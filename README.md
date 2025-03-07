# Description

This is a web-based application designed to manage and display music albums efficiently. Users can view album details, making it easier to explore and navigate collections.

## Features
- View all available albums in a tabular format.
- Check album details, including artist, type, song count, total duration, and size.
- Search albums based on various attributes.
- Navigate seamlessly between album lists and details.

## Pages
1. **Album Overview (`AlbumOverview.js`)**  
   - Displays a list of all albums.
   - Includes searching, and navigation to album details.

2. **Album Details (`AlbumDetails.js`)**  
   - Shows detailed information about a selected album.
   - Includes metadata such as artist, song list, duration, and size.

## Components
- **NavBarComponent** - Navigation bar for the application.
- **Loader** - Displays a loading animation while fetching data.
- **StatusCard** - Shows key details of an album.
- **CommonTable** - Generic table component for displaying album data.

## Technologies Used
- **Frontend:** React.js, React Router
- **Styling:** CSS, Bootstrap
- **Backend:** JSON Server (Mock API)
- **State Management:** React Hooks

## How to Run the Project

### Prerequisites
- Node.js and npm installed

### Steps to Run:
1. Clone the repository
2. Navigate to the project folder
3. Run `npm install` to install the dependencies.

### Start the JSON Server (Backend)
1. Run `json-server --watch db.json --port 5001` to run the json server
2. This will start a mock REST API

### Start the Frontend (React)
1. In another terminal, start the project by running `npm run dev`.
2. Open your web browser and go to `http://localhost:3000` to view the application.
