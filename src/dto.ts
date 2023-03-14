export enum EnumDataStyleDTO {
  MULTILINE = "MULTILINE"
}

export enum EnumUpdateModeDTO {
  ALWAYS = "ALWAYS",
  WHILE_NEW = "WHILE_NEW",
  READONLY = "READONLY"
}

export enum EnumDatatypeDTO {
  BLOB = "BLOB",
  CLOB = "CLOB",
  DATE = "DATE",
  LOB_HANDLE = "LOB_HANDLE",
  LONG = "LONG",
  NUMBER = "NUMBER",
  PASSWORD_HANDLE = "PASSWORD_HANDLE",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN"
}

export class AttrDefDTO {
  alias?: string;
  altKey?: boolean;
  dataStyle?: EnumDataStyleDTO;
  datatype?: EnumDatatypeDTO;
  defaultValue?: any;
  filterable?: boolean;
  format?: string;
  label?: string;
  lov?: string;
  mandatory?: boolean;
  name?: string;
  primaryKey?: boolean;
  readOnlyExpr?: string;
  selectSource?: string;
  tooltip?: string;
  updateable?: EnumUpdateModeDTO;
  userPrivs?: number;
  visible?: boolean;
}

export class SelectSourceDTO {
  attrMap?: {
    [key: string]: string;
  };
  foreignKey?: string[];
  label?: string;
  labelDe?: string;
  name?: string;
  selectorAspect?: string;
  selectorViewDef?: string;
  unrestricted?: boolean;
}

export class ViewPrivsDTO {
  create?: boolean;
  delete?: boolean;
  modify?: boolean;
  read?: boolean;
}

export class ViewDefDTO {
  attrDefs?: AttrDefDTO[];
  description?: string;
  extendz?: string[];
  isRelationView?: boolean;
  label?: string;
  objType?: number;
  privs?: ViewPrivsDTO;
  properties?: {
    [key: string]: any;
  };
  securityPolicyEnabled?: boolean;
  selectSources?: SelectSourceDTO[];
  viewDefName?: string;
}

export class AspectViewDefDTO extends ViewDefDTO {
  name?: string;
}

export class RelationDefDTO {
  attrs?: AttrDefDTO[];
  destinationView?: string;
  privs?: RelationPrivsDTO;
  sourceView?: string;
  viewLinkDef?: string;
  viewName?: string;
}

export class RelationPrivsDTO {
  create?: boolean;
  delete?: boolean;
  modify?: boolean;
}

export class AspectDefDTO {
  label?: string;
  name?: string;
  relations?: RelationDefDTO[];
  views?: AspectViewDefDTO[];
}

export type QueryNodeDTO = {
  ID: string;
  PARENT_ID: string;
  viewDef: string;
  accessor: string;
  viewName: string;
  maxRows: number;
  filter: string;
  relationFilter: string;
};
