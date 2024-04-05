export type Shops = Shop[]

export interface Shop {
    id?: string
    base?: string
    createTime?: string
    updateTime?: string
}

export interface ShopResponseData {
    shops: Shops
    total: number
    size: number
    current: number
    pages: number
}
