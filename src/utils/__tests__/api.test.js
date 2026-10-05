import { afterEach, describe, expect, it, vi } from "vitest"
import axios from "axios"
import { fetchApi } from "../api"

vi.mock("axios")

describe("fetchApi", () => {
    afterEach(() => vi.resetAllMocks())

    it("returns the response body", async () => {
        axios.get.mockResolvedValue({ data: { results: [1] } })
        await expect(fetchApi("/movie/popular", { page: 2 })).resolves.toEqual({ results: [1] })
        expect(axios.get).toHaveBeenCalledWith(
            "https://api.themoviedb.org/3/movie/popular",
            expect.objectContaining({ params: { page: 2 } }),
        )
    })

    it("rejects on failure instead of returning the error as data", async () => {
        const error = new Error("401")
        axios.get.mockRejectedValue(error)
        await expect(fetchApi("/configuration")).rejects.toBe(error)
    })
})
