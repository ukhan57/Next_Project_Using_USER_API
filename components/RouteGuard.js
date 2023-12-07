import { favouritesAtom } from "@/store";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";

import { getFavourites } from "@/lib/userData";
import { getHistory } from "@/lib/userData";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { isAuthenticated } from "@/lib/authenticate";

const  PUBLIC_PATHS = ['/register', '/', '/login'];

export default function RouteGuard(props){
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    const [favouriteList, setFavouriteList] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    useEffect(() => {
        // To ensure that the atoms are up to date when the user refreshes the page
        updateAtoms();
        // on initial load - run auth check
        authCheck(router.pathname);
    
        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck);
    
        // unsubscribe from events in useEffect return function
        return () => {
          router.events.off('routeChangeComplete', authCheck);
        };
    }, []);

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
          } else {
            setAuthorized(true);
          }
    }

    async function updateAtoms(){
        setFavouriteList(await getFavourites());
        setSearchHistory(await getHistory());
    }

  return <>{authorized && props.children}</>
}

