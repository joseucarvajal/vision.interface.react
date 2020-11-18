import { useQuery } from "react-query";
import { useClarityApi, ApiEndPoints } from "../../api";
import { IInterfaceForm, IApiError } from "../../shared/contracts/types";

export default function useGetFormDefinition( env: string, interfaceCode: string, formType: string, id: string) {

  const api = useClarityApi();

  const doRequestFn = async (_: any): Promise<IInterfaceForm> => {
    const { data } = await api.get(`${ApiEndPoints.GetForm}?env=${env}&interfaceCode=${interfaceCode}&formType=${formType}&id=${id}`);
    return data;
  }

  return useQuery<IInterfaceForm, IApiError>(
    [ApiEndPoints.GetForm],
    doRequestFn,
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      //cacheTime: 0,
    }
  );

}
