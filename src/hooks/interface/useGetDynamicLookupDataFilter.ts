import { QueryCache } from "react-query";
import useGetDynamicLookupData from '../api/useGetDynamicLookupData';

export default function useGetDynamicLookupDataFilter(lookupKey: string, lookupFilter: string) {
    const { error, isLoading, data } = useGetDynamicLookupData(
        lookupKey
    );

    console.log('useGetDynamicLookupDataFilter', lookupFilter);
    return data;
}