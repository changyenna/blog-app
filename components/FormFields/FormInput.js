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
        className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
      />
    </div>
  );
}
