import { useEffect } from "react"
import { fetchApi } from "./utils/api"
import { useDispatch, useSelector } from "react-redux"
import { getApiConfiguration } from "./store/homeSlice"
import Index from "./routes"


function App() {
  const { url } = useSelector(state => state.home)
  console.log(url);
  const dispatch = useDispatch()

  useEffect(() => {
    fetchApi("/movie/popular")
      .then(res => dispatch(getApiConfiguration(res)))
  }, [])

  return (
    <>
      <Index></Index>
    </>
  )
}

export default App
