export interface IForm {
    id: number;
    code: string;
    name: string;
    sectionsIds: string[]
}

export interface ISection {
    formId: number;
    title: string;
    order: number;
    fieldsIds: string[]
}

export interface ISectionHash {
    [id: string]: ISection
}

export type FieldType = "String" | "Boolean" | "Date" | "Lookup" | "MLookup" | "Numeric" | "Money";
export type LookupType = "LOOKUP_SOURCE_STATIC" | "LOOKUP_SOURCE_DYNAMIC";

export interface IField {
    column: number;
    decimalPlaces: number;
    id: string;
    height: number;
    hidden: boolean;
    hint: string;
    isCustom: boolean;
    isUnique: boolean;
    lookupKey: string;
    lookupType: LookupType;
    lookupValues: ILookupValue[]
    maxLength: number;
    name: string;
    order: number;
    required: boolean;
    readOnly: boolean;
    sectionId: string;
    showCurrency: boolean;
    tooltip: string;
    type: FieldType;
    value: string;
    width: number;
}

export interface IFieldHash {
    [id: string]: IField
}

export interface IStaticLookupHash {
    [id: string]: ILookupValue[]
}

export interface IInterfaceForm {
    form: IForm;
    sections: ISectionHash;
    fields: IFieldHash;
    staticLookups: IStaticLookupHash;
    events: IEvent[];
}

export type EventAction = "PRC" | "LINK";

export interface IEvent {
    id: string;
    name: string;
    action: EventAction;
    attributeId: string;
    value: string;
    order: number;
    url: string;
    disabled: boolean;
}


export interface IDictionary {
    key: string;
    value: string;
}

export interface IApiError {
    title: string; //descripción del error
}

export interface ILookupValue {
    label: string,
    value: string,
    fullLabel: string
}

