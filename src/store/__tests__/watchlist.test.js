import { beforeEach, describe, expect, it, vi } from "vitest"

// Re-import the module for each test so it re-reads localStorage.
const load = async () => {
    vi.resetModules()
    return import("../watchlist")
}

const movie = { id: 7, title: "Movie", poster_path: "/p.jpg", vote_average: 7.1, release_date: "2020-01-01", overview: "not stored" }

describe("watchlist store", () => {
    beforeEach(() => localStorage.clear())

    it("adds and removes a title, persisting to localStorage", async () => {
        const store = await load()
        store.toggleWatchlist(movie, "movie")
        expect(store.isInWatchlist(store.getSnapshot(), "movie", 7)).toBe(true)
        expect(JSON.parse(localStorage.getItem("moviex.watchlist"))[0]).toMatchObject({ id: 7, media_type: "movie", title: "Movie" })
        expect(JSON.parse(localStorage.getItem("moviex.watchlist"))[0].overview).toBeUndefined()

        store.toggleWatchlist(movie, "movie")
        expect(store.getSnapshot()).toEqual([])
    })

    it("treats the same id as different titles for movies and TV", async () => {
        const store = await load()
        store.toggleWatchlist(movie, "movie")
        expect(store.isInWatchlist(store.getSnapshot(), "tv", 7)).toBe(false)
    })

    it("restores saved titles and survives corrupt storage", async () => {
        localStorage.setItem("moviex.watchlist", JSON.stringify([{ id: 1, media_type: "tv" }]))
        expect((await load()).getSnapshot()).toHaveLength(1)

        localStorage.setItem("moviex.watchlist", "{not json")
        expect((await load()).getSnapshot()).toEqual([])
    })

    it("notifies subscribers on change", async () => {
        const store = await load()
        const listener = vi.fn()
        const unsubscribe = store.subscribe(listener)
        store.toggleWatchlist(movie, "movie")
        expect(listener).toHaveBeenCalledTimes(1)
        unsubscribe()
        store.clearWatchlist()
        expect(listener).toHaveBeenCalledTimes(1)
    })
})
