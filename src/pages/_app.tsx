import {
  SDKProvider,
  useBackButton,
  retrieveLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars, bindViewportCSSVars,
} from '@tma.js/sdk-react';
import { type FC, useEffect, useMemo,useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useRouter as useNavigationRouter } from 'next/navigation';


import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';


const Loading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(()=>{
    const handleStart = (url:string) => (url!==router.asPath) && setLoading(true);
    const handleComplete = (url:string) => (url!==router.asPath) && setTimeout(()=>{setLoading(false)},1000);

    router.events.on('routeChangeStart',handleStart);
    router.events.on('routeChangeComplete',handleComplete);
    router.events.on('routeChangeError',handleComplete);

    return () =>{
      router.events.off('routeChangeStart',handleStart);
      router.events.off('routeChangeComplete',handleComplete);
      router.events.off('routeChangeError',handleComplete);
    }
  },[])
  return loading&&(
    <div className="loader">
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>  
  )
}

const BackButtonManipulator: FC = () => {
  const router = useRouter();
  const { back } = useNavigationRouter();
  const bb = useBackButton();

  useEffect(() => {
    if (router.pathname === '/') {
      bb.hide();
    } else {
      bb.show();
    }
  }, [router, bb]);

  useEffect(() => bb.on('click', back), [bb, back]);

  return null;
};

const App: FC<AppProps> = ({ pageProps, Component }) => {
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    if (viewport) {
      return bindViewportCSSVars(viewport);
    }
  }, [viewport]);

  return (
    <>
      <BackButtonManipulator/>
      <Component {...pageProps}/>
    </>
  );
};

const Inner: FC<AppProps> = (props) => {
  const debug = useMemo(() => {
    return typeof window === 'undefined' ? false : retrieveLaunchParams().startParam === 'debug';
  }, []);


  useEffect(() => {
    if (debug) {
      import('eruda').then(lib => lib.default.init());
    }
  }, [debug]);

  return (
    <SDKProvider acceptCustomStyles debug={debug}>
      <App {...props}/>
    </SDKProvider>
  );
};

export default function CustomApp(props: AppProps) {
  return (
    <>
      <Loading/>
      <Inner {...props}/>
    </>
  );
};
