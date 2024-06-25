import dynamic from "next/dynamic"

const PostSocial = dynamic(()=>import("@/components/Social"),{ssr:false})
export default function PostSocialPage(){
    return(
        <PostSocial/>
    )
}