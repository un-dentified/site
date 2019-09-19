import { TimelineLite } from "gsap"

const fade = ({ exit: { length }, node, direction }) => {
  const duration = direction === "out" ? length + length / 4 : length
  const opacity = direction === "in" ? 1 : 0

  const holdPosition =
    direction === "out"
      ? {
          overflowY: "hidden",
          height: "100vh",
        }
      : {}

  return new TimelineLite()
    .set(node, holdPosition)
    .fromTo(node, duration, { opacity: !opacity }, { opacity })
}
export default fade
