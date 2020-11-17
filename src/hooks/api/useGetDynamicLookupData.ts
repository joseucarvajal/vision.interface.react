import { useQuery } from "react-query";
import { useClarityApi, ApiEndPoints } from "../../api";
import { IApiError, IDynamicLookupValues } from "../../shared/contracts/types";

export default function useGetDynamicLookupData(lookupCode: string, filter: string) {

  console.log('*********useGetDynamicLookupData', lookupCode);
  const api = useClarityApi();

  const doRequestFn = async (_: any): Promise<any> => {
    const { data } = await api.get(`${ApiEndPoints.GetDynamicLookupValues}?env=dev&lookupCode=${lookupCode}&filter=${filter}`);
    console.log('*********useGetDynamicLookupData', data);
    return data;
  }

  return useQuery<any, IApiError>(
    [lookupCode],
    doRequestFn,
    {
      refetchOnWindowFocus: false,
      //staleTime: Infinity,
      cacheTime: 0,
    }
  );

}

