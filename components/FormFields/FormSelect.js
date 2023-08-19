import { useFormContext } from 'react-hook-form';

export default function FormSelect({ selectLabel, options, ...rest }) {
  // if (!options) return null;

  const { register } = useFormContext();
  const { name } = rest;

  return (
    <div className="grid grid-cols-1 gap-4 mb-4">
      <label htmlFor={name}>{selectLabel || name}</label>
      <select
        {...register(name, { required: rest.required })}
        id={name}
        {...rest}
      >
        {options.map(({ option, ...opt }, index) => (
          <option key={index} {...opt}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
