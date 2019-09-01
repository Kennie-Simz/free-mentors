import Users from '../../models/authModel';

const loginUser = (email) => {
  const errors = {};

  const emailExists = Users.find((item) => item.email === email);

  if (!emailExists) {
    errors.email = 'email does not exist';
  } else {
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
export default loginUser;
