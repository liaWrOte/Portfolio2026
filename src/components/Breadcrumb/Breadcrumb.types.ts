export interface FileSystemItem {
  id: string;
  name: string;
  children?: FileSystemItem[];
}

export interface BreadcrumbItem {
  id: string;
  name: string;
  isLast: boolean;
}

export interface BreadcrumbProps {
  currentPath: string[];
  fileSystem: FileSystemItem;
  openFolder: (id: string) => void;
}
