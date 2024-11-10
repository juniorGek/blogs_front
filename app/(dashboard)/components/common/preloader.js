"use client";

import {useEffect} from "react";
import {Router} from "next/router";

const RouteLoader = () => {

    const hide = () => {
        hideLoader()
    }

    useEffect(() => {
        hide()
        Router.events.on('routeChangeStart', showLoader)
        // Router.events.on('routeChangeComplete', hide)
        // Router.events.on('routeChangeError', hide)
        return () => {
            Router.events.off('routeChangeStart', showLoader)
            Router.events.off('routeChangeComplete', hide)
            Router.events.off('routeChangeError', hide)
        }
    }, [])



    return (
        <div id="preloader" style={{background: '#12121233'}}>
            <Loader/>
        </div>
    )
}
export default RouteLoader

export const showLoader = () => {
    try {
        document.querySelector('#preloader').style.visibility = 'visible'
    } catch (e) {

    }
}

export const hideLoader = () => {
    try {
        document.querySelector('#preloader').style.visibility = 'hidden'
    } catch (e) {

    }
}

export const Loader = () => {
    return (
        <div id="status">
            <div className="spinner-chase">
                <div className="chase-dot"/>
                <div className="chase-dot"/>
                <div className="chase-dot"/>
                <div className="chase-dot"/>
                <div className="chase-dot"/>
                <div className="chase-dot"/>
            </div>
        </div>
    )
}