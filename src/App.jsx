import { Routes, Route } from "react-router-dom";
import { AppRouter } from './routes/AppRouter';
import LoginScreen from './views/auth/LoginScreen'
import HomeScreen from "./views/HomeScreen";




function App() {
  return (
    <AppRouter />
  );
}

export default App;

