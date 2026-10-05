import { describe, expect, it } from "vitest"
import { formatDate, getReleaseDate, getTitle, imageUrl, isValidMediaType } from "../media"

describe("imageUrl", () => {
    it("builds a sized TMDB url", () => {
        expect(imageUrl("/abc.jpg", "w342")).toBe("https://image.tmdb.org/t/p/w342/abc.jpg")
    })

    it("returns the fallback when there is no path", () => {
        expect(imageUrl(null, "w342", "fallback.webp")).toBe("fallback.webp")
    })
})

describe("getReleaseDate", () => {
    it("uses release_date for movies and first_air_date for TV", () => {
        expect(getReleaseDate({ release_date: "2020-01-02" })).toBe("2020-01-02")
        expect(getReleaseDate({ first_air_date: "2019-05-06" })).toBe("2019-05-06")
        expect(getReleaseDate({})).toBe("")
    })
})

describe("formatDate", () => {
    it("formats valid dates", () => {
        expect(formatDate("2020-01-02")).toBe("Jan 2, 2020")
        expect(formatDate("2020-01-02", "YYYY")).toBe("2020")
    })

    it("returns an empty string instead of today's date for missing or invalid input", () => {
        expect(formatDate("")).toBe("")
        expect(formatDate(undefined)).toBe("")
        expect(formatDate("not-a-date")).toBe("")
    })
})

describe("getTitle", () => {
    it("reads title for movies and name for TV", () => {
        expect(getTitle({ title: "Movie" })).toBe("Movie")
        expect(getTitle({ name: "Show" })).toBe("Show")
    })
})

describe("isValidMediaType", () => {
    it("only accepts movie and tv", () => {
        expect(isValidMediaType("movie")).toBe(true)
        expect(isValidMediaType("tv")).toBe(true)
        expect(isValidMediaType("person")).toBe(false)
        expect(isValidMediaType(undefined)).toBe(false)
    })
})
