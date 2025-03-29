// Import the styles for the app
import './App.css'; 
// Import the context that will manage the shopping cart across the app
import { CartProvider } from './context/CartContext';
// Import the different pages of the app
import AdminProjectsPage from './pages/AdminProjectsPage'; 
import CartPage from './pages/CartPage'; 
import DonatePage from './pages/DonatePage'; 
import ProjectsPage from './pages/ProjectsPage'; 
// Import the tools needed to create different paths (URLs) in the app
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main App component that sets up the pages of the app
function App() {
  return (
    <>
      {/* The CartProvider manages cart information throughout the app */}
      <CartProvider> 
        {/* Router allows us to switch between different pages in the app */}
        <Router>
          {/* Define the different paths (URLs) that the app can go to */}
          <Routes>
            {/* When the user visits the home page ("/"), show the ProjectsPage */}
            <Route path="/" element={<ProjectsPage />} />
            {/* When the user visits "/projects", show the ProjectsPage */}
            <Route path="/projects" element={<ProjectsPage />} />
            {/* When the user visits "/donate/:projectName/:projectId", show the DonatePage with specific project info 
            Instead of creating separate routes for each project, this approach helps the app adjust based on the project selected for donation.*/}
            <Route path="/donate/:projectName/:projectId" element={<DonatePage />} />
            {/* When the user visits "/cart", show the CartPage */}
            <Route path="/cart" element={<CartPage />} />
            {/* When the user visits "/adminprojects", show the AdminProjectsPage for managing projects */}
            <Route path="/adminprojects" element={<AdminProjectsPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
