export type Theme = "light" | "dark"
export type Format = "png" | "svg"
export type Mode = "week" | "month" | "quarter" | "all"

export interface Project {
    id: number,
    name: string
}

export interface ApiMessage {
    code: number,
    message: string
}