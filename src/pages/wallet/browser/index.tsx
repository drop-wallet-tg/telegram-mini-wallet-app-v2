import dynamic from "next/dynamic"

const Browser = dynamic(()=>import("@/components/Browser"),{ssr:false})

const BrowserPage = ()=>{
    return(
        <Browser/>
    )
}
export default BrowserPage;