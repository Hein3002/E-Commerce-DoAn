import React, { useState } from 'react';

interface Props {
  defaultValue: number;
  onValueChange: (value: number) => void;
}

const InputNumber: React.FC<Props> = ({ defaultValue, onValueChange }) => {
  const [quantity, setQuantity] = useState(defaultValue);

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onValueChange(quantity - 1);
    }
  };

  const increment = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
      onValueChange(quantity + 1);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setQuantity(newValue);
    onValueChange(newValue);
  };

  return (
    <form className="max-w-xs mt-3 mb-3">
      <div className="relative flex items-center max-w-[11rem]">
        <button
          type="button"
          onClick={decrement}
          className="border-orange-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 border rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
          </svg>
        </button>
        <input
          readOnly
          value={quantity}
          onChange={handleChange}
          className="border-orange-400 border bg-gray-50 border-x-0 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="button"
          onClick={increment}
          className="border-orange-400 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 border rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default InputNumber;
