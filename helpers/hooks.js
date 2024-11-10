import { useEffect, useState } from 'react';
import swalAlert from '@/app/(dashboard)/components/common/alert';
import { useRouter } from 'next/navigation';
import { hideLoader, showLoader } from "@/app/(dashboard)/components/common/preloader";
import axios from "axios";
import { notification } from 'antd';

export const useFetch = (func, query = {}, load = true) => {
    const router = useRouter()
    const [data, setData] = useState();
    const [loading, setLoading] = useState(load)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [params, setParams] = useState({
        ...query,
        page: query?.page || 1,
        size: query?.size || 10,
    })

    useEffect(() => {
        if (load) {
            getData(params)
        }
    }, []);

    const getData = (query) => {
        setLoading(true)
        setError(false)
        setParams({ ...params, ...query })
        func({ ...params, ...query }).then(({ error, data, msg, meta, ...rest }) => {
            setLoading(false)
            if (error === false) {
                setData(data)
            } else {
                setError(true)
                setErrorMessage(msg)
                setData(undefined)
            }
            if (rest) {
                if ((Object.values(rest) + "").replaceAll(',', '') === 'Unauthorized.') {
                    router.push('/login')
                }
            }

        }).catch(e => {
            console.log(e)
        })
    }
    const clear = () => setData(undefined)
    return [data, getData, { query: params, loading, error, errorMessage, clear }];
}

export const useAction = async (func, data, reload, alert = true, successMsg) => {
    showLoader()
    const { error, msg, data: d } = await func({ ...data })
    hideLoader()
    if (error === false) {
        if (reload) {
            reload(d)
        }
        if (alert) {
            notification.success({ message: successMsg || msg || 'Success' })
        }
    } else {
        notification.error({ message: msg || 'Something went wrong' })
    }
}

export const useActionConfirm = async (func, data, reload, message, confirmText, t, alert = true) => {
    const { isConfirmed } = await swalAlert.confirm(t ? t(message) : message, t ? t(confirmText) : confirmText, t)
    if (isConfirmed) {
        await useAction(func, data, reload, alert)
    }
}


export const userOutSideClick = (ref, func) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                func && func()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


export const useLocations = () => {
    const [date, setData] = useState({})
    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/locations.json')
            setData(data)
        })()
    }, [])
    return date
}