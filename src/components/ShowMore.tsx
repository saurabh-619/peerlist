import { NextPage } from "next";

interface IShowMoreProps {
  endIndex: number;
  shotsLength: number;
  handleClick: () => void;
}

const ShowMore: NextPage<IShowMoreProps> = ({
  endIndex,
  shotsLength,
  handleClick,
}) => {
  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-32 px-2 py-1 mx-auto my-6 border-2 border-gray-200 rounded-md cursor-pointer focus:ring-2 focus:ring-gray-200"
    >
      <span className="mr-1 font-medium">
        Show {endIndex < shotsLength ? "more" : "less"}
      </span>
      {endIndex < shotsLength ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
            className="text-gray-600"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
            className="text-gray-600"
          />
        </svg>
      )}
    </button>
  );
};

export default ShowMore;
