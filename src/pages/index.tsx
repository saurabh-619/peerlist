import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header";
import { OAUTH_API } from "../utils/constants";

const Home: NextPage = () => {
  console.log({ cookies: document.cookie });
  return (
    <div className="flex items-center justify-center h-screen">
      <Header title="Peerlist | Login" />
      <Link href={OAUTH_API} passHref>
        <button className="px-4 py-2 text-sm text-white bg-black rounded-md">
          Integrate Dribbble
        </button>
      </Link>
    </div>
  );
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   const access_token =
// }

export default Home;
