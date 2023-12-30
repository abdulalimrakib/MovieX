import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Explore from './../pages/Explore';
import SearchResult from './../pages/SearchResult';
import Details from './../pages/Details';
import Error from './../pages/Error';
import Header from "../layout/Header";
import Footer from "../layout/Footer";


function Index() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:mediaType/:id" element={<Details />} />
                    <Route path="/explore/:mediaType" element={<Explore />} />
                    <Route path="/search/:query" element={<SearchResult />} />
                    <Route path="*" element={<Error />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default Index