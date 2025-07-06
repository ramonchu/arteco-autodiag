import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import questions from '../data/questions';
import options from '../data/options';
import Question from '../components/Question';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function DiagnosticWizard() {
  const navigate = useNavigate();
  const location = useLocation();
  const utm = Object.fromEntries(new URLSearchParams(location.search));

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

  const handleChange = (value) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[step] = value;
      return copy;
    });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'diagnostics'), {
        answers,
        utm,
        createdAt: Timestamp.now(),
      });
      navigate('/gracias');
    } catch (e) {
      console.error('Error saving data', e);
    }
  };

  const progress = Math.round(((step + 1) / questions.length) * 100);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="h-2 bg-gray-200 rounded mb-4">
        <div className="h-full bg-blue-500 rounded" style={{ width: `${progress}%` }} />
      </div>
      <Question
        question={questions[step]}
        options={options[step]}
        value={answers[step]}
        onChange={handleChange}
      />
      <div className="mt-6 flex justify-between">
        {step < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!answers[step]}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={answers.some((a) => !a)}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            Enviar resultados para su análisis gratuito por parte del equipo de Arteco
          </button>
        )}
      </div>
    </div>
  );
}
