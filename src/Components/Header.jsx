export default function Header() {
  return (
    <header className="flex justify-start items-center bg-blue-200 shadow-lg fixed top-0 w-full z-50 h-16 sm:h-20 md:h-24">
      <img 
        src="img/i.png" 
        alt="logo" 
        className="w-24 h-auto pl-2 sm:w-32 md:w-40 lg:w-48" 
      />
      <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-start ml-2 sm:ml-3 md:ml-4">
        Прогноз погоды
      </h1>
    </header>
  );
}