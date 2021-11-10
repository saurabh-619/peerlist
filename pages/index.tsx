import type { NextPage } from "next";
import Head from "next/head";

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
      <button className="px-4 py-2 text-sm text-white bg-black rounded-md">
        Integrate Dribble
      </button>
    </div>
  );
};

export default Home;
