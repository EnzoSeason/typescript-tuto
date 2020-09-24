interface HasLength {
    length: number
}

function count<T extends HasLength>(element: T): number {
    return element.length;
}