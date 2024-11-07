import { useState } from 'react';
import { UseSelectionReturnType } from './interfaces';

// Custom Hook that is used to handle the selection of items in a list
export default function useSelection(initialSelection: string | null = null): UseSelectionReturnType {
    const [selectedId, setSelectedId] = useState<null|string>(initialSelection);

    const handleSelect = (id: string) => {
        setSelectedId(id === selectedId ? null : id);
    }

    return {
        selectedId,
        handleSelect,
    };
}