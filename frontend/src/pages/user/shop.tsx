import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RelatedProduct from '../../component/user/home/related_product';
import { apiGetAll } from '../../services/user/category.services';
import { apiProCat } from '../../services/user/product.services';


const Shop = () => {    
    const [data, setData] = useState<any[]>([]);
    const [dataCategory, setDataCategory] = useState<any[]>([]);
    const [dataProduct, setDataProduct] = useState<any[]>([]);
    //   const [loading, setLoading] = useState(false);

    //   const navigate = useNavigate();

    const location = useLocation();
    const urlSearch = new URLSearchParams(location.search);
    const urlCategoryListInArray = urlSearch.getAll("category");
    const searchProId = urlSearch.getAll("product").join('');
    const urlCategoryListInObject: Record<string, boolean> = {};
    urlCategoryListInArray.forEach(el => {
        urlCategoryListInObject[el] = true;
    });


    const [selectCategory, setSelectCategory] = useState<Record<string, boolean>>(urlCategoryListInObject);
    const [fillterCategoryList, setFillterCategoryList] = useState<string[]>([]);

    useEffect(() => {

        const fetchDataCategory = async () => {
            let result = await apiGetAll({})
            setDataCategory(result.data)
        }

        fetchDataCategory()

    }, [])

    useEffect(() => {
        const arrayOfCategory = Object.keys(selectCategory)
            .map(catID => selectCategory[catID] ? catID : null)
            .filter(el => el) as string[];
            setFillterCategoryList(arrayOfCategory);
        // navigate('/product-category?' + arrayOfCategory.map(category => `category=${category}`).join('&'));
    }, [selectCategory]);

    const handleSelctCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, checked } = e.target;
        setSelectCategory((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            let result = await apiProCat({
                id: fillterCategoryList.join('')
            })
            setData(result.data)
        }

        fetchData()
    }, [fillterCategoryList])


    return (
        <div className='container mx-auto p-4'>
            <div className='hidden lg:grid grid-cols-[200px,1fr]'>
                <div className='bg-white p-4 min-h-[calc(100vh-120px)] overflow-y-scroll scrollbar-none'>
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300'>
                            Sort By
                        </h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' />
                                <label>Price - Low to High</label>
                            </div>
                            <div className='flex items-center gap-3'>
                                <input type='radio' name='sortBy' />
                                <label>Price - High to Low</label>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300'>
                            Category
                        </h3>
                        <form className='text-sm flex flex-col gap-2 py-2'>
                            {dataCategory?.map((category) => (
                                <div className='flex items-center gap-2' key={category.id}>
                                    <input
                                        type='checkbox'
                                        name='category'
                                        checked={selectCategory[category.id]}
                                        value={category.name}
                                        id={category.id}
                                        onChange={handleSelctCategory}
                                    />
                                    <label htmlFor={category.id}>{category.name}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
                <div className='ml-9'>
                    {data.length !== 0 && (
                        <RelatedProduct relatedProduct={data} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
