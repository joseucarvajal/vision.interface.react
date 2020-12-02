import { ApiEndPoints, useClarityApi } from "../../api";
import { IInterfaceForm } from "../../shared/contracts/types";


export default function useSendFormData(data: IInterfaceForm|undefined) {

    const api = useClarityApi();

    const sendDataToClarity = async () => {   
        if(data === undefined){
            console.log("Data UNDEFINED");
        }
        else{
            console.log("Send Data", JSON.stringify(data));
            const result = await api.post(`${ApiEndPoints.SaveForm}`, data);
            console.log("Save Result", result);
        }
    }

    return sendDataToClarity;
}
