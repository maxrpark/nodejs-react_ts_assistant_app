import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Todo from './pages/Todo';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/todo' element={<Todo />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
