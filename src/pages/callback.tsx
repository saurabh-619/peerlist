import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ACCESS_TOKEN_API } from "../utils/constants";
import NextImage from "next/image";

interface ICallbackProps {
  accessToken: string;
}

const Callback: NextPage<ICallbackProps> = ({ accessToken }) => {
  const router = useRouter();

  useEffect(() => {
    // Have to use inside useEffect as this code is gonna run on server side first
    // if (accessToken) {
    //   router.replace("/myshots");
    // } else {
    //   router.replace("/");
    // }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative w-10 h-10 ball-animation">
        <NextImage src="/dribbble-ball.svg" width="100%" height="100%" />
      </div>
      <h2 className="mt-3 font-medium text-gray-500">Loading all shots ...</h2>
    </div>
  );
};

export default Callback;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.query.code;
  if (!code) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  try {
    const res = await fetch(ACCESS_TOKEN_API + code, {
      method: "POST",
    });

    const data = await res.json();

    context.res.setHeader("set-cookie", `access_token=${data.access_token}`);

    return {
      props: {
        accessToken: data.access_token,
      },
    };
  } catch (e) {
    console.log({ e });
    return {
      props: {
        accessToken: null,
      },
    };
  }
};
