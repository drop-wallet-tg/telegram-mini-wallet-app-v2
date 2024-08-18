import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import {decode as base64_decode} from 'base-64';
import { useCallback, useEffect } from "react";
const App = dynamic(()=>import("@/components/App"),{ssr:false})

const IndexPage = () => {
  const search = useSearchParams()
  const param = search.get("tgWebAppStartParam") as string
  const router = useRouter();

  const getParam = useCallback(()=>{
    const param = search.get("tgWebAppStartParam") as string;
    if(param != null){
      router.push(`/?${base64_decode(param)}`)
    }
  },[param])

  useEffect(()=>{
    getParam()
  },[getParam])
  return (
    <App/>
  );
};

export default IndexPage;