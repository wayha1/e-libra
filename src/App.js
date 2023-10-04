import './App.css';
import Navbar from './Navbar/Navbar';
import AccountPage from './components/AccountPage/AccountPage';
import CartPage from './components/Cartt/CartPage';
import Contactpage from './components/Contact/Contactpage';
import Help from './components/Help/Help';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage'
function Home({ children }) {
  let Component
  switch (window.location.pathname) {
    case "/home":
      Component = HomePage
      break;
      case "/help":
      Component = Help
      break;
      case "/contact":
      Component = Contactpage
      break;
      case "/account":
      Component = AccountPage
      break;
      case "/cart":
      Component = CartPage
      break;
      case "/login":
      Component = LoginPage
      break;
  
    default:
      break;
  }
  return (
   <div className=''>
    <Navbar />
    <Component />
    {children}
    {/* <HomePage /> */}
    
    {/* <LoginPage /> */}
    
   </div>
  );
}

export default Home;
