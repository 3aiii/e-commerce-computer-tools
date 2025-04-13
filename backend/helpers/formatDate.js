export const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return date.toLocaleString('en-GB', options).replace(',', '');
};
