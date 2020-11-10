import { useQuery } from "react-query";
import { 
  useClarityApi, 
  ApiEndPoints 
} from "../../api";
import { 
  IInterfaceForm, 
  IApiError 
} from "../../shared/contracts/types";

export default function useGetFormDefinition(interfaceCode: string) {

  const api = useClarityApi();

  const doRequestFn = async (_: any, interfaceCode: string): Promise<IInterfaceForm> => {
    const { data } = await api.get(`${ApiEndPoints.GetForm}/${interfaceCode}`);
    return data;
  }

  return useQuery<IInterfaceForm, IApiError>(
    [ApiEndPoints.GetForm],
    doRequestFn,
    {
      refetchOnWindowFocus: false,
      //staleTime: 5000,
      //cacheTime: 0,
    }
  );

}
