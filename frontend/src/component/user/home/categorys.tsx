import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiGetAll } from "../../../services/user/category.services";
import { ROUTER } from "../../../utils/urls";



const Category: React.FC = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const Loading = new Array(13).fill(null)

    const fetchData = async () => {
        setLoading(true)
        let results = await apiGetAll({});
        setData(results.data);
        setLoading(false)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
                {
                    loading ? (
                        Loading.map((_, index) => (
                            <div key={"brandLoading" + index} className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden bg-slate-200">
                            </div>
                        ))
                    ) : (
                        data.map((item: any, index: any) => (
                            <Link key={item?.id} to={`${ROUTER.USER.SHOP}?category=` + item?.id} className="cursor-pointer flex flex-col items-center  rounded">
                                 <div className="w-16 h-16 md:w-24 md:h-24 rounded overflow-hidden border flex items-center justify-center">
                                    <img src={'images/category/' + item.image} alt={item.image} className="h-full object-cover rounded mix-blend-multiply hover:scale-125 transition-all" />
                                </div>
                                <p className="text-center text-sm md:text:base capitalize">
                                    {item?.name}
                                </p>
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Category
