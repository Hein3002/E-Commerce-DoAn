import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { apiGetAll } from '../../../services/user/slide.services';

const Slide: React.FC = () => {

    const [slide, setSlide] = useState<any[]>([]);
    const fetchData = async () => {
        let results = await apiGetAll({});
        setSlide(results.data);
    }

    const [currentImage, setCurrentImage] = useState<number>(0)

    const nextImage = () => {
        if (slide.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1)
        } else {
            setCurrentImage(1)
        }
    }

    const prevImage = () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1)
        } else {
            setCurrentImage(slide.length - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage()
        }, 5000)

        return () => clearInterval(interval)
    }, [currentImage])

    useEffect(()=>{
        fetchData();
        setCurrentImage(0);
    },[]);

    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='h-60 md:h-72 w-full bg-slate-200 relative'>
                <div className='absolute z-10 h-full w-full md:flex flex-col justify-center hidden'>
                    <div className='flex justify-between text-xl'>
                        <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'>
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
                <div className='hidden md:flex w-full h-full  overflow-hidden '>
                    {
                        slide?.map((item: any, index: any) => (                        
                            <div key={item.id} className='w-full h-full min-w-full min-h-full translate transition-transform duration-700' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                <img src={'images/slide/' + item?.image} className='w-full h-full object-cover' />
                            </div>                           
                        ))
                    }
                </div>
                <div className='flex w-full h-full overflow-hidden md:hidden'>
                    {
                        slide?.map((item: any, index: any) => (
                            <div key={index} className='w-full h-full min-w-full min-h-full translate transition-transform duration-700' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                <img src={'images/slide/' + item.image} className='w-full h-full object-cover' />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Slide