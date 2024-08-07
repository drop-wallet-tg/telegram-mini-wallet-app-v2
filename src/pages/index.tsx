import dynamic from "next/dynamic"

const App = dynamic(()=>import("@/components/App"),{ssr:false})

const IndexPage = () => {
  return (
    <App/>
  );
};

export default IndexPage;