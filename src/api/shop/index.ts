// 统一管理商店相关接口
import {http} from '@/api/http'
import {ModuleTypeEnum, RequestHttpEnum} from '@/enums/httpEnum'
import {httpErrorHandle} from '@/utils'
import {ShopResponseData} from "@/api/shop/type";

export const reqUserInfo = (page: number, size: number, shopName: string) => {
    try {
        return http(RequestHttpEnum.GET)(`${ModuleTypeEnum.SHOP}/list`, {page, size, shopName});
    } catch (err) {
        httpErrorHandle()
    }
}


