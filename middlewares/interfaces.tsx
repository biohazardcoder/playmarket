export interface Buttons {
    title: string;
    icon: any;
    path: string;
}

export interface Games {
    photos: string[];
    title: string;
    device: string;
    category: string;
    trailer: string;
    like: number;
    _id: string;
}

export interface Award {
    photos: string[],
    file: string;
    title: string,
    company: string,
    age: number,
    _id: string
}

export interface Menu {
    title: string;
    url: string;
}