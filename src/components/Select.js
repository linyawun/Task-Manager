import FormErrorMsg from './FormErrorMsg';

const Select = ({ register, errors, labelText, id, rules, children }) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <select
        id={id}
        className={`form-select ${errors[id] ? 'is-invalid' : ''}`}
        {...register(id, rules)}
      >
        {children}
      </select>
      <FormErrorMsg errors={errors} name={id} />
    </>
  );
};

export default Select;