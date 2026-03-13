<<<<<<< HEAD
import FormRegister from "./components/FormRegister"


function App() {


  return (
    <>
      <FormRegister/>
    </>
  )
=======
import { Routes, Route } from "react-router-dom";
import { AppRouter } from './routes/AppRouter';
import LoginScreen from './views/auth/LoginScreen'
import HomeScreen from "./views/HomeScreen";




function App() {
  return (
    <AppRouter />
  );
>>>>>>> a67067ffffa6cb13dd5bc8fd6f1423f8600725da
}

export default App;

