import { useContext } from "react";
import { contextCity, contextDatetime } from "../Components/Layout";
import { getDayName, getToday, getWeekday } from '../function/Function';
import { WiSunrise, WiSunset } from "react-icons/wi";
import { weatherIcons } from '../function/icons';
import { Link } from "react-router-dom";

export default function Today() {
  const { day } = useContext(contextDatetime);
  const { city } = useContext(contextCity);

  if (!day) {
    return (
      <div className="text-center text-red-500 pt-32 sm:pt-36 md:pt-40">
        <Link to={'/'} className="underline text-sm sm:text-base">Выберите дату</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 md:pt-28 pb-8">
      <p className="text-blue-500 pb-2 pl-4 text-base font-bold sm:text-xl md:text-2xl">
        Погода в г. {city}
      </p>
      <p className={day.datetime === getToday() 
        ? 'font-bold text-red-500 pl-4 pb-3 text-base sm:text-xl md:text-2xl' 
        : 'text-blue-500 pl-4 pb-3 text-base font-bold sm:text-xl md:text-2xl'
      }>
        {day.datetime === getToday() ? "Сегодня " : ""}{getDayName(day.datetime)} {getWeekday(day.datetime)}
      </p>
      
      <Link to={'/'}>
        <button className="rounded-xl border border-blue-500 bg-white text-sm text-blue-500 p-1.5 m-4 sm:text-base md:text-lg sm:p-2 hover:bg-blue-50 transition cursor-pointer">
          ← Назад
        </button>
      </Link>

      {/* Описание погоды на день */}
      <div className="mx-3 mt-2 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow">
        <p className="text-blue-800 text-sm sm:text-base md:text-lg font-medium text-center">
          📋 {weatherIcons.conditions} {day.description || day.conditions || 'Без осадков'}
        </p>
      </div>

      {/* Горизонтальный скролл с часами */}
      <div className='overflow-x-auto pb-5'>
        <div className='flex gap-2 px-3 min-w-max'>
          {day.hours?.map(time => (
            <div key={time.datetime} className='bg-white grid gap-1.5 border border-blue-100 rounded-xl p-2 w-52 flex-shrink-0 shadow hover:shadow-md transition sm:w-60 sm:p-3 md:w-64'>
              <p className="font-bold text-center text-sm sm:text-base md:text-lg">{time.datetime.slice(0,5)}</p>
              <p className="text-xs sm:text-sm">{weatherIcons.feelslike} {Math.round(time.feelslike)}°C</p>
              <p className="text-xs sm:text-sm">{weatherIcons.humidity} {Math.round(time.humidity)}%</p>
              <p className="text-xs sm:text-sm">{weatherIcons.windspeed} {Math.round(time.windspeed)} м/с</p>
              <p className="text-xs sm:text-sm">{weatherIcons.cloudcover} {Math.round(time.cloudcover)}%</p>
              <p className="text-xs sm:text-sm">{weatherIcons.pressure} {Math.round(time.pressure)} гПа</p>
              <p className="text-xs sm:text-sm">{weatherIcons.visibility} {time.visibility} км</p>
              <p className="text-xs sm:text-sm break-words">{time.conditions}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Блок с траекторией солнца */}
      <div className='bg-white rounded-xl shadow mx-3 mt-2 p-4'>
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Пунктирная линия - очень высокая траектория */}
            <svg className="w-full h-48 sm:h-56 md:h-64" viewBox="0 0 300 180" preserveAspectRatio="none">
              <path 
                d="M 40 160 Q 150 5, 260 160" 
                fill="none" 
                stroke="#F59E0B" 
                strokeWidth="2.5" 
                strokeDasharray="8 6"
              />
            </svg>
            
            {/* Блок рассвета: надпись + солнышко */}
            <div className="absolute left-[10%] bottom-0 transform -translate-x-1/2">
              <div className='grid items-center justify-center text-center'>
                <p className='text-blue-700 text-xs sm:text-sm mb-1'>Рассвет</p>
                <WiSunrise className="text-orange-500 text-4xl sm:text-5xl md:text-6xl" />
                <p className='text-blue-700 text-xs sm:text-sm mt-1'>{day.sunrise?.slice(0,5) || '--:--'}</p>
              </div>
            </div>
            
            {/* Блок заката: надпись + солнышко */}
            <div className="absolute right-[10%] bottom-0 transform translate-x-1/2">
              <div className='grid items-center justify-center text-center'>
                <p className='text-blue-700 text-xs sm:text-sm mb-1'>Закат</p>
                <WiSunset className="text-orange-600 text-4xl sm:text-5xl md:text-6xl" />
                <p className='text-blue-700 text-xs sm:text-sm mt-1'>{day.sunset?.slice(0,5) || '--:--'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительная информация внизу */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-4 border-t mt-6 text-xs sm:text-sm md:text-base">
          <p>🌙 Фаза луны: {day.moonphase}</p>
          <p>⚡ Сол. энергия: {day.solarenergy}</p>
          <p>☢️ Сол. радиация: {day.solarradiation}</p>
          <p>☀️ УФ индекс: {day.uvindex}</p>
        </div>
      </div>
    </div>
  );
}