export enum BillStatus {
    D = 'DRAFT',
    R = 'REVIEW',
    A = "APPROVED",
    I = 'ISSUED',
    X = 'BILLED',
    V = 'VOID',
}

export interface BillLine {
    billLineId?: string;
    index: number;
    description: string;
    itemCost: number | string;
    itemFormula: string;
    quantity: number | string;
    quantityFormula: string;
    lineCost: number;
    ticked: boolean;
    unit: string;
    checked?: boolean;
}

export interface BillHistoryLine {
    readonly id?: number
    index: number;
    shortText: string;
    longText: string;
    timeStamp?: string;
    userId?: string;
}


export interface Bill {
    billId?: string;
    costCode: string;
    number: string;
    issueDate?: string;
    startDate: string | null;
    damages?:string;
    damagesPeriod?: "Day"|"Week"|"Month";
    paymentTerms: string;
    paymentTermsSuffix: "Days"|"NET"|"EOM";
    endDate: string | null;
    emailSent: boolean;
    supplier: string;
    accepted: boolean;
    subTotal?: number;
    tax?: number;
    total?: number;
    internalNotes?: string;
    specialConditions: string; //Use general notes and ignore internal notes
    status: BillStatus | string;
    abSupplier?: string | null;
    lines?: BillLine[];
    history?: BillHistoryLine[];
    reference?: string;
    amount?: number | string;
    paid?: number | string;
    balance?: number | string;
    date?: string;
    isOpen?: boolean;
}