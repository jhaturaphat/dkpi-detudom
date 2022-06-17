export interface IKpiTpl {
    id?:number,
    indi_name_id: string,
    label: string,
    objective: string,
    formular: string,
    txt_a: string,
    txt_b: string,
    diag_a: string,
    diag_b: string,
    measure: string,
    benchmark:string,
    howtooper: string,
    ref:string,
    active_date: string,
    edit_date: string,
    edit_note:string ,
    note:string ,
    dep_care_id:number,
    frequency_id:string,
    fq_name_th?:string,
    status: string,
    total_keep?:number,
    idn_id?:any,
    idn_name_th?:string,
    idn_name_en?:string,
    idt_name_th?:string,
    idg_id?:any,
    idg_name_th?:string, 
    kpi_condition_id:number   
}


export interface IKpiScoreItem{
    id:number,
    idn_id:string,
    idn_name_th:string,
    idn_name_en:string,
    idt_name_th:string,
    idg_id:string,
    idg_name_th:string,
    label:string,
    objective:string,
    formular:string,
    txt_a:string,
    txt_b:string,
    diag_a:string,
    diag_b:string,
    measure:string,
    benchmark:string,
    howtooper:string,
    ref:string,
    active_date:string,
    edit_date:string,
    edit_note:string,
    note:string,
    dep_care_id:number,
    indi_name_id:string,
    status:string,
    symbol_id:number,
    total_keep?:number,
    frequency_id:string,
    depname_th:string,
    freqname_th:string,
    year?:number
    year_th?:number,
    kpi_condition_id:number   
}

export interface IKpiRangeYear {
    year_id:string,
    year_label:string,
    date_begin:string,
    date_end:string,
    status:string,
    create_at?:string,
    update_at?:string
}

export interface IkpiRangeItem {
    id: string;
    name_th: string;
    prefix: string;
    day: number;
    loop_id: number;
}

export interface IKpiScore {
    id?:number,
    loop_id?:number,
    target_score:number,
    score_unit:string,
    score:number,
    kpi_tpl_id:number,
    kpi_range_year_year_id:string,
    kpi_range_item_id:string,
    year_th?:string
}

export interface IDepCare {
    id:number,
    name_th:string,
    name_en:string
}

export interface IKpiUnit {
    unit_id:number,
    unit_name:string
}
