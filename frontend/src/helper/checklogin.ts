import { useNavigate } from "react-router-dom";
import { apiGetByID } from "../services/user/user.services";

const CheckLogin = () => {
    const navigate = useNavigate();

    if (!window.localStorage.getItem('ACCESS_TOKEN')) {
        navigate('/');
    }
};

const CheckValid = async () => {
    const navigate = useNavigate();

    if (!window.localStorage.getItem('ACCESS_TOKEN')) {
        navigate('/');
    }
    else{
        try {
            let results = await apiGetByID({});
            if(results.role !== 'admin'){
                navigate('/');
            }
        } catch (error) {
            navigate('/');
        }
    }
}



export {CheckValid, CheckLogin};