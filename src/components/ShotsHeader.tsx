import { NextPage } from "next";
import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IShotsHeaderProps {
  profileUrl?: string;
}

const ShotsHeader: NextPage<IShotsHeaderProps> = ({ profileUrl }) => {
  const [innerWidth, setInnerWidth] = useState(750);

  useEffect(() => {
    setInnerWidth(() => window.innerWidth);
  }, [innerWidth]);

  return (
    <header
      className={`flex items-center justify-between ${
        innerWidth < 450 ? "mb-8" : "mb-0"
      }`}
    >
      <div className="flex items-center justify-start left">
        {innerWidth > 450 ? (
          <div className="flex items-center w-20 h-auto mr-4 sm:w-24">
            <NextImage
              src={"/dribbble-logo.svg"}
              objectFit="contain"
              width="100%"
              height="100%"
              alt="Logo"
            />
          </div>
        ) : (
          <img src="/dribbble-ball.svg" alt="Logo" className="w-8 h-8 mr-4" />
        )}
        <Link href="/" passHref>
          <a className="font-medium text-gray-500 underline text-xxs sm:text-xs">
            Remove account
          </a>
        </Link>
      </div>
      <div className="right">
        <a
          className="px-2 py-1 font-medium text-gray-500 rounded-md text-xxs sm:text-xs right bg-gray-50"
          target="_blank"
          referrerPolicy="no-referrer"
          href={profileUrl}
        >
          {profileUrl}
        </a>
      </div>
    </header>
  );
};

export default ShotsHeader;
