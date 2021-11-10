import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ACCESS_TOKEN_API } from "../utils/constants";

interface ICallbackProps {
  accessToken: string;
}

const Callback: NextPage<ICallbackProps> = ({ accessToken }) => {
  const router = useRouter();

  useEffect(() => {
    // Have to use inside useEffect as this code is gonna run on server side first
    if (accessToken) {
      router.replace("/myshots");
    } else {
      router.replace("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">Loading ...</div>
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
