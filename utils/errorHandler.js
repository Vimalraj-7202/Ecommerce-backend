export const handleError = (res, error, code = 500) => {
  res.status(code).json({ error: error.message || 'Something went wrong!' });
};
