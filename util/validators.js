module.exports.validateRegisterInput = (
  username,
  password,
  confirmPassword,
  email
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "password must be same";
  }
  if (email.trim() === "") {
    errors.email = "email must not be empty";
  } else {
    const RegEx = /\S+@\S+\.\S+/;
    if (!email.match(RegEx)) {
      errors.email = "email must be valid";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username must not be empty";
  }
  if (password === "") {
    errors.password = "password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
