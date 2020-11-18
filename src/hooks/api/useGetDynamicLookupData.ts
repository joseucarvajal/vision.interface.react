import { useState } from "react";
import { useQuery } from "react-query";
import { useClarityApi, ApiEndPoints } from "../../api";
import { IApiError } from "../../shared/contracts/types";

export default function useGetDynamicLookupData(lookupCode: string) {

  const [lookupFilter, setLookupFilter] = useState('');

  console.log('*********useGetDynamicLookupData', lookupCode);
  const api = useClarityApi();

  const doRequestFn = async (_: any, lookupCodeValue: string, lookupFilterValue: string): Promise<any> => {
    const { data } = await api.get(`${ApiEndPoints.GetDynamicLookupValues}?env=dev&lookupCode=${lookupCodeValue}&filter=${lookupFilterValue}`);
    console.log('***useGetDynamicLookupData', `${ApiEndPoints.GetDynamicLookupValues}?env=dev&lookupCode=${lookupCodeValue}&filter=${lookupFilterValue}`, data);
    return data;
  }

  const { error, isLoading, data } = useQuery<any, IApiError>(
    [lookupCode, lookupCode, lookupFilter],
    doRequestFn,
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: 0,
    }
  );

    return { setLookupFilter, error, isLoading, data };
}

