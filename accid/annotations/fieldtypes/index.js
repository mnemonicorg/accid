export const booleanField = {
  get: v => v,
  set: v => (v === true || v === 'TRUE'),
};

export default {
  booleanField,
};
