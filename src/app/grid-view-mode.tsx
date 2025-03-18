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
import { type FileItem } from "~/lib/mock-data"

export default function gridViewMode(
    currentFolderContents: FileItem[],
    navigateToFolder: Function,
) {
    return (
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
    );
}