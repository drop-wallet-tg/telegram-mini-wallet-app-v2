import dynamic from "next/dynamic"

const Home = dynamic(()=>import("@/components/Home"),{ssr:false})

const IndexPage = () => {
  return (
    <Home/>
  );
};

export default IndexPage;