import { useQuery } from "react-query";
import { useClarityApi, ApiEndPoints } from "../../api";
import { IInterfaceForm, IApiError, IInterfaceRequestDTO } from "../../shared/contracts/types";

// export default function useGetFormDefinition( env: string, interfaceCode: string, formType: string, id: string, parentCode: string, currentUser: string) {
export default function useGetFormDefinition( interfaceRequestDTO : IInterfaceRequestDTO) {

  // const interfaceRequestDTO : IInterfaceRequestDTO = {
  //   env,
  //   interfaceCode,
  //   formType,
  //   id,
  //   parentCode,
  //   currentUser
  // };

  console.log("interfaceRequestDTO", interfaceRequestDTO);

  const api = useClarityApi();

  const doRequestFn = async (_: any): Promise<IInterfaceForm> => {
    //const { data } = await api.get(`${ApiEndPoints.GetForm}?env=${env}&interfaceCode=${interfaceCode}&formType=${formType}&id=${id}&parentCode=${parentCode}&currentUser=${currentUser}`);
    const { data } = await api.post(`${ApiEndPoints.GetForm}`, interfaceRequestDTO);
    // console.log('data', data);
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
