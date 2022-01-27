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
}


export interface IKpiScore{
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
    total_keep?:number,
    frequency_id:string,
    depname_th:string,
    freqname_th:string,
    year?:number
    year_th?:number
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