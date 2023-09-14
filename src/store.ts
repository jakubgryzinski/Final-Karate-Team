import { atom } from 'nanostores';

export const $isOpen = atom(false);

export let $index = atom(0);

export function setIsOpen() {
    $isOpen.set(true)
}

export function setIndex(newNumber: number) {
    $index.set(newNumber)
}