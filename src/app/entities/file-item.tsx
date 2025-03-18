export default interface FileItem {
    id: string
    name: string
    type: "file" | "folder" | "image" | "document"
    size?: string
    modified: string
    path: string
    parentId: string | null
}