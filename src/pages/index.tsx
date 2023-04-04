import Head from "next/head";
import { ChangeEvent, useState } from "react";

import guests from "@/constants/guests.json";

export default function Home() {
  const [premiumCount, setPremiumCount] = useState(3);
  const [economyCount, setEconomyCount] = useState(3);
  const [remainGuests, setRemain] = useState<number[]>([...guests]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (key === "premiumCount") {
      setPremiumCount(parseInt(e?.target?.value));
    }
    if (key === "economyCount") {
      setEconomyCount(parseInt(e?.target?.value));
    }
  };

  const handleEngage = () => {};

  return (
    <>
      <Head>
        <title>Auto Hotel Engagement</title>
      </Head>
      <main>
        <h1 className="font-bold text-3xl text-center mt-10">
          Automatic Hotel Engagement System
        </h1>
        <div className="container mx-auto">
          <div data-testid="remain-guests">
            <div className="font-bold text-xl">
              Remain Guests ({remainGuests.length})
            </div>
            <div className="mt-5 flex">
              {remainGuests?.map((guestPrice, index) => (
                <div className="mr-2" key={`guest-${index}`}>
                  <img
                    src="assets/images/user_icon.png"
                    width={100}
                    height={100}
                  />
                  <p className="text-center">{`EUR ${guestPrice}`}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 text-md mt-5 mx-auto items-end">
            <div>
              <label
                htmlFor="premium-count"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Free Premium Rooms
              </label>
              <input
                type="number"
                id="premium-count"
                data-testid="premium-count"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={premiumCount}
                onChange={(e) => handleChange(e, "premiumCount")}
                required
              />
            </div>
            <div>
              <label
                htmlFor="economy-count"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Free Economy Rooms
              </label>
              <input
                type="number"
                id="economy-count"
                data-testid="economy-count"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={economyCount}
                onChange={(e) => handleChange(e, "economyCount")}
                required
              />
            </div>
            <div>
              <button
                type="button"
                data-testid="button-engage"
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleEngage}
              >
                Auto Engage
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
