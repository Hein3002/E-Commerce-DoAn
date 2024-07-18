import React, { useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { apiGetLatest } from '../../../services/user/product.services';
import { ROUTER } from '../../../utils/urls';

const HorizontalProduct: React.FC = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const loadingList = new Array(13).fill(null)
    const scrollElement = useRef<HTMLDivElement | null>(null)

    const fetchData = async () => {
        setLoading(true)
        let results = await apiGetLatest({});
        setData(results.data);
        setLoading(false)
    }

    const [current, setCurrent] = useState<number>(1);

    const [elementWidth, setElementWidth] = useState(0);


    useEffect(() => {
        fetchData();
        if (scrollElement.current) {
            setElementWidth(scrollElement.current.clientWidth);
            setCurrent(0);
        }
    }, [])

    const next = () => {
        if (scrollElement.current) {
            const nextPosition = current - elementWidth;
            if (nextPosition >= -(scrollElement.current.scrollWidth - scrollElement.current.clientWidth)) {
                setCurrent(nextPosition);
            } else {
                setCurrent(0);
            }
        }
    }

    const prev = () => {
        if (scrollElement.current) {
            const prevPosition = current + elementWidth;
            if (prevPosition <= 0) {
                setCurrent(prevPosition);
            } else {
                setCurrent(-(scrollElement.current.scrollWidth - scrollElement.current.clientWidth));
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            next()
        }, 3000)
        return () => clearInterval(interval)
    }, [current])

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    }

    return (
        <div className='container mx-auto px-4 my-6 relative overflow-hidden'>
            <h2 className='text-xl font-semibold py-4'>Product</h2>
            <button onClick={prev} className='bg-white shadow-md rounded-full p-1 absolute left-0 z-10 top-28 hidden md:block'>
                <FaAngleLeft />
            </button>
            <button onClick={next} className='bg-white shadow-md rounded-full p-1 absolute right-0 top-28 hidden md:block z-10'>
                <FaAngleRight />
            </button>
            <div className='flex items-center gap-4 md:gap-6  translate transition-transform duration-700' style={{ transform: `translateX(${current}px)` }} ref={scrollElement}>
                {
                    loading ? (
                        loadingList.map((_, index) => (
                            <div key={"loading" + index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                </div>
                                <div className='p-4 gap-1 grid w-full'>
                                    <h2 className='bg-slate-200 font-medium font-sans text-base md:text-lg text-ellipsis line-clamp-1 capitalize p-1 animate-pulse rounded-full'>
                                    </h2>
                                    <p className='capitalize bg-slate-200 p-1 animate-pulse rounded-full'>
                                    </p>
                                    <div className='flex items-center gap-2 w-full'>
                                        <p className='p-2 bg-slate-200 w-full font-medium animate-pulse rounded-full'>
                                        </p>
                                        <p className='bg-slate-200 line-through text-xs p-2 w-full animate-pulse rounded-full'>
                                        </p>
                                    </div>
                                    <button className='text-white px-3 bg-slate-200 rounded-full py-0.5 text-sm p-1 w-full animate-pulse'>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((item: any, index: any) => (
                            <Link to={`${ROUTER.USER.DETAIL}?id=` + item?.id} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                    <img src={'images/product/' + item.first_image.image} className='object-cover rounded h-full hover:scale-110 transition-all' alt={item.name} />
                                </div>
                                <div className='p-4 grid'>
                                    <h2 className='font-medium font-sans text-base md:text-lg text-ellipsis line-clamp-1 capitalize'>
                                        {item?.name}
                                    </h2>
                                    <p className='h-2 capitalize text-slate-500'>
                                    </p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-orange-500 font-medium'>
                                            ${item?.discount}
                                        </p>
                                        <p className='text-slate-500 line-through text-xs'>
                                            ${item?.price}
                                        </p>
                                    </div>
                                    <button onClick={(e) => handleAddToCart(e, item?._id)} className='bg-orange-500 hover:bg-orange-600 text-white px-3 rounded-full py-0.5 text-sm'>
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default HorizontalProduct