// 统一管理商店相关接口
import {http} from '@/api/http'
import {ModuleTypeEnum, RequestHttpEnum} from '@/enums/httpEnum'
import {httpErrorHandle} from '@/utils'
import {SpuType, SpuTypeResponseData} from "@/api/spu_type/type";

export const reqSpuTypeList = (page: number, size: number, typeName: string) => {
    try {
        return http(RequestHttpEnum.GET)<SpuTypeResponseData>(`${ModuleTypeEnum.SPU_TYPE}/list`, {
            page,
            size,
            name: typeName
        });
    } catch (err) {
        httpErrorHandle()
    }
}

export const reqAddOrUpdateSpuType = (data: SpuType) => {
    return http(RequestHttpEnum.POST)(`${ModuleTypeEnum.SPU_TYPE}/update`, data)
}

export const reqRemoveSpuType = (spuTypeId: string) => {
    return http(RequestHttpEnum.DELETE)(`${ModuleTypeEnum.SPU_TYPE}/remove`, {id: spuTypeId})
}

export const reqDeleteSelectSpuType = (idList: string[]) => {
    return http(RequestHttpEnum.DELETE)(`${ModuleTypeEnum.SPU_TYPE}/remove-batch`, {ids: idList})
}
