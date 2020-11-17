import { useQuery } from "react-query";
import { useClarityApi, ApiEndPoints } from "../../api";
import { IInterfaceForm, IApiError } from "../../shared/contracts/types";

export default function useGetFormDefinition(interfaceCode: string, env: string) {

  const api = useClarityApi();

  const doRequestFn = async (_: any): Promise<IInterfaceForm> => {
    const { data } = await api.get(`${ApiEndPoints.GetForm}?env=${env}&interfaceCode=${interfaceCode}`);
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
