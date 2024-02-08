//interfaces for dynamic interest fields

export interface IDynamicFields {
  Name: string;
  Type: string;
  Value: string;
}

export interface IInterestDynamicFields {
  OrganizationId: string;
  DynamicFields: IDynamicFields[];
}
