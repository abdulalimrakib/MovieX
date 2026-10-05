import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import ScrollToTop from "../components/ScrollToTop"
import ErrorBoundary from "../components/ErrorBoundary"

const Home = lazy(() => import("../pages/Home"))
const Explore = lazy(() => import("../pages/Explore"))
const SearchResult = lazy(() => import("../pages/SearchResult"))
const Details = lazy(() => import("../pages/Details"))
const Person = lazy(() => import("../pages/Person"))
const Watchlist = lazy(() => import("../pages/Watchlist"))
const NotFound = lazy(() => import("../pages/NotFound"))

const PageLoader = () => (
    <div className="min-h-[80vh] flex justify-center items-center text-white text-[20px]">Loading ...</div>
)

function AppRoutes() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <ErrorBoundary>
                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/explore/:mediaType" element={<Explore />} />
                                <Route path="/search/:query" element={<SearchResult />} />
                                <Route path="/watchlist" element={<Watchlist />} />
                                <Route path="/person/:id" element={<Person />} />
                                <Route path="/:mediaType/:id" element={<Details />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </ErrorBoundary>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default AppRoutes
