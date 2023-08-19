import { useFormContext } from 'react-hook-form';

export default function FormTextarea({ textareaLabel, ...rest }) {
  const { register } = useFormContext();
  const { name } = rest;

  return (
    <div className="grid grid-cols-1 gap-4 mb-4">
      <label>{textareaLabel || name}</label>
      <textarea
        {...register(name, { required: rest.required })}
        htmlFor={name}
        id={name}
        {...rest}
        className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
      />
    </div>
  );
}
