// 统一管理商店相关接口
import {http} from '@/api/http'
import {ModuleTypeEnum, RequestHttpEnum} from '@/enums/httpEnum'
import {httpErrorHandle} from '@/utils'
import {ShopResponseData} from "@/api/shop/type";

export const reqUserInfo = (page: number, limit: number, username: string) => {
    try {
        return http(RequestHttpEnum.GET)(`${ModuleTypeEnum.SHOP}/list`);
    } catch (err) {
        httpErrorHandle()
    }
}


