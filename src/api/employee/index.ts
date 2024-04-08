// 统一管理商店相关接口
import {http} from '@/api/http'
import {ModuleTypeEnum, RequestHttpEnum} from '@/enums/httpEnum'
import {httpErrorHandle} from '@/utils'
import {Employee, EmployeeResponseData} from "@/api/employee/type";

export const reqEmployeeList = (page: number, size: number, name: string, nickname: string) => {
    try {
        return http(RequestHttpEnum.GET)<EmployeeResponseData>(`${ModuleTypeEnum.EMPLOYEE}/list`, {
            page,
            size,
            name,
            nickname
        });
    } catch (err) {
        httpErrorHandle()
    }
}

export const reqAddOrUpdateEmployee = (data: Employee) => {
    return http(RequestHttpEnum.POST)(`${ModuleTypeEnum.EMPLOYEE}/update`, data)
}

export const reqRemoveEmployee = (spuTypeId: string) => {
    return http(RequestHttpEnum.DELETE)(`${ModuleTypeEnum.EMPLOYEE}/remove`, {id: spuTypeId})
}

export const reqDeleteSelectEmployee = (idList: string[]) => {
    return http(RequestHttpEnum.DELETE)(`${ModuleTypeEnum.EMPLOYEE}/remove-batch`, {ids: idList})
}
