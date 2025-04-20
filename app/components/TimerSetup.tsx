import {
    Modal,
    ModalBackdrop,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
  } from "@/components/ui/modal"
import { useSessionStore } from "../session/sessionStore";

export default function TimerSetup() {
    const {intervals} = useSessionStore();
    return {
        
    }
}
