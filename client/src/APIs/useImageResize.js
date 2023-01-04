import { useState, useEffect } from "react";

export function useImageResize() {
    const [imageloading, setLoading] = useState(true);
    const [ImageResize, setData] = useState([]);
    const [imagerror, setError] = useState(null);
    useEffect(() => {

        getRandomImage()
            .then(data => setData(data))
            .catch((e) => {
                setError(e);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return {
        imageloading,
        ImageResize,
        imagerror,
    };

}

function getRandomImage() {
    const url = `/api/resize`;
    const send = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    return fetch(url, send)
        .then((res) => res.json())
        .then((res) => {
            return res;
        });
}

