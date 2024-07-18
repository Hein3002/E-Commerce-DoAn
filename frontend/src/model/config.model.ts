import { GetProp, TableProps } from "antd";

export type ColumnsType<T> = TableProps<T>['columns'];
export type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
export interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}