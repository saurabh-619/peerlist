import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header";
import { OAUTH_API } from "../utils/constants";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Header title="Peerlist | Login" />
      <Link href={OAUTH_API} passHref>
        <button className="px-4 py-2 text-sm text-white transition duration-200 bg-black rounded-md focus:ring-4 focus:ring-gray-400 ring-opacity-60">
          Integrate Dribbble
        </button>
      </Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const access_token = context.req.cookies["access_token"];
  if (access_token) {
    context.res.setHeader(
      "set-cookie",
      "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    );
  }
  return {
    props: {},
  };
};

export default Home;
