exports.validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
exports.validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
exports.calculateTrialEnd = (days = 1) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};
