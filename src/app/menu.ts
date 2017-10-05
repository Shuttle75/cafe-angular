export interface MenuGroup {
    id: number;
    name: string;
}

export interface MenuItem {
    id: number;
    group: MenuGroup;
    name: string;
    price: number;
}