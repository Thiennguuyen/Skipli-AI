import AuthenPage from "../pages/AuthenPage";
import Dashboard from "../pages/Dashboard";
import InspiredDetail from "../pages/InspiredPage/InspiredDetail";
import InspiredHome from "../pages/InspiredPage/InspiredHome";
import Profile from "../pages/Profile";
import ScratchDetail from "../pages/ScratchPages/ScratchDetail";
import ScratchHome from "../pages/ScratchPages/ScratchHome";
import VerificationPage from "../pages/VerificationPage";

export const routes = [
    {
        path: '/',
        page: AuthenPage,
        isShowSidebar: false
    },
    {
        path: '/dashboard',
        page: Dashboard,
        isShowSidebar: true
    },
    {
        path: '/scratch',
        page: ScratchHome,
        isShowSidebar: true
    },
    {
        path: '/verification',
        page: VerificationPage,
        isShowSidebar: false
    },
    {
        path: '/scratch/facebook',
        page: ScratchDetail,
        isShowSidebar: true
    },
    {
        path: '/scratch/instagram',
        page: ScratchDetail,
        isShowSidebar: true
    },
    {
        path: '/scratch/twitter',
        page: ScratchDetail,
        isShowSidebar: true
    },
    {
        path: '/inspired',
        page: InspiredHome,
        isShowSidebar: true
    },
    {
        path: '/inspired/detail',
        page: InspiredDetail,
        isShowSidebar: true
    },
    {
        path: '/profile',
        page: Profile,
        isShowSidebar: true
    },
]