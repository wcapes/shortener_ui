import React from "react";
import { Button, Divider } from "antd";

/**
 * @typedef {Object} PricingTier
 * @property {string} name
 * @property {string|number} price
 * @property {string} period
 * @property {string} description
 * @property {string[]} features
 * @property {string} buttonText
 * @property {string} [highlight] - e.g. "Best Value"
 * @property {string} [buttonType] - e.g. 'primary', 'default'
 * @property {string} [buttonClass]
 */

export default function PricingCard({
  name,
  price,
  period,
  description,
  features,
  buttonText,
  highlight,
  buttonType = "primary",
  buttonClass = "",
}) {
  return (
    <div className="shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg bg-white flex flex-col h-full relative">
      {highlight && (
        <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg font-medium z-10">
          {highlight}
        </div>
      )}
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <div className="text-4xl font-bold text-gray-900 mb-4">
          {typeof price === "number" ? `$${price}` : price}
          <span className="text-lg text-gray-500 font-normal">{period}</span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <Divider />
        
        <ul className="mb-6 space-y-2 text-gray-700 text-sm">
          {features.map((feat, i) => (
            <li key={i}>{feat}</li>
          ))}
        </ul>
        <div className="flex-1" />
        <Button
          type={buttonType}
          size="large"
          block
          className={`bg-indigo-600 hover:bg-indigo-700 border-none cursor-pointer !rounded-button whitespace-nowrap ${buttonClass}`}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}