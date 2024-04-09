// 统一管理商店相关接口
import {http} from '@/api/http'
import {ModuleTypeEnum, RequestHttpEnum} from '@/enums/httpEnum'
import {httpErrorHandle} from '@/utils'
import {Spu, SpuResponseData} from "@/api/spu/type";

export const reqSpuList = (page: number, size: number, skuName: string) => {
    try {
        return http(RequestHttpEnum.GET)<SpuResponseData>(`${ModuleTypeEnum.SPU}/list`, {
            page,
            size,
            skuName
        });
    } catch (err) {
        httpErrorHandle()
    }
}

export const reqAddOrUpdateSpu = (data: Spu) => {
    return http(RequestHttpEnum.POST)(`${ModuleTypeEnum.SPU}/update`, data)
}

export const reqRemoveSpu = (spuTypeId: string) => {
    return http(RequestHttpEnum.DELETE)(`${ModuleTypeEnum.SPU}/remove`, {id: spuTypeId})
}

export const reqDeleteSelectSpu = (idList: string[]) => {
    return http(RequestHttpEnum.DELETE)(`${ModuleTypeEnum.SPU}/remove-batch`, {ids: idList})
}
