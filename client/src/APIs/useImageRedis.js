import { useState, useEffect } from "react";

export function useImageRedis(ImageResize2) {
    const [redisLoading, setLoading] = useState(true);
    const [imageRedis, setData] = useState([]);
    const [imagerror, setError] = useState(null);
    useEffect(() => {
        if (ImageResize2 !== undefined) {

            getRandomImage(ImageResize2)
                .then(data => setData(data))
                .catch((e) => {
                    setError(e);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

    }, [ImageResize2]);

    return {
        redisLoading,
        imageRedis,
        imagerror,
    };

}

function getRandomImage(ImageResize2) {
    const url = `/api/getkey/${ImageResize2}`;
    const send = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
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

