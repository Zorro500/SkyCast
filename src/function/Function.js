export  const getDayName = (dateString) => {
  const date = new Date(dateString);
  const weekday = date.toLocaleDateString('ru-RU', { weekday: 'short' });
  const day = date.getDate();
  const month = date.toLocaleDateString('ru-RU', { month: 'long' });
  return `${day} ${month}`;
};

export const getToday = ()=>{
 return new Date().toISOString().slice(0, 10); ;
}

export const getWeekday = (dateString)=>{
  const date = new Date(dateString);
  const weekday = date.toLocaleDateString('ru-RU', { weekday: 'short' });
  return weekday
}

