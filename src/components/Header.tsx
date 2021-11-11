import { NextPage } from "next";
import Head from "next/head";

interface IHeaderProps {
  title: string;
}

const Header: NextPage<IHeaderProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Get list of all shots with Dribble API."
      />
      <link rel="icon" href="/peerlist.png" />
    </Head>
  );
};

export default Header;
