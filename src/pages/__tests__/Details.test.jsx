import { afterEach, describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import Details from "../Details"
import { fetchApi } from "../../utils/api"

vi.mock("../../utils/api", () => ({ fetchApi: vi.fn() }))

const renderAt = (path) => render(
    <MemoryRouter initialEntries={[path]}>
        <Routes>
            <Route path="/:mediaType/:id" element={<Details />} />
        </Routes>
    </MemoryRouter>
)

const movie = { id: 1, title: "Some Movie", vote_average: 7.5, release_date: "2020-01-02", runtime: 125, genres: [] }

describe("Details page", () => {
    afterEach(() => vi.resetAllMocks())

    it("shows the 404 page for an unknown media type without calling the API", () => {
        renderAt("/person/123")
        expect(screen.getByText("404")).toBeInTheDocument()
        expect(fetchApi).not.toHaveBeenCalled()
    })

    it("renders a title that has no videos instead of crashing", async () => {
        fetchApi.mockImplementation((url) => {
            if (url === "/movie/1") return Promise.resolve(movie)
            if (url.endsWith("/credits")) return Promise.resolve({ cast: [], crew: [{ job: "Screenplay", name: "A Writer" }] })
            return Promise.resolve({ results: [] })
        })
        renderAt("/movie/1")
        expect(await screen.findByRole("heading", { name: "Some Movie (2020)" })).toBeInTheDocument()
        expect(screen.getByText("2h 5m")).toBeInTheDocument()
        expect(await screen.findByText("A Writer")).toBeInTheDocument()
        expect(screen.queryByText("Watch trailer")).not.toBeInTheDocument()
    })

    it("shows a not-found message when the API returns 404", async () => {
        fetchApi.mockRejectedValue({ response: { status: 404 } })
        renderAt("/movie/999999")
        expect(await screen.findByText("This title could not be found.")).toBeInTheDocument()
    })
})
