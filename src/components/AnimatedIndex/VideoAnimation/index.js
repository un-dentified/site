import React, { Component, createRef } from "react"
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  VideoTexture,
  LinearFilter,
  RGBFormat,
  Mesh,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  ShaderMaterial,
  WebGLRenderTarget,
  Vector2,
} from "three"
import styles from "./style.module.scss"
import videoSrc from "./intro.mp4"

const fragmentShader = `uniform vec2 res;
uniform sampler2D bufferTexture;
uniform sampler2D videoTexture;
uniform float time;
void main() {
  vec2 st = gl_FragCoord.xy / res;
  vec2 uv = st;

  vec4 sum = texture2D(bufferTexture, uv);
  vec4 src = texture2D(videoTexture, uv);
  sum.rgb = mix(sum.rbg, src.rgb, 0.02);
  gl_FragColor = sum;
   
 }
`
const vertexShader = `void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
}`

export default class VideoAnimation extends Component {
  videoRef = createRef()
  canvasRef = createRef()
  animationFrameId
  camera
  renderer

  componentDidMount() {
    const scene = new Scene()
    const canvasEl = this.canvasRef.current

    const width = window.innerWidth
    const height = window.innerHeight

    const camera = new OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    )
    camera.position.z = 2

    const renderer = new WebGLRenderer({ canvas: canvasEl })
    renderer.setClearColor(0x000, 0)
    renderer.autoClear = false
    renderer.setSize(window.innerWidth, window.innerHeight)

    const video = this.videoRef.current
    const videoTexture = new VideoTexture(video)
    videoTexture.minFilter = LinearFilter
    videoTexture.magFilter = LinearFilter
    videoTexture.format = RGBFormat

    const bufferScene = new Scene()
    let textureA = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        minFilter: LinearFilter,
        magFilter: LinearFilter,
      }
    )
    let textureB = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      { minFilter: LinearFilter, magFilter: LinearFilter }
    )
    const bufferMaterial = new ShaderMaterial({
      uniforms: {
        bufferTexture: { value: textureA.texture },
        res: {
          value: new Vector2(window.innerWidth, window.innerHeight),
        },
        videoTexture: { value: videoTexture },
        time: { value: Math.random() * Math.PI * 2 + Math.PI },
      },
      fragmentShader,
      vertexShader,
    })
    const plane = new PlaneBufferGeometry(window.innerWidth, window.innerHeight)
    const bufferObject = new Mesh(plane, bufferMaterial)
    bufferScene.add(bufferObject)

    const finalMaterial = new MeshBasicMaterial({ map: textureB.texture })
    const quad = new Mesh(plane, finalMaterial)

    scene.add(quad)

    const recursiveAnimation = () => {
      this.animationFrameId = requestAnimationFrame(recursiveAnimation)

      renderer.setRenderTarget(textureB)
      renderer.render(bufferScene, camera)

      renderer.setRenderTarget(null)
      renderer.clear()

      const t = textureA
      textureA = textureB
      textureB = t

      quad.material.map = textureB.texture
      bufferMaterial.uniforms.bufferTexture.value = textureA.texture

      bufferMaterial.uniforms.time.value += 0.9

      renderer.render(scene, camera)
    }

    this.handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", this.handleResize)

    recursiveAnimation()
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <video
          className={styles.visuallyHidden}
          ref={this.videoRef}
          autoPlay
          loop
          muted
          id="video1"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <canvas className={styles.canvas} ref={this.canvasRef}>
          Please enable javascript to view animation
        </canvas>
      </div>
    )
  }
}
