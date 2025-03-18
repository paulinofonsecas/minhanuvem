// Mock data structure

export interface FileItem {
    id: string
    name: string
    type: "file" | "folder" | "document" | "image"
    size?: string
    modified: string
    path: string
    parentId: string | null
}

export const mockFiles: FileItem[] = [
    {
        id: "root",
        name: "Inicio",
        type: "folder",
        modified: "2023-03-15",
        path: "/",
        parentId: null,
    },
    {
        id: "folder1",
        name: "Work Documents",
        type: "folder",
        modified: "2023-03-10",
        path: "/folder1",
        parentId: "root",
    },
    {
        id: "folder2",
        name: "Personal",
        type: "folder",
        modified: "2023-03-12",
        path: "/folder2",
        parentId: "root",
    },
    {
        id: "folder3",
        name: "Projects",
        type: "folder",
        modified: "2023-03-14",
        path: "/folder3",
        parentId: "root",
    },
    {
        id: "file1",
        name: "Budget 2023.xlsx",
        type: "document",
        size: "245 KB",
        modified: "2023-03-08",
        path: "/file1",
        parentId: "root",
    },
    {
        id: "file2",
        name: "Meeting Notes.docx",
        type: "document",
        size: "125 KB",
        modified: "2023-03-09",
        path: "/file2",
        parentId: "root",
    },
    {
        id: "file3",
        name: "Profile Picture.jpg",
        type: "image",
        size: "1.2 MB",
        modified: "2023-03-07",
        path: "/file3",
        parentId: "root",
    },
    {
        id: "file4",
        name: "Project Proposal.pdf",
        type: "document",
        size: "3.4 MB",
        modified: "2023-03-05",
        path: "/file4",
        parentId: "folder1",
    },
    {
        id: "file5",
        name: "Team Photo.png",
        type: "image",
        size: "2.8 MB",
        modified: "2023-03-04",
        path: "/file5",
        parentId: "folder1",
    },
    {
        id: "file6",
        name: "Vacation Plans.docx",
        type: "document",
        size: "178 KB",
        modified: "2023-03-03",
        path: "/file6",
        parentId: "folder2",
    },
    {
        id: "file7",
        name: "Family Photo.jpg",
        type: "image",
        size: "3.5 MB",
        modified: "2023-03-02",
        path: "/file7",
        parentId: "folder2",
    },
    {
        id: "file8",
        name: "Project Timeline.xlsx",
        type: "file",
        size: "320 KB",
        modified: "2023-03-01",
        path: "/file8",
        parentId: "folder3",
    },
    {
        id: "file9",
        name: "Design Mockup.png",
        type: "image",
        size: "4.2 MB",
        modified: "2023-02-28",
        path: "/file9",
        parentId: "folder3",
    },
    {
        id: "file10",
        name: "Report.pdf",
        type: "document",
        size: "1.9 MB",
        modified: "2023-02-27",
        path: "/file10",
        parentId: "root",
    },
]
