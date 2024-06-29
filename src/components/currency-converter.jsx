import React, { useEffect, useState } from "react";
import Dropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConvertor = () => {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState();
  const [currencies, setCurrencies] = useState([]);
  const [favourites, setFavourite] = useState(
    JSON.parse(localStorage.getItem("favourites")) || ["INR", "USD"]
  );
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [loading, setLoading] = useState(false);

  /* tasks to do
  1. fetch the currencies
  2. 

  */

  const fetchingCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      console.log(data);
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("Error in fetching the currencies", error);
    }
  };

  useEffect(() => {
    fetchingCurrencies();
  }, []);

  const swapCurrencies = () => {
    let temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);

    let newAmount = (amount * amount) / convertedAmount;
    setConvertedAmount(newAmount);
  };

  const currConversion = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error during conversion", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-xl shadow-lg">
      <h2 className="mb-7 mt-1 text-3xl font-semibold text-gray-700 text-center">
        Currency Converter
      </h2>
      {/* from currency || swap button  || to currency */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <Dropdown
          title="From"
          currencies={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          favourites={favourites}
          setFavourite={setFavourite}
        />
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={() => swapCurrencies()}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>
        <Dropdown
          title="To"
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          favourites={favourites}
          setFavourite={setFavourite}
        />
      </div>

      {/* Enter the amount */}
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>
      {/* convert button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => currConversion()}
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Convert
        </button>
      </div>
      {/* answer section visible after the converting operation */}
      {convertedAmount && (
        <div className="mt-4 text-2xl font-medium text-center text-green-600">
          {amount} {fromCurrency} = {convertedAmount.toPrecision(4)}{" "}
          {toCurrency}
        </div>
      )}
    </div>
  );
};

export default CurrencyConvertor;

// https://api.frankfurter.app/currencies

// https://api.frankfurter.app/latest?amount=10&from=GBP&to=USD
