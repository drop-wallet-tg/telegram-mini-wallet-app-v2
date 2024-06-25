import dynamic from "next/dynamic"

const PostSocialSuccess = dynamic(()=>import("@/components/Social/PostSocialSuccess"),{ssr:false})
export default function PostSocialSuccessPage(){
    return(
        <PostSocialSuccess/>
    )
}