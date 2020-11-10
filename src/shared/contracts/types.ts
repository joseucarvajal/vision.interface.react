export interface IForm {
    id: number;
    title: string;
    sectionsIds: string[]
}

export interface ISection {
    title: string;
    formId: number;
    fieldsIds: string[]
}

export interface ISectionHash {
    [id: string]: ISection
}

export type FieldType = "text" | "lookup";

export interface IField {
    id: string;
    sectionId: string;
    value: string;
    type: FieldType;
    required: boolean
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