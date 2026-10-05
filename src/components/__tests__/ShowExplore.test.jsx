import { afterEach, describe, expect, it, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import ShowExplore from "../explore/ShowExplore"
import { fetchApi } from "../../utils/api"

vi.mock("../../utils/api", () => ({ fetchApi: vi.fn() }))

describe("ShowExplore", () => {
    afterEach(() => vi.resetAllMocks())

    it("restores genre and sort filters from the URL", async () => {
        fetchApi.mockImplementation((url) => Promise.resolve(
            url.startsWith("/genre/")
                ? { genres: [{ id: 28, name: "Action" }, { id: 18, name: "Drama" }] }
                : { results: [], total_pages: 0 }
        ))
        render(
            <MemoryRouter initialEntries={["/explore/movie?genres=28&sort=vote_average.desc"]}>
                <Routes>
                    <Route path="/explore/:mediaType" element={<ShowExplore mediaType="movie" />} />
                </Routes>
            </MemoryRouter>
        )
        await waitFor(() => expect(fetchApi).toHaveBeenCalledWith(
            "/discover/movie",
            { sort_by: "vote_average.desc", with_genres: "28", page: 1 },
            expect.anything(),
        ))
        expect(await screen.findByText("Action")).toBeInTheDocument()
        expect(screen.getByText("Rating Descending")).toBeInTheDocument()
    })
})
