export type SpuTypes = SpuType[]

export interface SpuType {
    id?: string
    name?: string
    createTime?: string
    updateTime?: string
}

export interface SpuTypeResponseData {
    spuTypes: SpuTypes
    total: number
    size: number
    current: number
    pages: number
}
