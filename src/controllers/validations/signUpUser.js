import Users from '../../models/authModel';

const validateSignUpUser = (email) => {
  const errors = {};

  const emailExists = Users.find((item) => item.email === email);

  if (emailExists) {
    errors.email = 'email already exists';
  } else if (email.trim() === '') {
    errors.email = 'email is required';
  } else {
    // Letters, numbers and underscore
    const regEx = /\S+@\S+\.\S+/;
    if (!email.trim().match(regEx)) {
      errors.email = 'Invalid email';
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
export default validateSignUpUser;
