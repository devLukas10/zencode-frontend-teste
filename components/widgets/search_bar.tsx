import  {BiSearch} from 'react-icons/bi';


export function SearchBar({
    //onChange = ()=>{},
}) {
    return <div className="flex h-[50px] w-full items-center justify-between max-w-[300px] p-4 rounded-md bg-white gap-4 "
    >
        <BiSearch color='gray' />
        <input
            type='search'
            placeholder='Seacrh'
            className='w-full text-[11pt]'
            //onChange={onChange}
        />
    </div>
}