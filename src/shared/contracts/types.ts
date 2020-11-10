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

export type FieldType = "String" | "Boolean";

export interface IField {
    id: string;
    name: string;
    sectionId: string;
    value: string;
    type: FieldType;
    required: boolean;
    column: number;
    order: number;
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