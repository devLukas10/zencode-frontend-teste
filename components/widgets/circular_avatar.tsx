import { LuUser } from "react-icons/lu"

export function CircularAvatar({className='', src ='', onClick=()=> {}}) {
    return <div
        onClick={onClick}
        className={className +" rounded-full flex items-center justify-center"}
        style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: 'center',
            backgroundSize:'cover',
            backgroundRepeat: 'no-repeat'
        }}
    >
        {src.trim().length <= 0 ? <LuUser color='gray' /> : ''}
    </div>
}