import Head from "next/head";
import { ChangeEvent, useState } from "react";

import guests from "@/constants/guests.json";
import { sum } from "@/helpers";

export default function Home() {
  const [premiumCount, setPremiumCount] = useState(3);
  const [economyCount, setEconomyCount] = useState(3);
  const [premiumEngaged, setPremium] = useState<number[]>([]);
  const [economyEngaged, setEconomy] = useState<number[]>([]);
  const [remainGuests, setRemain] = useState<number[]>([...guests]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (key === "premiumCount") {
      setPremiumCount(parseInt(e?.target?.value));
    }
    if (key === "economyCount") {
      setEconomyCount(parseInt(e?.target?.value));
    }
    setPremium([]);
    setEconomy([]);
    setRemain([...guests]);
  };

  const handleEngage = () => {
    const guestCosts = [...guests];
    guestCosts.sort((a, b) => b - a);
    const economyGuests = guestCosts.filter((cost) => cost < 100);
    const premiumGuests = guestCosts.filter((cost) => cost >= 100);
    let premium = [];
    let economy = [];
    premium = premiumGuests.slice(0, premiumCount);
    if (economyGuests.length > economyCount) {
      if (premium.length < premiumCount) {
        premium = [
          ...premium,
          ...economyGuests.splice(0, premiumCount - premium.length),
        ];
      }
    }
    economy = economyGuests.slice(0, economyCount);
    setPremium([...premium]);
    setEconomy([...economy]);
    setRemain([
      ...premiumGuests.slice(premiumCount),
      ...economyGuests.slice(economyCount),
    ]);
  };

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
          <div className="mb-5">
            {premiumCount > 0 && (
              <div className="mt-5">
                <p className="font-bold text-xl" data-testid="premium-label">
                  Premium Rooms ({premiumEngaged.length} -{" "}
                  {` EUR ${sum(premiumEngaged)}`})
                </p>
                <div
                  className="grid grid-cols-5 gap-4 mt-3"
                  data-testid="premium-rooms"
                >
                  {Array.from(Array(premiumCount).keys()).map((index) => (
                    <div key={`premium-rooms-${index}`} className="relative">
                      <img
                        src={`assets/images/premium hotel rooms/${
                          (index % 10) + 1
                        }.jpg`}
                        className={`h-full w-full ${
                          index >= premiumEngaged.length && "blur"
                        }`}
                      />
                      {index < premiumEngaged.length && (
                        <div className="mt-5 flex absolute bottom-[-10px] left-[35px]">
                          <img
                            src="assets/images/user_icon.png"
                            width={30}
                            height={30}
                            className="mr-4"
                          />
                          <p className="text-white">{`EUR ${premiumEngaged?.[index]}`}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {economyCount > 0 && (
              <div className="mt-5">
                <p className="font-bold text-xl" data-testid="economy-label">
                  Economy Rooms ({economyEngaged.length} -{" "}
                  {` EUR ${sum(economyEngaged)}`})
                </p>
                <div
                  className="grid grid-cols-5 gap-4 mt-3"
                  data-testid="economy-rooms"
                >
                  {Array.from(Array(economyCount).keys()).map((index) => (
                    <div key={`economy-rooms-${index}`} className="relative">
                      <img
                        src={`assets/images/economy hotel rooms/${
                          (index % 10) + 1
                        }.jpg`}
                        className={`h-full w-full ${
                          index >= economyEngaged.length && "blur"
                        }`}
                      />
                      {index < economyEngaged.length && (
                        <div className="mt-5 flex absolute bottom-[-10px] left-[35px]">
                          <img
                            src="assets/images/user_icon.png"
                            width={30}
                            height={30}
                            className="mr-4"
                          />
                          <p className="text-white">{`EUR ${economyEngaged?.[index]}`}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
