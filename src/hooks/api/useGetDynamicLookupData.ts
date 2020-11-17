import { useQuery } from "react-query";
import { useClarityApi, ApiEndPoints } from "../../api";
import { IApiError, IDynamicLookupValues } from "../../shared/contracts/types";

export default function useGetDynamicLookupData(dynamicLookupCode: string) {

  console.log('*********useGetDynamicLookupData', dynamicLookupCode);
  const api = useClarityApi();

  const doRequestFn = async (_: any, lookupCode: string): Promise<any> => {
    const { data } = await api.get(`${ApiEndPoints.GetDynamicLookupValues}`);
    return data;
  }

  return useQuery<any, IApiError>(
    [dynamicLookupCode],
    doRequestFn,
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      //cacheTime: 0,
    }
  );

}

