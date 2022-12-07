export interface NewsProps {
    author?: string;
    content?: string;
    description?: string;
    publishedAt?: string;
    source?: { id: string; name: string };
    title?: string;
    url?: string;
    urlToImage?: string;
}

export interface NewsResProps {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
    sources: string;
}

export interface MakeUrlProps {
    endpoint: string;
    options: { [key: string]: string };
}

export interface DataProps {
    readonly status: string | number;
    readonly totalResults: number;
    articles: NewsProps[];
    sources: NewsResProps[];
}

export interface BaseComponentProps {
    readonly tag?: keyof HTMLElementTagNameMap;
    className?: string;
    text?: string;
    parent?: HTMLElement;
}
