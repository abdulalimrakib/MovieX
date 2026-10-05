import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom"
import SearchForm from "../searchForm/SearchForm"

const SearchPage = () => <p>query: {useParams().query}</p>

const renderForm = () => render(
    <MemoryRouter>
        <Routes>
            <Route path="/" element={<SearchForm />} />
            <Route path="/search/:query" element={<SearchPage />} />
        </Routes>
    </MemoryRouter>
)

describe("SearchForm", () => {
    it("navigates with an encoded query so slashes and question marks survive", async () => {
        renderForm()
        await userEvent.type(screen.getByRole("searchbox"), "AC/DC?{Enter}")
        expect(screen.getByText("query: AC/DC?")).toBeInTheDocument()
    })

    it("ignores blank searches", async () => {
        renderForm()
        await userEvent.type(screen.getByRole("searchbox"), "   {Enter}")
        expect(screen.getByRole("searchbox")).toBeInTheDocument()
    })
})
