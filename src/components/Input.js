import FormErrorMsg from './FormErrorMsg';

const Input = ({ register, errors, id, type, labelText, rules }) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        className={`form-control ${errors[id] ? 'is-invalid' : ''}`}
        {...register(id, rules)}
      />
      <FormErrorMsg errors={errors} name={id} />
    </>
  );
};

export default Input;