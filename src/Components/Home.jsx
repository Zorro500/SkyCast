import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { WiSunrise, WiSunset } from 'react-icons/wi';
import { useContext, useState } from 'react';
import { contextCity, contextDatetime } from './Layout';
import { getDayName, getToday, getWeekday } from '../function/Function';
import { weatherIcons } from '../function/icons';
import { toast } from 'sonner';

export default function Home() {
  const { setDay } = useContext(contextDatetime);
  const { city, setCity } = useContext(contextCity);
  const weather = useLoaderData();
  const navigate = useNavigate();
  const [hasShownError, setHasShownError] = useState(false);

  
  if (weather?.error && !hasShownError) {
    toast.error(weather.message);
    setHasShownError(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      toast.error('Введите название города');
      return;
    }
    setHasShownError(false);
    navigate(`/?city=${encodeURIComponent(city)}`);
  };

  const getHoursCount = (hours, start, end) => {
    return hours.filter(hour => {
      const hourNum = parseInt(hour.datetime.split(':')[0]);
      return hourNum >= start && hourNum < end;
    }).length;
  };

  const result = weather?.days?.map(day => {
    const obj = {
      date: day.datetime,
      Утро: 0, УтроВлажность: 0, УтроВетер: 0, УтроДавление: 0,
      День: 0, ДеньВлажность: 0, ДеньВетер: 0, ДеньДавление: 0,
      Вечер: 0, ВечерВлажность: 0, ВечерВетер: 0, ВечерДавление: 0,
      Ночь: 0, НочьВлажность: 0, НочьВетер: 0, НочьДавление: 0,
    };

    day.hours.forEach(hour => {
      const hourNum = parseInt(hour.datetime.split(':')[0]);
      const temp = hour.temp;
      const humidity = hour.humidity;
      const wind = hour.windspeed;
      const pressure = hour.pressure;

      if (hourNum >= 6 && hourNum < 12) {
        obj.Утро += temp;
        obj.УтроВлажность += humidity;
        obj.УтроВетер += wind;
        obj.УтроДавление += pressure;
      }
      if (hourNum >= 12 && hourNum < 18) {
        obj.День += temp;
        obj.ДеньВлажность += humidity;
        obj.ДеньВетер += wind;
        obj.ДеньДавление += pressure;
      }
      if (hourNum >= 18 && hourNum < 24) {
        obj.Вечер += temp;
        obj.ВечерВлажность += humidity;
        obj.ВечерВетер += wind;
        obj.ВечерДавление += pressure;
      }
      if (hourNum >= 0 && hourNum < 6) {
        obj.Ночь += temp;
        obj.НочьВлажность += humidity;
        obj.НочьВетер += wind;
        obj.НочьДавление += pressure;
      }
    });

    obj.Утро = Math.round(obj.Утро / getHoursCount(day.hours, 6, 12));
    obj.УтроВлажность = Math.round(obj.УтроВлажность / getHoursCount(day.hours, 6, 12));
    obj.УтроВетер = Math.round(obj.УтроВетер / getHoursCount(day.hours, 6, 12));
    obj.УтроДавление = Math.round(obj.УтроДавление / getHoursCount(day.hours, 6, 12));

    obj.День = Math.round(obj.День / getHoursCount(day.hours, 12, 18));
    obj.ДеньВлажность = Math.round(obj.ДеньВлажность / getHoursCount(day.hours, 12, 18));
    obj.ДеньВетер = Math.round(obj.ДеньВетер / getHoursCount(day.hours, 12, 18));
    obj.ДеньДавление = Math.round(obj.ДеньДавление / getHoursCount(day.hours, 12, 18));

    obj.Вечер = Math.round(obj.Вечер / getHoursCount(day.hours, 18, 24));
    obj.ВечерВлажность = Math.round(obj.ВечерВлажность / getHoursCount(day.hours, 18, 24));
    obj.ВечерВетер = Math.round(obj.ВечерВетер / getHoursCount(day.hours, 18, 24));
    obj.ВечерДавление = Math.round(obj.ВечерДавление / getHoursCount(day.hours, 18, 24));

    obj.Ночь = Math.round(obj.Ночь / getHoursCount(day.hours, 0, 6));
    obj.НочьВлажность = Math.round(obj.НочьВлажность / getHoursCount(day.hours, 0, 6));
    obj.НочьВетер = Math.round(obj.НочьВетер / getHoursCount(day.hours, 0, 6));
    obj.НочьДавление = Math.round(obj.НочьДавление / getHoursCount(day.hours, 0, 6));

    return obj;
  }) || [];

  const showWeather = city && weather?.address && city.includes(weather.address) && !hasShownError;

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row justify-center gap-2 pt-20 sm:pt-24 md:pt-28 lg:pt-32 mx-auto p-4'>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введите город"
          className='border border-blue-300 hover:border-blue-500 w-full sm:w-72 md:w-80 lg:w-96 rounded-2xl p-2 text-sm sm:text-base'
        />
        <button type="submit" className='duration-300 rounded-xl border border-blue-500 bg-white cursor-pointer hover:bg-blue-200 p-2 text-sm sm:text-base text-blue-500 hover:text-white'>
          Поиск
        </button>
      </form>

      {(!showWeather || hasShownError) && (
        <div className="text-center text-gray-500 mt-20 text-base sm:text-xl md:text-2xl">
          🌍 Введите название города для просмотра погоды
        </div>
      )}

      {showWeather && (
        <div className='px-2 sm:px-4 md:px-6 lg:px-8'>
          <p className='text-blue-500 font-bold text-base sm:text-xl md:text-2xl lg:text-3xl pl-2 mb-2 sm:mb-4 text-center sm:text-left'>
            Погода в: {city}
          </p>

          {weather?.days?.map(day => {
            const dayResult = result.find(r => r.date === day.datetime);
            return (
              <Link 
                key={day.datetime} 
                to={'today'} 
                onClick={() => setDay(day)}
              >
                <div className='bg-white rounded-2xl shadow-2xl p-3 sm:p-4 mt-2 mb-4 overflow-x-auto hover:shadow-xl transition-shadow'>
                  <div className='text-center sm:text-left mb-2'>
                    <p className={`${getToday() === day.datetime ? 'text-red-500 font-bold' : 'text-blue-500'} text-sm sm:text-lg md:text-xl lg:text-2xl`}>
                      {getToday() === day.datetime ? 'Сегодня ' : ''}
                      {getDayName(day.datetime)} {getWeekday(day.datetime)}
                    </p>
                  </div>

                  <div className='overflow-x-auto'>
                    <table className='w-full text-gray-500 text-center border-separate border-spacing-1 sm:border-spacing-2 min-w-[500px] sm:min-w-0'>
                      <thead>
                        <tr className='text-xs sm:text-sm md:text-base'>
                          <th className='p-1 sm:p-2'></th>
                          <th className='p-1 sm:p-2'>🌡️ Темп.</th>
                          <th className='p-1 sm:p-2'>💨 Ветер</th>
                          <th className='p-1 sm:p-2'>💧 Влаж.</th>
                          <th className='p-1 sm:p-2'>📊 Давл.</th>
                        </tr>
                      </thead>
                      <tbody className='text-xs sm:text-sm md:text-base'>
                        {['Утро', 'День', 'Вечер', 'Ночь'].map(period => {
                          const icons = {
                            Утро: weatherIcons.sunrise || '🌅',
                            День: weatherIcons.sunset || '🌇',
                            Вечер: weatherIcons.moonPase || '🌙',
                            Ночь: weatherIcons.moonPase || '🌙'
                          };
                          return (
                            <tr key={period} className='hover:bg-gray-50'>
                              <td className='p-1 sm:p-2 font-medium text-xs sm:text-sm md:text-base'>{icons[period]} {period}</td>
                              <td className='p-1 sm:p-2 text-xs sm:text-sm md:text-base'>{dayResult ? `${dayResult[period]}°C` : '-'}</td>
                              <td className='p-1 sm:p-2 text-xs sm:text-sm md:text-base'>{dayResult ? `${dayResult[`${period}Ветер`]} м/с` : '-'}</td>
                              <td className='p-1 sm:p-2 text-xs sm:text-sm md:text-base'>{dayResult ? `${dayResult[`${period}Влажность`]}%` : '-'}</td>
                              <td className='p-1 sm:p-2 text-xs sm:text-sm md:text-base'>{dayResult ? `${dayResult[`${period}Давление`]} гПа` : '-'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}