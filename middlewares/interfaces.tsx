export interface Buttons {
    title: string;
    icon: any;
    path: string;
}

export interface Games {
    photos: string[];
    comments: Comment[];
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

export interface Comment {
    user: {
        firstName: string,
        lastName: string,
        avatar: string,
        email: string,
    },
    text: string
    like: number,
}

export interface Items {
    title: string,
    icon: any
}

export interface User {
    firstName: string | undefined | null,
    lastName: string | undefined | null,
    avatar: string | undefined,
    email: string | undefined,
}