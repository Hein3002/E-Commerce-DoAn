import React, { useContext, useEffect, useState } from 'react'
import Context from '../../context/context';
import OrderType from '../../model/order.models';
import { apiGetData } from '../../services/user/order.services';
import {CheckLogin} from '../../helper/checklogin';
import OrderDetailType from '../../model/orderDetails.models';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
    CheckLogin();
    // const [data, setData] = useState<OrderType[]>([]);
    const context = useContext(Context);
    const [order, setOrder] = useState<OrderType[]>([]);
    const [orderDetail, setOrderDetail] = useState<OrderDetailType[]>([]);

    useEffect(() => {
        // setData(context?.cart);
        fetchData();
    },[context?.cart])

    const fetchData = async () => {
        let results = await apiGetData(context?.userid);
        setOrder(results?.data?.[0]);
        setOrderDetail(results?.data?.[1]);
      
    }

  

    return (
        <section className="bg-white py-8 antialiased  md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-green-500  sm:text-2xl">
                    Order Success
                </h2>
                <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
                    <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
                        {
                            orderDetail?.map((item: any, index: any) => (
                                <div key={index} className="space-y-4 p-6">
                                    <div className="flex items-center gap-6">
                                        {/* <a href="#" className="h-14 w-14 shrink-0">
                                            <img
                                                className="h-full w-full dark:hidden"
                                                src={'images/product/' + item.products.first_image.image}
                                                alt="imac image"
                                            />
                                            <img
                                                className="hidden h-full w-full dark:block"
                                                src={'images/product/' + item.products.first_image.image}
                                                alt="imac image"
                                            />
                                        </a> */}
                                        <a
                                            href="#"
                                            className="min-w-0 flex-1 font-medium text-gray-900 hover:underline "
                                        >
                                            {" "}
                                            {item?.name_product}
                                            {" "}
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-sm font-normal text-gray-500 ">
                                            <span className="font-medium text-gray-900 ">
                                                {item.color} :
                                            </span>{" "}
                                            <span className="font-medium text-gray-900 ">
                                                {item.size}
                                            </span>
                                        </p>
                                        <div className="flex items-center justify-end gap-4">
                                            <p className="text-base font-normal text-gray-900 ">
                                                x{item.quantity}
                                            </p>
                                            <p className="text-xl font-bold leading-tight text-gray-900 ">
                                                ${item.total}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        <div className="space-y-4 bg-gray-50 p-6 ">
                            <div className="space-y-2">
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="font-normal text-gray-500 dark:text-gray-400">
                                        Total
                                    </dt>
                                    <dd className="font-medium text-gray-900 ">
                                        ${order?.[0]?.moneytotal}
                                    </dd>
                                </dl>                               
                                {/* <dl className="flex items-center justify-between gap-4">
                                    <dt className="font-normal text-gray-500 dark:text-gray-400">
                                        Store Pickup
                                    </dt>
                                    <dd className="font-medium text-gray-900 ">$99</dd>
                                </dl>
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="font-normal text-gray-500 dark:text-gray-400">
                                        Tax
                                    </dt>
                                    <dd className="font-medium text-gray-900 ">
                                        $799
                                    </dd>
                                </dl> */}
                            </div>
                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                <dt className="text-lg font-bold text-gray-900 ">
                                    Into Money
                                </dt>
                                <dd className="text-lg font-bold text-gray-900 ">
                                ${order?.[0]?.moneytotal}
                                </dd>
                            </dl>
                        </div>
                    </div>
                    <div className="mt-6 grow sm:mt-8 lg:mt-0">
                        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Order history
                            </h3>
                            <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                                <li className="mb-10 ms-6">
                                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                        <svg
                                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                                            />
                                        </svg>
                                    </span>
                                    <h4 className="mb-0.5 text-base font-semibold text-gray-900 ">
                                        {order?.[0]?.district} - {order?.[0]?.province}
                                    </h4>
                                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        {order?.[0]?.address}
                                    </p>
                                </li>
                                <li className="mb-10 ms-6">
                                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                        <svg
                                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                            />
                                        </svg>
                                    </span>
                                    <h4 className="mb-0.5 text-base font-semibold text-gray-900 ">
                                        {order?.[0]?.pay}
                                    </h4>
                                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Careful delivery
                                    </p>
                                </li>
                                <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                        <svg
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 11.917 9.724 16.5 19 7.5"
                                            />
                                        </svg>
                                    </span>
                                    <h4 className="mb-0.5 font-semibold">{order?.[0]?.created_at}</h4>
                                    <p className="text-sm">order date</p>
                                </li>
                                <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                        <svg
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 11.917 9.724 16.5 19 7.5"
                                            />
                                        </svg>
                                    </span>
                                    <h4 className="mb-0.5 text-base font-semibold">
                                        {order?.[0]?.phone}
                                    </h4>
                                    <p className="text-sm">
                                        Phone
                                    </p>
                                </li>
                                <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                        <svg
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 11.917 9.724 16.5 19 7.5"
                                            />
                                        </svg>
                                    </span>
                                    <h4 className="mb-0.5 font-semibold">{order?.[0]?.email}</h4>
                                    <p className="text-sm">Email</p>
                                </li>
                                <li className="ms-6 text-primary-700 dark:text-primary-500">
                                    <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                        <svg
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 11.917 9.724 16.5 19 7.5"
                                            />
                                        </svg>
                                    </span>
                                    <div>
                                        <h4 className="mb-0.5 font-semibold">{order?.[0]?.fullname}</h4>
                                        <a href="#" className="text-sm font-medium hover:underline">
                                            Full Name
                                        </a>
                                    </div>
                                </li>
                            </ol>
                            <Link to={'/'} className="gap-4 sm:flex sm:items-center">
                                <button
                                    type="button"
                                    className="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                >
                                    Continute Shopping
                                </button>                               
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default OrderConfirmation