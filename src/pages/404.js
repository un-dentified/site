import { navigate } from "gatsby"

const FourOhFour = () => {
  if (typeof window !== undefined) {
    navigate("/")
  }

  return null
}

export default FourOhFour
