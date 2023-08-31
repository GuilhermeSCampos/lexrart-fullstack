export const getCurrentTime = () => {
  const date = new Date();
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  const timeOffset = -3 * 60;
  const adjustedDate = new Date(utcTime + 60000 * timeOffset);

  let hours = adjustedDate.getHours();
  const minutes = adjustedDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
};

export const formatDateToTime = (dateString) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; 

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
};
