import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Plataformas IT no \u00e1giles generan problemas:</h1>
      <ul className="text-left list-disc list-inside mb-6">
        <li>Lentos despliegues de cambios.</li>
        <li>Falta de observabilidad.</li>
        <li>Dependencia de sistemas monol\u00edticos.</li>
        <li>Ausencia de automatizaci\u00f3n.</li>
      </ul>
      <Link
        to="/diagnostico"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Comienza tu autodiagn\u00f3stico gratuito
      </Link>
    </div>
  );
}
