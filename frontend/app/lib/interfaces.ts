import { Author, Book, Genre } from "./models";

// Interface that handles the properties of the CloudinaryResource type
export interface CloudinaryResource {
    public_id: string;
    secure_url: string;
}

// Interface that handles the return type of the custom useSelection hook
export interface UseSelectionReturnType {
    selectedId: string | null;
    handleSelect: (id: string) => void;
}

// Interface that handles parameters for the picture list
export interface PictureListProps {
    handleSelect: (id: string) => void;
    defaultType?: 'books' | 'authors';
}

// Interface that handles the parameters for the Picture Card component
export interface PictureCardProps {
    resource: CloudinaryResource;
    selection: UseSelectionReturnType
}

// Interface that handles the parameters for the Pictures component
export interface PicturesProps {
    onPictureSelect: (picture: string) => void;
    defaultType: 'books' | 'authors';
}

// Interface that handles the properties of the Pagination component
export interface PaginationProps {
    currentPage: number,
    totalPages: number,
    onPageChange: (value: number) => void,
}

// Interface that handles the parameters of the Edit-Book-Form
export interface EditBookFormProps {
    book: Book,
    authors: Author[],
    genres: Genre[]
}

// Interface that handles the parameters of the Create-Book-Form
export interface CreateBookFormProps {
    authors: Author[],
    genres: Genre[]
}