import { QueryCache } from "react-query";
import useGetDynamicLookupData from '../api/useGetDynamicLookupData';

export default function useGetDynamicLookupDataFilter(lookupCode: string, filter: string) {
    const { error, isLoading, data } = useGetDynamicLookupData(
        lookupCode,
        filter
    );

    console.log('useGetDynamicLookupDataFilter', lookupCode);
    return data;
}