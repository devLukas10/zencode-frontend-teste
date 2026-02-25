import { ReactNode } from "react";

type modalTypes = {
    show?: boolean;
    title?: string;
    className?: string;
    onDismiss?: ()=> void;
    children?: ReactNode;
    leadChild?: ReactNode;
}

export const ModalCenterSheet= ({title, children, onDismiss, show, leadChild, className}: modalTypes)=> {
    return <div className={` w-full h-screen fixed flex items-center justify-center sheet-modal ${show? 'flex' : 'hidden'}`}>
        <div className={className +" sheet-modal-container p-6"}>
            <div className="w-full flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-4">
                    {leadChild}
                    <span className="text-xl font-bold text-gray-700">
                        {title}
                    </span>
                </div>                
                <button className="p-2 flex items-center justify-center w-[30px] h-[30px] shadow-sm rounded-md cursor-pointer text-gray-600
                        hover:shadow-md
                    "
                    onClick={onDismiss}
                >
                    x
                </button>
            </div>
            <div className={className} style={{overflowY: 'auto'}}>
                {children}
            </div>
        </div>
    </div>
}

