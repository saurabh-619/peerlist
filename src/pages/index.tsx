import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { OAUTH_API } from "../utils/constants";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Head>
        <title>Peerlist | Login</title>
        <meta
          name="description"
          content="Get list of all shots with Dribble API."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href={OAUTH_API} passHref>
        <a className="px-4 py-2 text-sm text-white bg-black rounded-md">
          Integrate Dribbble
        </a>
      </Link>
    </div>
  );
};

export default Home;
