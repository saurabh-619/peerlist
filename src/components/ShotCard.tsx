import { NextPage } from "next";
import { ShotType } from "../pages/myshots";

interface IShotCardProps {
  shot: ShotType;
}

const ShotCard: NextPage<IShotCardProps> = ({ shot }) => {
  return (
    <div className="w-full border border-gray-200 rounded-md h-96">
      <div className="w-full image h-5/6">
        <img src={shot.image} width="100%" height="100%" />
      </div>
      <h3 className="flex items-center px-4 mt-1 text-lg font-semibold text-left text-gray-700 h-1/6">
        {shot.title}
      </h3>
    </div>
  );
};

export default ShotCard;
