import { afterEach, describe, expect, it, vi } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import useFetch from "../useFetch"
import { fetchApi } from "../../utils/api"

vi.mock("../../utils/api", () => ({ fetchApi: vi.fn() }))

describe("useFetch", () => {
    afterEach(() => vi.resetAllMocks())

    it("loads data", async () => {
        fetchApi.mockResolvedValue({ id: 1 })
        const { result } = renderHook(() => useFetch("/movie/1"))
        expect(result.current.isLoading).toBe(true)
        await waitFor(() => expect(result.current.isLoading).toBe(false))
        expect(result.current.data).toEqual({ id: 1 })
        expect(result.current.error).toBeNull()
    })

    it("exposes errors", async () => {
        const error = new Error("boom")
        fetchApi.mockRejectedValue(error)
        const { result } = renderHook(() => useFetch("/movie/1"))
        await waitFor(() => expect(result.current.error).toBe(error))
        expect(result.current.data).toBeNull()
    })

    it("goes back to loading and drops stale data when the url changes", async () => {
        fetchApi.mockResolvedValueOnce({ id: 1 })
        const { result, rerender } = renderHook(({ url }) => useFetch(url), { initialProps: { url: "/movie/1" } })
        await waitFor(() => expect(result.current.data).toEqual({ id: 1 }))

        let resolveSecond
        fetchApi.mockReturnValueOnce(new Promise(resolve => { resolveSecond = resolve }))
        rerender({ url: "/movie/2" })
        expect(result.current.isLoading).toBe(true)
        expect(result.current.data).toBeNull()

        resolveSecond({ id: 2 })
        await waitFor(() => expect(result.current.data).toEqual({ id: 2 }))
    })
})
