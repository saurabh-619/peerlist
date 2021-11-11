import { GetServerSideProps, NextPage } from "next";
import NextImage from "next/image";
import { SHOTS_API, USER_API, __dev__ } from "../utils/constants";
import Link from "next/link";
import NoShots from "../components/NoShots";
import ShotCard from "../components/ShotCard";
import Header from "../components/Header";
import { useState } from "react";
import ShowMore from "../components/ShowMore";
import ShotsHeader from "../components/ShotsHeader";

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
      window.scrollTo({ top: 0 });
      return setEndIndex(4);
    }
    setEndIndex((curr) => curr + 4);
  };

  return (
    <div className="max-w-md min-h-screen px-5 py-5 mx-auto sm:px-1 sm:max-w-xl md:max-w-3xl md:px-5 lg:px-0 lg:max-w-4xl">
      <Header title={`Peerlist | ${user?.name}`} />
      <ShotsHeader profileUrl={user?.url} />
      {shots?.length === 0 ? (
        <NoShots userUrl={user?.url} />
      ) : (
        <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 shots">
          {shots?.slice(0, endIndex)?.map((shot: ShotType) => (
            <ShotCard key={shot.id} shot={shot} />
          ))}
        </div>
      )}
      {shots && shots?.length !== 0 && (
        <ShowMore
          endIndex={endIndex}
          shotsLength={shots.length}
          handleClick={getNextCurrentShots}
        />
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
