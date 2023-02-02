import { Image } from "./image"

export interface Specification {
    readonly specId: string;
    title: string;
    description: string;
    index: number;
    images?: Image[];
    approved?: boolean;
    timestamp?: string;
    costCode: string;
}