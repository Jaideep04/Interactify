import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "" );
  /*const [user, setUser] = useState("");

  // Function to check if the user is authenticated
  const userAuthentication = async () => {
    if (!token) {
      console.error("No token found. Skipping authentication check.");
      return;
    }
  
    try {
      console.log("Sending request with token:", token);
      const response = await fetch("http://localhost:5002/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        console.log("User authenticated:", data.userData);
      } else if (response.status === 401) {
        console.error("Unauthorized: Token invalid or expired.");
        LogoutUser(); // Clear invalid token
      } else {
        console.error(`Error fetching user data: ${response.status}`);
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
    }
  };
  // Use effect to call user authentication on component mount
  useEffect(() => {
    userAuthentication();
  }, []);*/

  // Function to store the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };
  // Determine login status based on token presence
  const isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);
  // Function to log out the user
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, /*user ,userAuthentication*/ }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
 

