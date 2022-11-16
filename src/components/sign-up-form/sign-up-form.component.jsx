import { useState } from 'react';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils.js';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const handleSubmit = async (event) => {
    event.preventDevault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // event.target ist das Input-Field; darin werden die properties name und value abgegriffen
    setFormFields({ ...formFields, [name]: value }); // key-value mit einem key als array
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          required
          onChange={handleChange} // wenn der User etwas eingibt, wir der Event-Handler handleChange aufgerufen und ausgeführt
          name="displayName" // sitzt auf dem event.target, d.h. input-Feld, und kann - wie alle properties - abgerufen werden
          value={displayName} // das, was der User sieht
        />

        <label>Email</label>
        <input
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
};

export default SignUpForm;
