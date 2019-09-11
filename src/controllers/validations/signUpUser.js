const validateSignUpUser = (email) => {
  const errors = {};

  if (email.trim() === '') {
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
