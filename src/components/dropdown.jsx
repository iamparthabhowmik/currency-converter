import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi";

const Dropdown = ({
  title = "",
  currencies,
  currency,
  setCurrency,
  favourites,
  setFavourite,
}) => {
  const isFavourite = (curr) => favourites.includes(curr);

  const handleFavourites = (curr) => {
    let tempFavourites = [...favourites];
    if (isFavourite(curr)) {
      tempFavourites = tempFavourites.filter((cc) => cc !== curr);
    } else {
      tempFavourites.push(curr);
    }
    setFavourite(tempFavourites);
    localStorage.setItem("favourites", JSON.stringify(tempFavourites));
  };

  return (
    <div>
      <label
        htmlFor="title"
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {/* render favourites first  */}
          {favourites.map((curr) => {
            return (
              <option value={curr} key={curr} className="bg-gray-200">
                {curr}
              </option>
            );
          })}
          <hr />
          {/* render all the other currencies */}
          {currencies
            .filter((cc) => !isFavourite(cc))
            .map((curr) => {
              return (
                <option value={curr} key={curr}>
                  {curr}
                </option>
              );
            })}
        </select>
        <button
          onClick={() => handleFavourites(currency)}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        >
          {isFavourite(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
