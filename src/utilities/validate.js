const Validate = (value) => {
  const email = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
  if (email.test(value)) {
    return 'email';
  }

  const mobile = new RegExp('^[0-9]{10}$');
  if (mobile.test(value)) {
    return 'mobile';
  }

  const password = new RegExp('^[a-zA-Z0-9+_.-]{6,}$');
  if (password.test(value)) {
    return 'password';
  }

  const name = new RegExp('^[a-zA-Z0-9+_.-]+$');
  if (name.test(value)) {
    return 'name';
  }
};

export default Validate;
