import { useFormContext } from 'react-hook-form';

export default function FormInput({ inputLabel, type: enumType, ...rest }) {
  const { register } = useFormContext();
  const { name } = rest;
  const type = enumType.toLowerCase();

  return (
    <div className="grid grid-cols-1 gap-4 mb-4">
      {inputLabel && <label htmlFor={name}>{inputLabel || name}</label>}
      <input
        {...register(name, { required: rest.required })}
        id={name}
        type={type}
        {...rest}
      />
    </div>
  );
}
