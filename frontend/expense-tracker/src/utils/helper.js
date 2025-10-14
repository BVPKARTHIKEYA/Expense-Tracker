// src/utils/helper.js

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const getInitials = (name) => {
  if (!name) return '?';
  const words = name.trim().split(' ');
  let initials = '';
  for (let i = 0; i < Math.min(2, words.length); i++) {
    if (words[i] && words[i].length > 0) {
      initials += words[i][0].toUpperCase();
    }
  }
  return initials.toUpperCase();
};
