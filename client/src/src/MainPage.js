import React,{ useEffect, useState } from 'react';
import axios from "axios";

export const MainPage = () => {

  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0)  
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0)
  const [currencyNames, setCurrencyNames] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.get("http://localhost:7000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      setAmountInTargetCurrency(response.data);

    }catch (err){
      console.error(err);
    }
  };

  useEffect(() => {
    const getCurrencyNames = async() => {
      try{
        const response = await axios.get(
          "http://localhost:7000/getAllCurrencies"
        )
        setCurrencyNames(response.data);
      }catch(err){
        console.error(err);
      }
    };
    getCurrencyNames()
  }, [])

  return (
    <div>
      <h1 
        className=' lg:mx-32 text-5xl font-bold text-blue-400 '>
          Currency Time Traveler
      </h1>
      <p 
        className=' lg:mx-32 opacity-40 py-6 '>
          Welcome to "Currency Time Traveler"! Convert currencies instantly with live exchange rates and dive into the past or future to discover rates from specific dates. Perfect for travelers, financial planners, or the curious—your ultimate currency conversion tool.
      </p>

      <div 
        className=' mt-5 flex items-center justify-center flex-col'>
          <section 
            className=' w-full lg:w-1/2'>
              <form onSubmit={handleSubmit}>

                <div 
                  className="mb-4">
                    <label 
                      htmlFor={date} 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Date
                    </label>
                    <input 
                      onChange={(e) => setDate(e.target.value)}
                      type="date" 
                      id={date} 
                      name={date} 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required />
                </div>

                <div 
                  className="mb-4">
                  <label 
                    htmlFor={sourceCurrency} 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Source Currency
                  </label>
                  <select 
                    onChange={(e) => setSourceCurrency(e.target.value)}
                    name={sourceCurrency} 
                    id={sourceCurrency} 
                    value={sourceCurrency} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required>
                    <option 
                      value="">
                        Select Source Currency
                    </option>

                    {Object.keys(currencyNames).map((currency) => (
                      <option className='p-1' key={currency} value={currency}>
                        {currencyNames[currency]}
                      </option>
                    ))}
                  </select>
                </div>

                <div 
                  className="mb-4">
                  <label 
                    htmlFor={targetCurrency}  
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Target Currency
                  </label>
                  <select 
                    onChange={(e) => setTargetCurrency(e.target.value)}
                    name={targetCurrency} 
                    id={targetCurrency} 
                    value={targetCurrency}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required>
                    <option 
                      value="">
                        Select Targey Currency
                    </option>

                    {Object.keys(currencyNames).map((currency) => (
                      <option className='p-1' key={currency} value={currency}>
                        {currencyNames[currency]}
                      </option>
                    ))}
                  </select>
                </div>

                <div 
                  className="mb-4">
                  <label 
                    htmlFor={amountInSourceCurrency} 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Amount in Source Currency
                  </label>
                  <input 
                    onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                    type="text" 
                    name={amountInSourceCurrency} 
                    id={amountInSourceCurrency} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Amount in Source Currency' 
                    required />
                </div>

                <button 
                  className=' bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md '>
                    Get the Target Currency
                </button>

          </form>
        </section>
      </div>
      {amountInTargetCurrency}
    </div>
  )
}
