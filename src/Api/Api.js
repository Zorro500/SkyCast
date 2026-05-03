const key = 'S2CNKXYE6XG296L9HND5B7XH6';
const baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

export const fetchData = async (city = 'Moscow') => {
  const url = `${baseUrl}${city}?unitGroup=metric&key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return { error: true, message: 'Город не найден' };
  return res.json();
};

export const fetchCityFromParams = async () => {
  const params = new URLSearchParams(window.location.search);
  const city = params.get('city') || 'Moscow';
  return fetchData(city);
};