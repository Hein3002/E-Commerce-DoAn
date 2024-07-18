import React, { useContext, useEffect, useState } from 'react';
import { apiDeleteData, apiUpdateData } from '../../services/user/cart.services';
import Context from '../../context/context';
import { IoAddOutline } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { message } from 'antd';
import ProductType from '../../model/product.model';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
    type NotificationType = 'success' | 'info' | 'warning' | 'error';
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';

    const openMessage = (type: NotificationType, content: string) => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: type,
                content: content,
                duration: 2,
            });
        }, 400);
    };

    const [data, setData] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(false);
    const loadingCart = new Array().fill(10);

    const context = useContext(Context);

    const increaseQty = async (id: string, quatity: number) => {
        quatity += 1;
        const response = await apiUpdateData({
            id: id,
            quantity: quatity,
        });
        if (response.success) {
            context?.fetchDataToCart();
        }
    };

    const decreaseQty = async (id: string, quatity: number) => {
        quatity -= 1;
        const response = await apiUpdateData({
            id: id,
            quantity: quatity,
        });
        if (response.success) {
            context?.fetchDataToCart();
        }
    };

    const deleteCart = async (id: any) => {
        try {
            let results = await apiDeleteData(id);
            if (results.success) {
                openMessage('success', 'Delete success!')
                context?.fetchDataToCart();
            } else {
                openMessage('warning', 'Delete fail!')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        setData(context?.cart);
    }

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'})
        fetchData();
    }, [context?.cart])

    return (
        <div className='container mx-auto'>
            {contextHolder}
            <div className='flex flex-col gap-10 lg:justify-between items-end p-4'>
                {/**view cart */}
                <div className='w-full max-w-full'>
                    {loading ? (
                        loadingCart.map((_, index) => (
                            <div key={index} className='w-full bg-slate-200 h-32 my-2 border-slate-300 animate-pulse rounded'></div>
                        ))
                    ) : (
                        data?.map((item: any, index: any) => (
                            <div key={index} className=' border-b-2 w-full h-32 my-2 rounded bg-white p-1 overflow-hidden grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-full bg-slate-200 p-1 rounded'>
                                    <img src={'images/product/' + item.products.first_image.image} className='w-full h-full object-cover rounded mix-blend-multiply' />
                                </div>
                                <div className='p-4 py-2 relative flex justify-between items-center'>
                                    <div className=' w-36'>
                                        <h2 className='text-lg lg:text-base text-slate-800 font-medium text-ellipsis line-clamp-1'>{item.products.name}</h2>
                                        <p className='font-medium text-sm text-slate-500'>Color: {(item.color)}</p>
                                        <p className='font-medium text-sm text-slate-500'>Size: {(item.size)}</p>
                                    </div>
                                    <div className='w-36'>
                                        <p className='font-medium text-base text-orange-500'>${(item.products.discount)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-2 w-28'>
                                        <button onClick={() => decreaseQty(item.id, item.quantity)} className='border border-orange-600 hover:text-white hover:bg-orange-600 text-orange-600 w-6 h-6 flex items-center justify-center rounded-full'><RiSubtractFill /></button>
                                        <span className='font-medium text-orange-700'>{item.quantity}</span>
                                        <button onClick={() => increaseQty(item.id, item.quantity)} className='border border-orange-600 hover:text-white hover:bg-orange-600 text-orange-600 w-6 h-6 flex items-center justify-center rounded-full'><IoAddOutline /></button>
                                    </div>
                                    <div className='flex items-center w-36'>
                                        <p className='text-orange-600 font-semibold text-lg'>${(item.total)}</p>
                                    </div>
                                    <div className='text-orange-600 rounded-full p-2 hover:bg-orange-600 hover:text-white text-lg cursor-pointer' onClick={() => deleteCart(item.id)}>
                                        <MdDelete />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/**total */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm pt-2'>
                    {loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-200 my-2 animate-pulse'></div>
                    ) : (
                        <div className='h-36 bg-white'>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Total Price:</p>
                                <p>${(context?.total)}</p>
                            </div>
                            <Link to={'/order'} className='text-center block rounded-full hover:bg-blue-700 transition-all bg-blue-500 p-2 text-white w-full mt-4'>Payment</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Cart;
