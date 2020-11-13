import { IInterfaceForm } from "../../shared/contracts/types";


export default function useSendFormData(data: IInterfaceForm|undefined) {

    const sendDataToClarity = () => {   
        if(data == undefined){
            console.log("Enviar para clarity UNDEFINED");
        }
        else{
            console.log("Enviar para clarity ", JSON.stringify(data));
        }
    }

    return sendDataToClarity;

}
