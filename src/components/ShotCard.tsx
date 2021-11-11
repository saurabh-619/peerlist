import { NextPage } from "next";
import { ShotType } from "../pages/myshots";

interface IShotCardProps {
  shot: ShotType;
}

const ShotCard: NextPage<IShotCardProps> = ({ shot }) => {
  return (
    <div className="w-5/6 mx-auto border border-gray-200 rounded-md sm:w-full h-60 md:h-80 lg:h-96">
      <div className="w-full image h-5/6">
        <img
          src={shot.image}
          width="100%"
          height="100%"
          className="w-full h-full rounded-t-md"
        />
      </div>
      <h3 className="flex items-center px-4 text-base font-semibold text-left text-gray-700 md:text-lg h-1/6">
        {shot.title}
      </h3>
    </div>
  );
};

export default ShotCard;
