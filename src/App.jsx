import { useEffect } from "react"
import { fetchApi } from "./utils/api"
import { useDispatch} from "react-redux"
import { getApiConfiguration } from "./store/homeSlice"
import Index from "./routes"


function App() {
  
  const dispatch = useDispatch()

  useEffect(() => {
    fetchApi("/configuration")
      .then(res => {
        const url = {
          backdrop: res.images.base_url + "original",
          poster: res.images.base_url + "original",
          profile: res.images.base_url + "original",
        }
        dispatch(getApiConfiguration(url))
      })
  }, [])

  return (
    <>
      <Index></Index>
    </>
  )
}

export default App
