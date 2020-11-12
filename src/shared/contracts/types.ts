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

export type FieldType = "String" | "Boolean" | "Date" | "StaticLookup";

export interface IField {
    column: number;
    id: string;
    height: number;
    hidden: boolean;
    hint: string;
    isCustom: boolean;
    isUnique: boolean;
    lookupKey: string;
    maxLength: number;
    name: string;
    order: number;
    required: boolean;
    readOnly: boolean;
    sectionId: string;
    tooltip: string;
    type: FieldType;
    value: string;
    width: number;
}

export interface IFieldHash {
    [id: string]: IField
}

export interface IStaticLookupHash {
    [id: string]: IDictionary[]
}

export interface IInterfaceForm {
    form: IForm;
    sections: ISectionHash;
    fields: IFieldHash;
    staticLookups: IStaticLookupHash;
}

export interface IDictionary {
    key: string;
    value: string;
}

export interface IApiError {
    title: string; //descripción del error
}