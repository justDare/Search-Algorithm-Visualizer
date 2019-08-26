export function getCoordinates(id) {
    const indexes = id.split('-').map(el => {
        let n = parseInt(el);
        return n;
    });

    return indexes;
}