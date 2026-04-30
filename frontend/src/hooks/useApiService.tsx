import { useState } from "react";
import { axiosInstance } from "../core/util";
import type { AxiosRequestConfig } from "axios";
export default function useApiService(){
    const [loading, setLoading] = useState(false);
    async function get<RespType>(route: string, params: Pick<AxiosRequestConfig, "params">): Promise<RespType>{
        setLoading(true);
        const response = await axiosInstance.get(route, params);
        const responseData = response.data;
        setLoading(false);
        return responseData.data ?? responseData;
    }
    async function post<RespType>(route: string, payload: any, params: Pick<AxiosRequestConfig, "params"> = {}): Promise<RespType>{
        setLoading(true);
        const response = await axiosInstance.post(route, payload, );
        const responseData = response.data;
        setLoading(false);
        return responseData.data ?? responseData;
    }
    async function patch<RespType>(route: string, payload: any, params: Pick<AxiosRequestConfig, "params"> = {}): Promise<RespType>{
        setLoading(true);
        const response = await axiosInstance.patch(route, payload, params);
        const responseData = response.data;
        setLoading(false);
        return responseData.data ?? responseData;
    }
    async function del<RespType>(route: string, params: Pick<AxiosRequestConfig, "params"> = {}): Promise<RespType>{
        setLoading(true);
        const response = await axiosInstance.delete(route, params);
        const responseData = response.data;
        setLoading(false);
        return responseData.data ?? responseData;
    }
    async function put<RespType>(route: string, payload: any, params: Pick<AxiosRequestConfig, "params"> = {}): Promise<RespType>{
        setLoading(true);
        const response = await axiosInstance.put(route, payload, params);
        const responseData = response.data;
        setLoading(false);
        return responseData.data ?? responseData;
    }
    return {
        loading: loading,
        get: get,
        post: post,
        put: put,
        delete: del,
        patch: patch
    };
}