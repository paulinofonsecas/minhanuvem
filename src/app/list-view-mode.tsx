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
import FileItem from "./entities/file-item"

export default function listViewMode(
    currentFolderContents: FileItem[],
    navigateToFolder: Function,
) {
   return (
   <div className="rounded-lg border">
        <div className="grid grid-cols-12 gap-2 p-3 text-sm font-medium text-muted-foreground">
            <div className="col-span-6">Nome</div>
            <div className="col-span-2">Tamanho</div>
            <div className="col-span-3">Modificação</div>
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
    </div>)
}