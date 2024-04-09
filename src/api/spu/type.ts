export type Spus = Spu[]

export interface Spu {
    id?: string
    skuName?: string
    type?: number
    price?: number
    purchasePrice?: number
    image?: string
    status?: number
    num?: number
    createTime?: string
    updateTime?: string
}

export interface SpuResponseData {
    spus: Spus
    total: number
    size: number
    current: number
    pages: number
}
