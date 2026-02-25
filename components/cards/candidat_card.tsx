import { APP_CONFIG } from "@/constants/app_config"
import { CandidatePersonalDataTypes } from "@/types/candidate_personal_data_types"
import { CircularAvatar } from "../widgets/circular_avatar"

export const CandidatCard = ({key, item}: {item?: CandidatePersonalDataTypes, key?: number})=> {
    return <div className="w-full max-w-[235px] p-4 bg-white rounded-md
        hover:shadow-xl shadow-sm flex flex-col items-center gap-2
        min-h-[230px] max-h-[250px] justify-between cursor-pointer
    "
        key={key}
    >
        <CircularAvatar
            src={`${APP_CONFIG.server_uri}${item?.picture}`}
            className="w-[80px] h-[80px] rounded-full bg-gray-100 "        
        />
        <span className="text-[13pt] font-bold text-gray-700 ">{item?.fullname}</span>
        <span className="text-[11pt] text-gray-500 ">{item?.position}</span>
        <button className="p-2 rounded-md text-[10pt] bg-blue-50 text-blue-400 hover:bg-blue-400 hover:text-white">View Details</button>
    </div>
}