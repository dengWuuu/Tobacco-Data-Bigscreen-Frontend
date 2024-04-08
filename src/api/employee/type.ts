export type Employees = Employee[]

export interface Employee {
    id?: string
    username?: string
    nickname?: string
    createTime?: string
    updateTime?: string
}

export interface EmployeeResponseData {
    employees: Employees
    total: number
    size: number
    current: number
    pages: number
}
