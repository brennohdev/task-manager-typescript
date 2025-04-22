"use client"

import { ResponsiveModal } from "@/components/responsiveModal";
import { useCreateTaskModal } from "../hook/useCreateTaskModal";
import { CreateTaskFormWrapper } from "./createTaskFormWrapper";

export const CreateTaskModal = () => {
    const { isOpen, setIsOpen, close} = useCreateTaskModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <div>
                <CreateTaskFormWrapper onCancel={close}/>
            </div>
        </ResponsiveModal>
    )
}