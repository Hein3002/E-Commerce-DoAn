import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGetAll } from '../../services/user/product.services';
import axios from 'axios';
import { ROUTER } from '../../utils/urls';

const Product: React.FC = () => {
    const loadingList = new Array(13).fill(null);
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState([])
    const [paginate, setPaginate] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    const fetchData = async () => {
        setLoading(true)
        let results = await apiGetAll(pageSize);
        setData(results.data.data); //Data list product
        setPaginate(results.data.links); //Set link transition
        setLoading(false)
    }

    const fetchDataPaginate = async (value: any) => {
        scrollToTop();
        setLoading(true)
        let results = await axios.get(value);
        setData(results?.data?.data?.data);
        setPaginate(results?.data?.data?.links);
        setLoading(false)
    }

    useEffect(() => {
        fetchData();
    }, [pageSize])

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {

    };

    const handleChangePageSize = (e: any) => {
        setPageSize(e.target.value);
        e.preventDefault();
        scrollToTop();
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 880, behavior: 'smooth' });
    };

    return (
        <div className='container mx-auto p-4'>
            <h2 className='text-xl font-semibold py-4'>Product</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
                {loading ? (
                    loadingList?.map((item: any, index: any) => (
                        <Link
                            to={"/product/" + item?.id}
                            key={index}
                            className='w-full min-w-[280px] md:min-w-[120px] max-w-[280px] md:max-w-[220px] bg-white rounded shadow'
                            onClick={scrollToTop}
                        >
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[150px] flex justify-center items-center animate-pulse'>
                            </div>
                            <div className='p-4 grid gap-1'>
                                <h2 className='font-medium font-sans p-2 bg-slate-200 animate-pulse rounded-full text-base md:text-lg text-ellipsis line-clamp-1 capitalize'>
                                </h2>
                                <p className='capitalize text-slate-500 p-2 bg-slate-200 animate-pulse rounded-full'>
                                </p>
                                <div className='flex items-center gap-2'>
                                    <p className='text-orange-500 w-full font-medium p-2 bg-slate-200 animate-pulse rounded-full'>
                                    </p>
                                    <p className='text-slate-500 w-full line-through text-xs p-2 bg-slate-200 animate-pulse rounded-full'>
                                    </p>
                                </div>
                                <button
                                    className='animate-pulse p-2 bg-slate-200 text-white rounded-full text-sm'
                                >
                                </button>
                            </div>
                        </Link>
                    ))
                ) : (
                    data?.map((item: any, index: any) => (
                        <Link
                            to={`${ROUTER.USER.DETAIL}?id=` + item?.id}
                            key={index}
                            className='w-full min-w-[280px] md:min-w-[120px] max-w-[280px] md:max-w-[220px] bg-white rounded shadow'
                            onClick={scrollToTop}
                        >
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[150px] flex justify-center items-center'>
                                <img src={'images/product/' + item.first_image.image} className='object-cover h-full hover:scale-110 rounded transition-all' />
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
                                <p className='h-2 capitalize text-slate-500'>
                                </p>
                                <Link to={`${ROUTER.USER.SHOP}?category=` + item?.catid}>
                                <button
                                    onClick={(e) => handleAddToCart(e, item?.id)}
                                    className='bg-orange-500 hover:bg-orange-600 text-white px-3 rounded-full py-1 text-sm'
                                >
                                    Search similar products
                                </button>
                                </Link>
                               
                            </div>
                        </Link>
                    ))
                )}
            </div>

            <div className='flex justify-between items-center mt-10'>
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-base h-10">
                        {
                            paginate?.[0]?.['url'] === null ? (
                                <li>
                                    <Link
                                        to={'/'}
                                        className="cursor-not-allowed flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        Previous
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link
                                        to={'/'}
                                        onClick={() => fetchDataPaginate(paginate[0]['url'])}
                                        className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        Previous
                                    </Link>
                                </li>
                            )
                        }
                        {
                            paginate?.slice(1, -1).map((item: any, index: any) => (
                                item.active ? (<li key={index}>
                                    <Link
                                        to={'/'}
                                        onClick={() => fetchDataPaginate(item.url)}
                                        className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                </li>) : (
                                    <li key={index}>
                                        <Link
                                            to={'/'}
                                            onClick={() => fetchDataPaginate(item.url)}
                                            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                )
                            ))
                        }
                        {
                            paginate?.[paginate.length - 1]?.['url'] === null ? (
                                <li>
                                    <Link
                                        to={'/'}
                                        className="cursor-not-allowed flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        Next
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link
                                        to={'/'}
                                        onClick={() => fetchDataPaginate(paginate[paginate.length - 1]['url'])}
                                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        Next
                                    </Link>
                                </li>
                            )
                        }

                    </ul>
                </nav>

                <form className="">
                    <select
                        onChange={handleChangePageSize}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-xm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </form>

            </div>
        </div>
    );
};

export default Product;

