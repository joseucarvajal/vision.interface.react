import { useQueryCache } from "react-query";
import {ApiEndPoints} from "../../api/";


export default function useSendFormData() {

    const queryCache = useQueryCache();

    const data = queryCache.getQueryData([ApiEndPoints.GetForm]);
    
    const sendDataToClarity = () => {        
        console.log("Enviar para clarity ", JSON.stringify(data));
    }

    return sendDataToClarity;

}
