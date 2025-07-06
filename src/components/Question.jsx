export default function Question({ question, options, value, onChange }) {
  return (
    <div>
      <h2 className="text-xl mb-4">{question}</h2>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center space-x-2">
            <input
              type="radio"
              name="answer"
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="form-radio text-blue-600"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
