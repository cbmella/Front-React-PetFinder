import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import PetList from './PetList';
import PetForm from './PetForm';
import Navbar from './Navbar';
import Footer from './Footer';
import Landing from './Landing';
import Register from './Register';
import Login from './Login';
import './App.css';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/pets" element={<PetList />} />
              <Route path="/i-lost-my-pet" element={<PetForm />} />
              <Route path="/i-need-to-give-up-for-adoption" element={<PetForm />} />
              <Route path="/pets/:id/edit" element={<PetForm />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;