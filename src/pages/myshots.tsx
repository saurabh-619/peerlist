import { GetServerSideProps, NextPage } from "next";
import NextImage from "next/image";
import { SHOTS_API, USER_API, __dev__ } from "../utils/constants";
import Link from "next/link";
import NoShots from "../components/NoShots";
import ShotCard from "../components/ShotCard";
import Header from "../components/Header";
import { useState } from "react";

interface UserType {
  name: string;
  email: string;
  location: string;
  avatar: string;
  bio: string;
  followers_count: number;
  url: string;
}

export interface ShotType {
  id: number;
  title: string;
  desc: string;
  url: string;
  image: string;
  tags: string[];
  published_at: string;
  updated_at: string;
}

interface IMyShotsProps {
  user?: UserType;
  shots?: ShotType[];
}

const MyShots: NextPage<IMyShotsProps> = ({ user, shots }) => {
  const [endIndex, setEndIndex] = useState(4);

  const getNextCurrentShots = () => {
    if (shots && endIndex >= shots.length) {
      return setEndIndex(4);
    }
    setEndIndex((curr) => curr + 4);
  };

  return (
    <div className="max-w-md min-h-screen px-5 py-5 mx-auto sm:px-1 sm:max-w-xl md:max-w-3xl md:px-5 lg:px-0 lg:max-w-4xl">
      <Header title={`Peerlist | ${user?.name}`} />
      <header className="flex items-center justify-between">
        <div className="flex items-center justify-start left">
          <div className="flex items-center w-20 h-auto mr-4 sm:w-24">
            <NextImage
              src={"/dribbble-logo.svg"}
              objectFit="contain"
              width="100%"
              height="100%"
            />
          </div>
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
            href={user?.url}
          >
            {user?.url}
          </a>
        </div>
      </header>
      <main>
        {shots?.length === 0 ? (
          <NoShots userUrl={user?.url} />
        ) : (
          <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 shots">
            {shots?.slice(0, endIndex)?.map((shot: ShotType) => (
              <ShotCard key={shot.id} shot={shot} />
            ))}
          </div>
        )}
      </main>
      {shots && shots?.length !== 0 && (
        <button
          onClick={getNextCurrentShots}
          className="flex items-center justify-center w-32 px-2 py-1 mx-auto my-6 border-2 border-gray-200 rounded-md cursor-pointer"
        >
          <span className="mr-1 font-medium">
            Show {endIndex < shots.length ? "more" : "less"}
          </span>
          {endIndex < shots.length ? (
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
      )}
    </div>
  );
};

export default MyShots;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const access_token = context.req.cookies["access_token"];

    if (!__dev__ && !access_token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const resUser = await fetch(USER_API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          __dev__ ? process.env.TESTING_ACCESS_TOKEN : access_token
        }`,
      },
    });
    const userData = await resUser.json();

    const user = {
      name: userData.name,
      email: userData.email,
      location: userData.location,
      avatar: userData.avatar_url,
      bio: userData.bio,
      followers_count: userData.followers_count,
      url: userData.html_url,
    };

    const resShots = await fetch(SHOTS_API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          __dev__ ? process.env.TESTING_ACCESS_TOKEN : access_token
        }`,
      },
    });
    const shotsData = await resShots.json();

    const shots = shotsData?.map((shot: any) => ({
      id: shot.id,
      title: shot.title,
      desc: shot.description,
      url: shot.html_url,
      image: shot.images["hidpi"],
      tags: shot.tags,
      published_at: shot.published_at,
      updated_at: shot.updated_at,
    }));

    return {
      props: {
        user,
        shots,
      },
    };
  } catch (e) {
    console.log({ e });
    return {
      props: {
        user: null,
        shots: null,
      },
    };
  }
};
