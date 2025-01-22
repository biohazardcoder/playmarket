export interface Buttons {
    title: string;
    icon: any;
    path: string;
}

export interface Games {
    photos: string[];
    comments: string[];
    title: string;
    device: string;
    category: string;
    trailer: string;
    like: number;
    _id: string;
    age: number,
    company: string,
    description: string,
    download: number
    file: string,
    price: number,
    sale: number
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