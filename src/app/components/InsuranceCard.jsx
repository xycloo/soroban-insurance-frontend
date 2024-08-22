"use client";

import { Card } from "flowbite-react";

export function InsuranceCard() {
  return (
    <Card
      className="max-w-sm"
    >
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Insurance name
        </h5>
      </a>
      <div className="mb-5 mt-2.5 items-center">
        <p>Volatility condition</p>
        <p>End of current period</p>
        <p>Multiplier</p>        
      </div>
      <div className="flex items-center justify-between">
        <a
          href="#"
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Purchase
        </a>
      </div>
    </Card>
  );
}
