import { afterEach, describe, expect, it, vi } from "vitest"
import { act, renderHook, waitFor } from "@testing-library/react"
import usePaginatedFetch from "../usePaginatedFetch"
import { fetchApi } from "../../utils/api"

vi.mock("../../utils/api", () => ({ fetchApi: vi.fn() }))

const page = (ids, total_pages = 3) => ({ results: ids.map(id => ({ id, media_type: "movie" })), total_pages })

describe("usePaginatedFetch", () => {
    afterEach(() => vi.resetAllMocks())

    it("appends pages and drops duplicates", async () => {
        fetchApi.mockResolvedValueOnce(page([1, 2])).mockResolvedValueOnce(page([2, 3]))
        const { result } = renderHook(() => usePaginatedFetch("/discover/movie", { sort_by: "x" }))
        await waitFor(() => expect(result.current.results).toHaveLength(2))
        expect(fetchApi).toHaveBeenLastCalledWith("/discover/movie", { sort_by: "x", page: 1 }, expect.anything())

        act(() => result.current.loadMore())
        await waitFor(() => expect(result.current.results.map(r => r.id)).toEqual([1, 2, 3]))
        expect(fetchApi).toHaveBeenLastCalledWith("/discover/movie", { sort_by: "x", page: 2 }, expect.anything())
        expect(result.current.hasMore).toBe(true)
    })

    it("starts again from page 1 when the query changes", async () => {
        fetchApi.mockResolvedValueOnce(page([1], 1))
        const { result, rerender } = renderHook(({ query }) => usePaginatedFetch("/search/multi", { query }), {
            initialProps: { query: "first" },
        })
        await waitFor(() => expect(result.current.results).toHaveLength(1))
        expect(result.current.hasMore).toBe(false)

        fetchApi.mockResolvedValueOnce(page([7, 8]))
        rerender({ query: "second" })
        expect(result.current.isLoading).toBe(true)
        expect(result.current.results).toEqual([])
        await waitFor(() => expect(result.current.results.map(r => r.id)).toEqual([7, 8]))
        expect(fetchApi).toHaveBeenLastCalledWith("/search/multi", { query: "second", page: 1 }, expect.anything())
    })

    it("caps pagination at TMDB's 500 page limit", async () => {
        fetchApi.mockResolvedValueOnce({ ...page([1]), total_pages: 40000 })
        const { result } = renderHook(() => usePaginatedFetch("/discover/movie"))
        await waitFor(() => expect(result.current.results).toHaveLength(1))
        expect(result.current.hasMore).toBe(true)
    })
})
