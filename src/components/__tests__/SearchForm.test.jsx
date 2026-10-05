import { afterEach, describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom"
import SearchForm from "../searchForm/SearchForm"
import { fetchApi } from "../../utils/api"

vi.mock("../../utils/api", () => ({ fetchApi: vi.fn() }))

const SearchPage = () => <p>query: {useParams().query}</p>
const DetailsPage = () => <p>details: {useParams().mediaType}/{useParams().id}</p>

const renderForm = () => render(
    <MemoryRouter>
        <Routes>
            <Route path="/" element={<SearchForm />} />
            <Route path="/search/:query" element={<SearchPage />} />
            <Route path="/:mediaType/:id" element={<DetailsPage />} />
        </Routes>
    </MemoryRouter>
)

const suggestions = {
    results: [
        { id: 1, media_type: "movie", title: "Batman Begins", release_date: "2005-06-10", vote_average: 7.7 },
        { id: 2, media_type: "person", name: "Someone" },
        { id: 3, media_type: "tv", name: "Batman: The Animated Series", first_air_date: "1992-09-05", vote_average: 8.6 },
    ],
}

describe("SearchForm", () => {
    afterEach(() => vi.resetAllMocks())

    it("navigates with an encoded query so slashes and question marks survive", async () => {
        fetchApi.mockResolvedValue({ results: [] })
        renderForm()
        await userEvent.type(screen.getByRole("combobox"), "AC/DC?{Enter}")
        expect(screen.getByText("query: AC/DC?")).toBeInTheDocument()
    })

    it("ignores blank searches", async () => {
        renderForm()
        await userEvent.type(screen.getByRole("combobox"), "   {Enter}")
        expect(screen.getByRole("combobox")).toBeInTheDocument()
        expect(fetchApi).not.toHaveBeenCalled()
    })

    it("shows movie and TV suggestions (not people) while typing", async () => {
        fetchApi.mockResolvedValue(suggestions)
        renderForm()
        await userEvent.type(screen.getByRole("combobox"), "batman")
        expect(await screen.findByText("Batman Begins")).toBeInTheDocument()
        expect(screen.getByText("Batman: The Animated Series")).toBeInTheDocument()
        expect(screen.queryByText("Someone")).not.toBeInTheDocument()
        expect(fetchApi).toHaveBeenLastCalledWith("/search/multi", { query: "batman" }, expect.anything())
    })

    it("opens the highlighted suggestion with arrow keys and Enter", async () => {
        fetchApi.mockResolvedValue(suggestions)
        renderForm()
        const input = screen.getByRole("combobox")
        await userEvent.type(input, "batman")
        await screen.findByText("Batman Begins")
        await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}")
        expect(screen.getByText("details: tv/3")).toBeInTheDocument()
    })
})
