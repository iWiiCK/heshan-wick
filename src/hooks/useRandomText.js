import { useState, useEffect } from "react";

const useRandomText = (collection, intervalSeconds = 1.5) => {
    const interval = 1.5 * 1000;
    const [textIndex, setTextIndex] = useState(0);
    const collectionLength = collection.length - 1;
    let tempIndex;

    useEffect(() => {
        const timeout = setInterval(() => {
            tempIndex = textIndex;
            tempIndex < collectionLength ? setTextIndex(++tempIndex) : setTextIndex(0);
        }, interval);

        return () => {
            clearTimeout(timeout)
        }
    });

    return collection[textIndex]
}

export default useRandomText;