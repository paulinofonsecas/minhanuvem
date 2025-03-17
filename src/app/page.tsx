"use client"

import { useState, useRef } from "react"
import {
  FileText,
  Folder,
  Home,
  ImageIcon,
  Info,
  LayoutGrid,
  List,
  MoreVertical,
  Search,
  Share2,
  Star,
  Trash2,
  X,
  Upload,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Separator } from "~/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"

// Mock data structure
interface FileItem {
  id: string
  name: string
  type: "file" | "folder" | "image" | "document"
  size?: string
  modified: string
  path: string
  parentId: string | null
}

const mockFiles: FileItem[] = [
  {
    id: "root",
    name: "My Drive",
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
    type: "file",
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
]

export default function DriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string>("root")
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string }[]>([{ id: "root", name: "My Drive" }])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get current folder contents
  const currentFolderContents = mockFiles.filter((file) => file.parentId === currentFolder)

  // Get current folder info
  const currentFolderInfo = mockFiles.find((file) => file.id === currentFolder)

  // Handle folder navigation
  const navigateToFolder = (folderId: string, folderName: string) => {
    setCurrentFolder(folderId)

    // Update breadcrumbs
    const existingIndex = breadcrumbs.findIndex((b) => b.id === folderId)
    if (existingIndex !== -1) {
      // If we're navigating to a folder that's already in the breadcrumb trail
      setBreadcrumbs(breadcrumbs.slice(0, existingIndex + 1))
    } else {
      // If we're navigating to a new folder
      setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }])
    }
  }

  // Handle file upload simulation
  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadDialogOpen(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement file handling logic here
  }
  

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 font-semibold">
            <Folder className="h-6 w-6 text-blue-500" />
            <span>Drive Clone</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search in Drive" className="w-[300px] pl-8" />
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[240px] border-r bg-muted/40">
          <div className="flex flex-col gap-2 p-4">
            <Button className="justify-start gap-2" onClick={() => setUploadDialogOpen(true)}>
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Button>
          </div>
          <nav className="grid gap-1 px-2">
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => navigateToFolder("root", "My Drive")}
            >
              <Home className="h-4 w-4" />
              <span>My Drive</span>
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Share2 className="h-4 w-4" />
              <span>Shared with me</span>
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Star className="h-4 w-4" />
              <span>Starred</span>
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Trash2 className="h-4 w-4" />
              <span>Trash</span>
            </Button>
            <Separator className="my-2" />
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground">Storage</div>
            <div className="px-3 py-2">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">7.5 GB of 15 GB used</span>
                <span className="text-muted-foreground">50%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-1/2 rounded-full bg-blue-500" />
              </div>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Toolbar */}
            <div className="border-b">
              <div className="flex h-12 items-center px-4">
                <div className="flex items-center gap-1">
                  {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.id} className="flex items-center">
                      {index > 0 && <span className="mx-1 text-muted-foreground">/</span>}
                      <Button
                        variant="link"
                        className="h-auto p-0"
                        onClick={() => navigateToFolder(crumb.id, crumb.name)}
                      >
                        {crumb.name}
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-muted" : ""}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-muted" : ""}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* File browser */}
            <ScrollArea className="flex-1">
              <div className="p-4">
                <Tabs defaultValue="all" className="mb-4">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="folders">Folders</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                  </TabsList>
                </Tabs>

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {currentFolderContents.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div
                          className="aspect-square p-2 flex items-center justify-center bg-muted/50"
                          onClick={() =>
                            item.type === "folder"
                              ? navigateToFolder(item.id, item.name)
                              : window.open(item.path, "_blank")
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {item.type === "folder" && <Folder className="h-16 w-16 text-blue-500" />}
                          {item.type === "file" && <FileText className="h-16 w-16 text-gray-500" />}
                          {item.type === "document" && <FileText className="h-16 w-16 text-blue-500" />}
                          {item.type === "image" && <ImageIcon className="h-16 w-16 text-green-500" />}
                        </div>
                        <div className="p-2">
                          <div className="flex items-center justify-between">
                            <div className="truncate font-medium">{item.name}</div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  <span>Share</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Star className="mr-2 h-4 w-4" />
                                  <span>Star</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.modified} {item.size && `• ${item.size}`}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border">
                    <div className="grid grid-cols-12 gap-2 p-3 text-sm font-medium text-muted-foreground">
                      <div className="col-span-6">Name</div>
                      <div className="col-span-2">Size</div>
                      <div className="col-span-3">Modified</div>
                      <div className="col-span-1"></div>
                    </div>
                    <Separator />
                    {currentFolderContents.map((item) => (
                      <div key={item.id}>
                        <div
                          className="grid grid-cols-12 items-center gap-2 p-3 hover:bg-muted/50"
                          onClick={() =>
                            item.type === "folder"
                              ? navigateToFolder(item.id, item.name)
                              : window.open(item.path, "_blank")
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div className="col-span-6 flex items-center gap-2">
                            {item.type === "folder" && <Folder className="h-5 w-5 text-blue-500" />}
                            {item.type === "file" && <FileText className="h-5 w-5 text-gray-500" />}
                            {item.type === "document" && <FileText className="h-5 w-5 text-blue-500" />}
                            {item.type === "image" && <ImageIcon className="h-5 w-5 text-green-500" />}
                            <span className="truncate">{item.name}</span>
                          </div>
                          <div className="col-span-2 text-sm text-muted-foreground">{"--"}</div>
                          <div className="col-span-3 text-sm text-muted-foreground">{item.modified}</div>
                          <div className="col-span-1 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  <span>Share</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Star className="mr-2 h-4 w-4" />
                                  <span>Star</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </main>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload files</DialogTitle>
            <DialogDescription>Upload files to {"My Drive"}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!isUploading ? (
              <div className="border-2 border-dashed rounded-lg p-12 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-lg font-medium">Drag and drop files here</div>
                  <div className="text-sm text-muted-foreground">or click to browse</div>
                  <Button variant="outline" className="mt-2" onClick={handleFileSelect}>
                    Select files
                  </Button>
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFilesChange}
                  />
                </div>
              </div>
            ) : (
              

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uploading...</span>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
            {isUploading && (
              <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => {
                setIsUploading(false)
                setUploadDialogOpen(false)
              }}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={simulateUpload} disabled={isUploading} >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
