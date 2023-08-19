import { useFormContext } from 'react-hook-form';

export default function FormCheckbox({ checkboxLabel, ...rest }) {
  const { register } = useFormContext();
  const { name } = rest;

  return (
    <div>
      <label htmlFor={name} className="text-gray-500 cursor-pointer">
        <input
          {...register(name, { required: rest.required })}
          id={name}
          type="checkbox"
          {...rest}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
        {checkboxLabel || name}
      </label>
    </div>
  );
}
