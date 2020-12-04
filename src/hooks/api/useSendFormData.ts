import { ApiEndPoints, useClarityApi } from "../../api";
import { IInterfaceForm } from "../../shared/contracts/types";


export default function useSendFormData(data: IInterfaceForm|undefined) {

    const api = useClarityApi();

    const sendDataToClarity = async () => {   
        if(data === undefined){
            console.log("Data UNDEFINED");
            return false;
        }
        else{
            //console.log("Send Data", JSON.stringify(data));
            //const result = await api.post(`${ApiEndPoints.SaveForm}`, data);
            const result = await api.post(`${ApiEndPoints.SaveForm}`, data).then((res) => {
                console.log(res.data)
                return true;
            }).catch((err) => {
                console.log(err.response );
                return false;
            });

            return result;
            // window.alert('Success');
            //window.location.reload();

        }
    }

    return sendDataToClarity;
}
