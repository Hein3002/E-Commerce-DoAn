import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { ROUTER } from '../../../utils/urls';

interface Props {
    relatedProduct: any;
}

const RelatedProduct: React.FC<Props> = ({ relatedProduct }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)
    
    const fetchData = async () => {
        setLoading(true)
        setData(relatedProduct)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [relatedProduct])

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {

    }
    
    
    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-xl font-semibold py-4'>Related Product</h2>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,218px))] justify-center md:justify-start md:gap-y-9 md:gap-x-9 overflow-x-scroll scrollbar-none transition-all'>
                {
                    loading ? (
                        <p>loading...</p>
                    ) : (
                        data.map((item: any, index: any) => (
                            <Link to={`${ROUTER.USER.DETAIL}?id=`+item.id} key={index} className='w-full min-w-[280px] md:min-w-[120px] max-w-[280px] md:max-w-[220px] bg-white rounded shadow'>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[150px] flex justify-center items-center'>
                                    <img src={'images/product/' + item?.first_image?.image} className='object-cover h-full hover:scale-110 rounded transition-all' alt={item.name} />
                                </div>
                                <div className='p-4 grid gap-1'>
                                    <h2 className='font-medium font-sans text-base md:text-lg text-ellipsis line-clamp-1 capitalize'>
                                        {item.name}
                                    </h2>
                                    <p className='capitalize text-slate-500'>
                                        {item.catid}
                                    </p>
                                    <p className='capitalize text-slate-500'>
                                        {item.brandid}
                                    </p>
                                    <div className='flex items-center gap-2'>
                                        <p className='text-orange-500 font-medium'>
                                            {(item.discount)}
                                        </p>
                                        <p className='text-slate-500 line-through text-xs'>
                                            {(item.price)}
                                        </p>
                                    </div>
                                    <button onClick={(e) => handleAddToCart(e, item.id)} className='bg-orange-500 hover:bg-orange-600 text-white px-3 rounded-full py-0.5 text-sm'>
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        ))
                    )
                }

                {/** pagination */}
                
            </div>
        </div>
    )
}

export default RelatedProduct
