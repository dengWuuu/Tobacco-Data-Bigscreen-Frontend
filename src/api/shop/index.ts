// 统一管理商店相关接口
import {http} from '@/api/http'
import {ModuleTypeEnum, RequestHttpEnum} from '@/enums/httpEnum'
import {httpErrorHandle} from '@/utils'
import {Shop, ShopResponseData} from "@/api/shop/type";

export const reqShopList = (page: number, size: number, shopDetail: string, shopBase: String) => {
    try {
        return http(RequestHttpEnum.GET)<ShopResponseData>(`${ModuleTypeEnum.SHOP}/list`, {page, size, shopDetail, shopBase});
    } catch (err) {
        httpErrorHandle()
    }
}

export const reqAddOrUpdateShop = (data: Shop) => {
    return http(RequestHttpEnum.POST)(`${ModuleTypeEnum.SHOP}/update`, data)
}

export const reqRemoveShop = (shopId: string) => {
    return http(RequestHttpEnum.DELETE)(`${ModuleTypeEnum.SHOP}/remove`, {id: shopId})
}

export const reqDeleteSelectShop = (idList: string[]) => {
    return http(RequestHttpEnum.DELETE)(`${ModuleTypeEnum.SHOP}/remove-batch`, {ids: idList})
}
