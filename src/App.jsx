import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DiagnosticWizard from './pages/DiagnosticWizard';
import ThankYouPage from './pages/ThankYouPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/diagnostico" element={<DiagnosticWizard />} />
      <Route path="/gracias" element={<ThankYouPage />} />
    </Routes>
  );
}
