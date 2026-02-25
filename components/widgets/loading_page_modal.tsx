"use client"
import { useState, useEffect } from "react";

export function LoadingPageModal() {
    const [loding, setLoading] = useState<boolean>(false);

    useEffect(()=> {
        setTimeout(()=>{ setLoading(false) }, 2500);
    }, []);

    if(!loding) return <div className="hidden"></div>;

    return <div className="w-full h-screen fixed flex items-center justify-center bg-white sheet-modal-container">
        <div className="load-button w-[40px] h-[40px] rounded-full"></div>
    </div>
}