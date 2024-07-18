import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { apiGetByID } from '../../services/user/product.services';
import ProductType from '../../model/product.model';
import { apiPostData } from '../../services/user/cart.services'
import { apiGetByID as apiGetUser } from '../../services/user/user.services'
import InputNumber from '../../component/share/input_number';
import { message, notification } from 'antd';
import VerticalProduct from '../../component/user/home/vertical_product';
import Context from '../../context/context';

const ProductDetails = () => {
  const context = useContext(Context);
  const [data, setData] = useState<ProductType>()
  const [image, setIamge] = useState([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search);
  const searchId= urlSearch.getAll("id").join('');   
  const [loading, setLoading] = useState(false)
  const [activeImage, setActiveImage] = useState('')
  const param = useParams()
  const productImageListLoading = new Array(4).fill(null)
  const [quantity, setQuantity] = useState(1);
  const [productRelated, setProductRelated] = useState([]);

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
  

  


  const fetchData = async () => {
    setLoading(true)
    let results = await apiGetByID(searchId);
    setProductRelated(results.data?.[1]);
    setData(results?.data?.[0])
    setIamge(results?.data?.[0]?.images)
    setActiveImage('images/product/' + results?.data?.[0]?.images?.[0]?.image)
    setLoading(false)    
  }
    
  const fetchDataAddToCart = async (id: any) => {
    if (selectedColor === '' || selectedSize === '') {
      openMessage('warning', "Not enough information!");
    } else { 
      try {
        let user = await apiGetUser({});
        await apiPostData({
        size: selectedSize,
        color: selectedColor,
        proid: id,
        userid: user.id,
        quantity: quantity,
        price: data?.discount
      });
      openMessage('success', "Add success!");
      context?.fetchDataToCart();
      } catch (error) {
        openMessage('warning', "You not login!");
      }
    }
  }

  useEffect(() => {
    setSelectedColor('');
    setSelectedSize('');
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchId])

  const handleMouseEnterProduct = (image: any) => {
    setActiveImage(image)
  }

  const handleValueChange = (value: number) => {
    setQuantity(value);
  };

  return (
    <div className='container mx-auto p-4 '>
      {contextHolder}
      <div className=' min-h-[200px] flex flex-col lg:flex-row gap-20 ml-20'>
        {/**product image */}
        <div className='h-96 flex flex-col  lg:flex-row-reverse gap-6 '>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96  relative p-1 rounded'>
            <img src={activeImage} className=' h-full w-full object-scale-down mix-blend-multiply rounded' />
          </div>
          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el, index) => {
                      return (
                        <div key={index} className='bg-slate-200 rounded h-20 w-20 animate-pulse'>
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    image?.map((item: any, index: any) => {
                      return (
                        <div key={index} className='bg-slate-200 rounded h-20 w-20 p-1'>
                          <img onClick={() => handleMouseEnterProduct('images/product/' + item.image)} onMouseEnter={() => handleMouseEnterProduct('images/product/' + item.image)} src={'images/product/' + item.image} className='h-full w-full object-cover mix-blend-multiply cursor-pointer' />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>
        {/**product details */}
        <div className='flex flex-col gap-1'>
          <p className='bg-orange-200 text-orange-600 px-2 rounded-full w-fit'>{data?.brandid}</p>
          <h2 className='text-2xl lg:text-4xl font-medium' >{data?.name}</h2>
          <p className='capitalize text-slate-400'>{data?.catid}</p>
          <div className='text-orange-500 flex items-center gap-1'>
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <div className='flex items-center gap-2 text-xl lg:2xl font-medium my-1'>
            <p className='text-orange-600'>
              ${(data?.discount)}
            </p>
            <p className='text-slate-400 text-sm line-through'>
              ${(data?.price)}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-base-medium text-grey-2">Colors:</p>
            <div className="flex gap-2">
              {
                (() => {
                  const seen = new Set();
                  return data?.product_detail
                    ?.filter((item: any) => {
                      const duplicate = seen.has(item.color);
                      seen.add(item.color);
                      return !duplicate;
                    })
                    .map((item: any, index: any) => (
                      <p
                        onClick={() => setSelectedColor(item.color)}
                        key={item.color + index}
                        className={`border min-w-10 text-center border-orange-400 px-2 py-1 rounded-lg cursor-pointer ${selectedColor === item.color && 'bg-orange-500 text-white'}`}
                      >
                        {item.color}
                      </p>
                    ));
                })()
              }
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base-medium text-grey-2">Size:</p>
            <div className="flex gap-2">
              {
                (() => {
                  const seen = new Set();
                  return data?.product_detail
                    ?.filter((item: any) => {
                      const duplicate = seen.has(item.size);
                      seen.add(item.size);
                      return !duplicate;
                    })
                    .map((item: any, index: any) => (
                      <p
                        onClick={() => setSelectedSize(item.size)}
                        key={index}
                        className={`border min-w-10 text-center border-orange-400 px-2 py-1 rounded-lg cursor-pointer ${selectedSize === item.size && 'bg-orange-500 text-white'}`}
                      >
                        {item.size}
                      </p>
                    ));
                })()
              }
            </div>

            <div className=" gap-2">
              <p className="text-base-medium text-grey-2">Quantity:</p>
              <InputNumber defaultValue={1} onValueChange={handleValueChange} />
            </div>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <button onClick={() => fetchDataAddToCart(data?.id)} className='border-2 border-orange-600 rounded px-3 py-1 min-w-[120px] text-orange-600 font-medium hover:bg-orange-600 hover:text-white'>
              Add to Cart
            </button>
          </div>
          <div>
            <p className='text-slate-600 font-medium my-1'>
              Description :
            </p>
            <p>
              {data?.description}
            </p>
          </div>
        </div>

      </div>
      
      {/* {
        productRelated && (
          <RelatedProduct relatedProduct={productRelated} />
        )
      } */}

      {
        productRelated && (
          <VerticalProduct relatedProduct={productRelated} />
        )
      }
    </div>

  )
}

export default ProductDetails