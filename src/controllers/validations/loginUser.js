const loginUser = (email) => {
  const errors = {};

  const regEx = /\S+@\S+\.\S+/;
  if (!email.trim().match(regEx)) {
    errors.email = 'Invalid email';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
export default loginUser;
