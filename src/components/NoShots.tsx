import { NextPage } from "next";
import NextImage from "next/image";

interface INoShotsProps {
  userUrl?: string;
}

const NoShots: NextPage<INoShotsProps> = ({ userUrl }) => {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <h2 className="block text-gray-600 xs:text-base sm:text-lg md:text-xl">
        Looks extremely empty in here.
      </h2>
      <a
        href={userUrl}
        target="_blank"
        referrerPolicy="no-referrer"
        className="flex items-center justify-center px-2 py-2 mt-5 transition duration-200 bg-green-500 rounded-md sm:px-3 sm:py-2 focus:ring-4 focus:ring-green-300"
      >
        <span className="mr-2 text-sm font-semibold text-white sm:text-base">
          Let's start
        </span>
        <NextImage
          src={"/dribbble-ball.svg"}
          width="20"
          height="20"
          objectFit="contain"
        />
      </a>
    </div>
  );
};

export default NoShots;
