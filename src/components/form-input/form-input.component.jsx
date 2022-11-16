import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : '' // konditionale Klasse
          } form-input-label`} // Klasse ohne Bedingung, d.h. gilt immer
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
