
import { useEffect, useState } from 'react';
import { GrSearch } from 'react-icons/gr'
import Tippy from '@tippyjs/react/headless';
import PopperWrapper from '../../component/Popper/Wrapper';
import { apiSuggest } from '../../services/user/product.services';
import { Link } from 'react-router-dom';
import { ROUTER } from '../../utils/urls';

const InputSearch = () => {
    const [searchResult, setSearchResult] = useState<Object[]>([])
    const [showResult,setShowResult] = useState(true)
    const [searchValue, setSearchValue] = useState("")

    const handleOnChange = (e: any) => {
        setSearchValue(e.target.value)
    }

    const handleShowResult =(e:any)=>{
        setShowResult(false)
    }

    useEffect(() => {

        const fetchData = async () => {
            let results = await apiSuggest({
                name: searchValue
            });
            setSearchResult(results.data);

        }

        fetchData()        
        
    }, [searchValue])

    return (
        <div className='max-w-lg min-w-72'>
            <Tippy
                interactive={true}
                visible={ searchResult.length>0 && showResult}
                onClickOutside={handleShowResult}
                render={(attrs) => (
                    <div className=' w-96' tabIndex={-1} {...attrs}>                  
                        <PopperWrapper>
                            {
                                searchResult?.map((el: any) => (
                                    <Link to={`${ROUTER.USER.SEARCH}?product=`+el.id} key={el.id} className='flex items-center w-full px-4 py-2 cursor-pointer hover:bg-slate-200' onClick={()=>setShowResult(false)}>
                                        <img className='w-10 h-10 object-cover mr-2' src={'images/product/' + el?.first_image?.image}
                                            alt='hien' />
                                        <div className='flex-1 overflow-hidden'>
                                            <div className='flex'>
                                                <h4 className='whitespace-nowrap text-ellipsis overflow-hidden mr-2 '>{el.name}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </PopperWrapper>
                    </div>

                )}
            >
                <div className='hidden lg:flex items-center w-full justify-between border rounded-full focus-within:shadow-md pl-2'>
                    <input className='w-full outline-none pl-2' type='text' placeholder='Search product ....' value={searchValue} onChange={handleOnChange} onFocus={()=>setShowResult(true)} />
                    <div className='border-slate-300 w-0.5 h-5 bg-slate-300'></div>
                    <div className='text-lg min-w-[50px] h-8 bg-white text-slate-400 flex items-center justify-center rounded-r-full cursor-pointer'>
                        <GrSearch />
                    </div>
                </div>
            </Tippy>
        </div>
    )
}

export default InputSearch