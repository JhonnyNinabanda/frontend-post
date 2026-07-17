import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import UsersPage from "./pages/UsersPage";
import PostsPage from "./pages/PostsPage";
import CommentsPage from "./pages/CommentsPage";
import AlbumsPage from "./pages/AlbumsPage";
import PhotosPage from "./pages/PhotosPage";
import TodosPage from "./pages/TodosPage";
import HomePage from "./pages/HomePage";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/"
                    element={<UsersPage />}
                />

                <Route
                    path="/users"
                    element={<UsersPage />}
                />

                <Route
                    path="/posts"
                    element={<PostsPage />}
                />

                <Route
                    path="/comments"
                    element={<CommentsPage />}
                />

                <Route
                    path="/albums"
                    element={<AlbumsPage />}
                />

                <Route
                    path="/photos"
                    element={<PhotosPage />}
                />

                <Route
                    path="/todos"
                    element={<TodosPage />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;