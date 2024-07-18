import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Context from '../../context/context';
import BadgeCart from '../share/badge';
import Logo from '../logo';
import { apiLogout } from '../../services/authenticate.services';
import InputSearch from '../../layout/component/input_search';
import Tippy from '@tippyjs/react';
import Wrapper from '../Popper/Wrapper';
import { ROUTER } from '../../utils/urls';
import ButtonCustom from '../button/button';

const Header = () => {
    const [login, setLongin] = useState(true);
    const handleLogOut = async () => {
        let results = await apiLogout({});
        if (results.success) {
            window.localStorage.removeItem("ACCESS_TOKEN")
            setLongin(false);
        }
    }
    const location =useLocation()   
    
    useEffect(() => {
        window.localStorage.getItem("ACCESS_TOKEN") ? setLongin(true) : setLongin(false)
    }, [window.localStorage.getItem("ACCESS_TOKEN")])

    const context = useContext(Context);         

    return (
        <header className='h-16 shadow-md bg-white fixed w-full z-40'>
            <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                <div className=''>
                    <Link to={"/"}>
                        <Logo w={90} h={50} />
                    </Link>
                </div>
                {/** search */}
                <InputSearch />
                <div className='flex items-center gap-7'>
                    {
                        !!login && location.pathname !== '/cart' && (
                            <div>
                                <Tippy
                                    interactive
                                    placement="bottom-end"
                                    content={
                                        <div className=' w-96 transform translate-x-24 ' tabIndex={-1}>
                                            <Wrapper>
                                                {
                                                    context?.cart?.map((item: any) => (
                                                        <Link to={`${ROUTER.USER.DETAIL}?id=`+item?.products?.id} key={item.id} className='flex items-center w-full px-4 py-2 cursor-pointer hover:bg-slate-200'>
                                                            <img className='w-10 h-10 object-cover mr-2' src={'images/product/'+item?.products?.first_image?.image}
                                                                alt='hien' />
                                                            <div className='flex-1 overflow-hidden'>
                                                                <div className='flex'>
                                                                    <h4 className='whitespace-nowrap text-ellipsis overflow-hidden mr-2 flex-1'>{item?.products?.name}</h4>
                                                                    <span className='text-orange-400'>${item?.price}</span>
                                                                </div>
                                                            </div>

                                                        </Link>
                                                    ))
                                                }       
                                                <ButtonCustom dataPath={'/cart'}/>                                         
                                            </Wrapper>
                                          
                                        </div>
                                    }
                                >
                                    <Link to={'/cart'} className='block text-2xl relative'>
                                        <BadgeCart CountCart={(context?.cart?.length)} />
                                    </Link>
                                </Tippy>
                            </div>
                        )
                    }

                    <div>
                        {
                            login ? (
                                <Link to={"/"}>
                                    <button className='px-2 py-1 rounded-full text-white bg-orange-600 hover:bg-orange-700' onClick={handleLogOut}>Logout</button>
                                </Link>
                            ) : (
                                <Link to={"/login"}>
                                    <button className='px-2 py-1 rounded-full text-white bg-orange-600 hover:bg-orange-700'>Login</button>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header