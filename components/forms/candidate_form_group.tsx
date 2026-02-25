import { ReactNode } from "react"

const Root = ({children,}:{children?: ReactNode})=> {
    return children;
}

const Step = ({value = 1})=> {
    return <div className="w-[40px] h-[40px] rounded-full p-2 flex items-center justify-center"
        style={{
            border: '4px solid lightgrey',
            borderTopColor: 'blue',
            borderRightColor: value >= 2 ? 'blue' : 'lightgrey',
            borderBottomColor: value >= 3 ? 'blue' : 'lightgrey',
            borderLeftColor: value >= 4 ? 'blue' : 'lightgrey',
        }}
    >
        <span className="text-gray-500 font-bold text-[11pt] ">
            {value}
        </span>
    </div>
}

export const CandidateFormGroup = {
    Root,
    Step,
}