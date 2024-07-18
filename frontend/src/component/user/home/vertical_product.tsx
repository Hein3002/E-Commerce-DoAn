import React, { useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { apiGetLatest } from '../../../services/user/product.services';
import { ROUTER } from '../../../utils/urls';

interface Props {
    relatedProduct: any;
}

const VerticalProduct: React.FC<Props> = ({ relatedProduct }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef<HTMLDivElement | null>(null)

    const fetchData = async () => {
        setLoading(true);
        setData(relatedProduct);
        setLoading(false);
    }

    const [current, setCurrent] = useState<number>(1);

    const [elementWidth, setElementWidth] = useState(0);

    useEffect(() => {
        fetchData();
        if (scrollElement.current) {
            setElementWidth(scrollElement.current.clientWidth);
            setCurrent(0);
        }
    }, [relatedProduct])

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

    const hadleAddToCart = async (e: any, id: any) => {
    }

    return (
        <div className='container mx-auto px-4 my-6 relative overflow-hidden'>
            <h2 className='text-xl font-semibold py-4'>Product Related</h2>
            <button onClick={next} className='bg-white shadow-md rounded-full p-1 absolute left-0 z-10 top-40 hidden md:block'>
                <FaAngleLeft />
            </button>
            <button onClick={prev} className='bg-white shadow-md rounded-full p-1 absolute right-0 top-40 hidden md:block z-10'>
                <FaAngleRight />
            </button>
            <div className='flex items-center gap-4 md:gap-6 translate transition-transform duration-700' style={{ transform: `translateX(${current}px)` }} ref={scrollElement}>
                {loading ? (
                    <p>loading...</p>
                ) : (
                    data.map((item: any, index: any) => (
                        <Link to={`${ROUTER.USER.DETAIL}?id=`+ item?.id} key={index} className='w-full min-w-[280px] md:min-w-[220px] max-w-[280px] md:max-w-[220px] bg-white rounded shadow'>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[150px] flex justify-center items-center'>
                                <img src={'images/product/' + item.first_image.image} className='object-cover h-full hover:scale-110 rounded transition-all' alt={item.name} />
                            </div>
                            <div className='p-4 grid gap-1'>
                                <h2 className='font-medium font-sans text-base md:text-lg text-ellipsis line-clamp-1 capitalize'>
                                    {item?.name}
                                </h2>
                                <p className='h-2 capitalize text-slate-500'>
                                </p>
                                <div className='flex items-center gap-2'>
                                    <p className='text-orange-500 font-medium'>
                                        ${(item?.discount)}
                                    </p>
                                    <p className='text-slate-500 line-through text-xs'>
                                        ${(item?.price)}
                                    </p>
                                </div>
                                <button onClick={(e) => hadleAddToCart(e, item?._id)} className='bg-orange-500 hover:bg-orange-600 text-white px-3 rounded-full py-0.5 text-sm'>
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default VerticalProduct;