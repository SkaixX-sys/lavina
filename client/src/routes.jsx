import Admin from './pages/Admin'
import AlbumPage from './pages/AlbumPage';
import Albums from './pages/Albums';
import InfoPage from './pages/InfoPage';
import Infos from './pages/Infos';
import NewsPage from './pages/NewsPage';
import { ADMIN_REVIEWS_ROUTER, ADMIN_ROUTER, ALBUMS_PAGE_ROUTER, ALBUMS_ROUTER, HOTELS_ROUTER, INFOS_ROUTER, INFO_PAGE_ROUTER, LOGIN_ROUTER, MAIN_ROUTER, NEWS_PAGE_ROUTER, NEWS_ROUTER, REGISTRATION_ROUTER, REVIEWS_ROUTER, ROOMS_ROUTER, ROOM_ROUTER, SERVICES_PAGE_ROUTER, SERVICES_ROUTER, TYPES_ROUTER } from './utils/consts';
import Main from './pages/Main';
import Reviews from './pages/Reviews';
import ServicePage from './pages/ServicePage';
import Auth from './pages/Auth';
import Services from './pages/Services';
import Types from './pages/Types';
import Hotels from './pages/Hotels';
import Rooms from './pages/Rooms';
import RoomPage from './pages/RoomPage';
import News from './pages/News';
import AdminReviews from './pages/AdminReviews';

export const notAuthRoutes = [
    {
        path: REGISTRATION_ROUTER,
        Component: Auth
    },
    {
        path: LOGIN_ROUTER,
        Component: Auth
    },
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTER,
        Component: Admin
    },
    {
        path: ADMIN_REVIEWS_ROUTER,
        Component: AdminReviews
    },
    {
        path: TYPES_ROUTER + '/:type',
        Component: Types
    }
]
export const publicRoutes = [
    {
        path: ALBUMS_ROUTER,
        Component: Albums
    },
    {
        path: ALBUMS_PAGE_ROUTER + '/:id',
        Component: AlbumPage
    },
    {
        path: INFO_PAGE_ROUTER + '/:type',
        Component: InfoPage
    },
    {
        path: INFOS_ROUTER,
        Component: Infos
    },
    {
        path: MAIN_ROUTER,
        Component: Main
    },
    {
        path: NEWS_ROUTER,
        Component: News
    },
    {
        path: NEWS_PAGE_ROUTER + '/:id',
        Component: NewsPage
    },
    {
        path: REVIEWS_ROUTER,
        Component: Reviews
    },
    {
        path: SERVICES_PAGE_ROUTER + '/:type',
        Component: ServicePage
    },
    {
        path: SERVICES_ROUTER,
        Component: Services
    },
    {
        path: HOTELS_ROUTER,
        Component: Hotels
    },
    {
        path: ROOMS_ROUTER + '/:type',
        Component: Rooms
    },
    {
        path: ROOM_ROUTER + '/:id',
        Component: RoomPage
    }
]
