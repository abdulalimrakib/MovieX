import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Poster from "../singlePoster/Poster"

const renderPoster = (props) => render(<MemoryRouter><Poster {...props} /></MemoryRouter>)

describe("Poster", () => {
    it("shows a TV show's first air date and links to its details page", () => {
        renderPoster({ posterData: { id: 5, name: "Show", first_air_date: "2019-05-06", vote_average: 8.1, media_type: "tv" } })
        expect(screen.getByText("May 6, 2019")).toBeInTheDocument()
        expect(screen.getByRole("link")).toHaveAttribute("href", "/tv/5")
    })

    it("prefers the explicit media type and shows no date when there is none", () => {
        renderPoster({ posterData: { id: 9, title: "Movie", vote_average: 0 }, media_type: "movie" })
        expect(screen.getByRole("link")).toHaveAttribute("href", "/movie/9")
        expect(screen.queryByText(/\d{4}/)).not.toBeInTheDocument()
    })
})
