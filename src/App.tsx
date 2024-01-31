import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Vans from './pages/vans/Vans';
import './server';
import VanDetails from './pages/van-details/VanDetails';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/vans'
          element={<Vans />}
        />
        <Route
          path={'/vans/:id'}
          element={<VanDetails />}
        />
      </Routes>
    </Router>
  );
}
