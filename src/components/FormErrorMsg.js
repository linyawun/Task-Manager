const FormErrorMsg = ({ errors, name }) => {
  return (
    errors[name] && (
      <div className="invalid-feedback">{errors?.[name]?.message}</div>
    )
  );
};

export default FormErrorMsg;

