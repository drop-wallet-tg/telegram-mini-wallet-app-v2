"use client"
import Link from "next/link";

type Item = {
    link: string,
    icon: string | any
}

export default function LinkComponents({item}:{item:any}){
    const selectIndex = Number(localStorage.getItem("index"))??0;

    const handleSelectIndex = (i:number) =>{
        localStorage.setItem("index",i.toString())
    }

    return(
        item.map((data: Item,i: number)=>{
            return(
                <Link className={`${selectIndex==i?"border-t-2 border-[#6c61ff]":""} duration-500 px-3 py-4`} key={i} href={data.link} onClick={()=>handleSelectIndex(i)}>
                    <img width={30} src={data.icon} alt="icon" />
                </Link>
            )
        })
    )
}