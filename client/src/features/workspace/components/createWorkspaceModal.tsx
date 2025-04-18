"use client"

import { ResponsiveModal } from "@/components/responsiveModal";
import { CreateWorkspaceForm  } from "./createWorkspaceForm";
import { useCreateWorkspaceModal } from "../hooks/useCreateWorkspaceModal";

export const CreateWorkspaceModal = () => {
    const { isOpen, setIsOpen, close} = useCreateWorkspaceModal();


    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateWorkspaceForm onCancel={close} />
        </ResponsiveModal>
    )
}