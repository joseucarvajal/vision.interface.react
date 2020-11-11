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

export type FieldType = "String" | "Boolean" | "Date";

export interface IField {
    column: number;
    id: string;
    isCustom: boolean;
    isUnique: boolean;
    height: number;
    hidden: boolean;
    hint: string;
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
export interface IInterfaceForm {
    form: IForm;
    sections: ISectionHash;
    fields: IFieldHash;
}

export interface IApiError {
    title: string; //descripción del error
}