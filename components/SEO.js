import Head from "next/head";

const SEO = ({ title }) => {
  return (
    <Head>
      <title>
        {title ? title + " | " + "Job Tracker" : "TDWL Job Tracker"}
      </title>
      <meta name="description" content="A simple, free to use job tracker" />
    </Head>
  );
};

export default SEO;
