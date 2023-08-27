import type { OptionItem } from "../../interfaces";


export const treeData: OptionItem[] = [
    {
        label: "Node1",
        value: "0",
        children: [
            {
                label: "Child Node1",
                value: "01",
            },
        ],
    },
    {
        label: "Node2",
        value: "1",
        children: [
            {
                label: "Child Node3",
                value: "11",
            },
            {
                label: "Child Node4",
                value: "12",
            },
            {
                label: "Child Node5",
                value: "13",
            },
        ],
    },
];
