import { Outlet } from "react-router-dom";
import PageTracker from "../analytics/PageTracker.jsx";

export default function Layout () {
    console.log('layout rendered')
    return (
        <>
            <PageTracker/>
            <Outlet/>
        </>
    )
}