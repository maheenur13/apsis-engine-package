export interface OptionItem {
    label: string;
    value: string | number;
    children?: OptionItem[];
}
