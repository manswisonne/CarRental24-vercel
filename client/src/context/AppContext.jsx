
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [cars, setCars] = useState([]);

  // Check if user is logged in
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/data');
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === 'owner');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch all cars WITH DEBUGGING
  const fetchCars = async () => {
    try {
      console.log("=== FETCHING CARS FROM API ===");
      const { data } = await axios.get('/api/user/cars');
      
      console.log("API Response:", data);
      console.log("Success:", data.success);
      console.log("Number of cars:", data.cars?.length);
      
      if (data.success && data.cars) {
        // DEBUG: Check availability of each car
        data.cars.forEach((car, index) => {
          console.log(`Car ${index + 1}:`, {
            brand: car.brand,
            model: car.model,
            isAvailable: car.isAvailable,
            hasIsAvailable: 'isAvailable' in car,
            allKeys: Object.keys(car)
          });
        });
        
        // Ensure all cars have isAvailable property
        const carsWithAvailability = data.cars.map(car => {
          // If isAvailable is undefined or null, default to true
          const isAvailable = car.isAvailable !== false;
          return {
            ...car,
            isAvailable
          };
        });
        
        console.log("Setting cars with ensured availability");
        setCars(carsWithAvailability);
      } else {
        toast.error(data.message || "Failed to fetch cars");
      }
    } catch (error) {
      console.error("Fetch cars error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to load cars");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsOwner(false);
    delete axios.defaults.headers.common['Authorization'];
    toast.success("You have been logged out");
    navigate('/');
  };

  // Get token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    fetchCars();
  }, []);

  // Fetch user when token available
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    }
  }, [token]);

  // Debug: Log cars when they change
  useEffect(() => {
    console.log("=== CARS STATE UPDATED ===");
    console.log("Total cars in state:", cars.length);
    if (cars.length > 0) {
      console.log("First car in state:", {
        ...cars[0],
        isAvailable: cars[0].isAvailable
      });
    }
  }, [cars]);

  const value = {
    navigate, 
    currency, 
    axios, 
    user, 
    setUser, 
    token, 
    setToken, 
    isOwner, 
    setIsOwner,
    fetchUser, 
    showLogin, 
    setShowLogin, 
    logout, 
    fetchCars, 
    cars, 
    setCars,
    pickupDate, 
    setPickupDate, 
    returnDate, 
    setReturnDate
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};