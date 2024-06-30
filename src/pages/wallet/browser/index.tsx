import dynamic from "next/dynamic"

const Browser = dynamic(()=>import("@/components/Browser"),{ssr:false})

export default function BrowserPage(){
    return(
        <Browser/>
    )
}