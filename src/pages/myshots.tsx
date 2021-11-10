import { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { SHOTS_API, USER_API, __dev__ } from "../utils/constants";

interface UserType {
  name: string;
  email: string;
  location: string;
  avatar: string;
  bio: string;
  followers_count: number;
  url: string;
}

interface ShotType {
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
  useEffect(() => {
    console.log({ user, shots });
  }, []);
  return <div>MyShots</div>;
};

export default MyShots;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const access_token = context.req.cookies["access_token"];
    const resUser = await fetch(USER_API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.TESTING_ACCESS_TOKEN}`,
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

    const resShots = await fetch(
      (SHOTS_API + process.env.TESTING_ACCESS_TOKEN) as string,
      {
        method: "GET",
      }
    );
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
