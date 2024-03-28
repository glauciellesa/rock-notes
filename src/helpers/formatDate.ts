function formatDate(timestamp: Date): string {
  const date: Date = new Date(timestamp);
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1; // Month is zero-based, so we add 1
  const year: number = date.getFullYear();

  // Return formatted date string in the format DD-MM-YYYY
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
}


function formatDateTime(timestamp: Date): string {
  if (!timestamp) {
    return '';
  }

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date/time value');
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  };

  // Format the date and time
  const formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDateTime;
}

export {formatDate, formatDateTime}