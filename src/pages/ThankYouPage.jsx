import { Link } from 'react-router-dom';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">\u00a1Gracias por enviar tus respuestas!</h1>
      <p className="mb-6">Nuestro equipo analizar\u00e1 tu informaci\u00f3n y se pondr\u00e1 en contacto contigo.</p>
      <Link to="/" className="text-blue-600 hover:underline">Volver al inicio</Link>
    </div>
  );
}
