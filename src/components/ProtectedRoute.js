// imports the navigate component(used for navigation, allows us to programmatically redirect users to another route )
import { Navigate } from "react-router-dom";

// ProtectedRoute is a functional component, takes {children} as prop. 
const ProtectedRoute = ({ children }) => {
  // retrieves the token from localStorage
  const token = localStorage.getItem("token"); // Check if token exists
  // prints the token value to console for debugging purposes
  console.log("Token in ProtectedRoute:", token); // Debugging log

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

// Checks for an authentication token in localStorage.
//  If the token exists, it allows access to the protected component.
//  If the token does not exist, it redirects the user to the login page.
//  Prevents unauthorized access to protected routes.