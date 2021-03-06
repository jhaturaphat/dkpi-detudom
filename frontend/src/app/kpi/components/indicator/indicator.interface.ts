export interface IGroupkpi {
    id:string,
    name_th:string,
    name_en:string
}

export interface ITypekpi {
    id?:string,
    name_th?:string,
    name_en?:string,
    indi_group_id?: string
}

export interface INamekpi {
    id?:string,
    name_th?:string,
    name_en?:string,
    indi_type_id?: string
}

export interface ICondition{
    id:number,
    symbol:string,
    name_th:string
}