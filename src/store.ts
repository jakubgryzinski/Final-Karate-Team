import { atom } from 'nanostores';

export const $isOpen = atom(false);

export function setIsOpen() {
    $isOpen.set(true)
}