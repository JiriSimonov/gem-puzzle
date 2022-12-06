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
