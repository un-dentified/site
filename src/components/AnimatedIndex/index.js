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
  AmbientLight,
  WebGLRenderTarget,
  Vector2,
  Color,
} from "three"
import videoSrc from "../../../public/video/intro.mp4"

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

export default class AnimatedIndex extends Component {
  videoRef = createRef()

  componentDidMount() {
    const scene = new Scene()
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

    const renderer = new WebGLRenderer()
    renderer.autoClear = false
    renderer.setClearColor("#eee")
    renderer.setSize(width, height)
    document.body.appendChild(renderer.domElement)

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

    renderer.setClearColor("#eee")
    scene.add(quad)

    var light = new AmbientLight(0x404040) // soft white light
    scene.add(light)
    scene.background = new Color(0xeeeeee)
    const recursiveAnimation = () => {
      this.animationFrameId = requestAnimationFrame(recursiveAnimation)

      renderer.setRenderTarget(textureB)
      renderer.render(bufferScene, camera)

      renderer.setRenderTarget(null)
      renderer.clear()

      var t = textureA
      textureA = textureB
      textureB = t

      quad.material.map = textureB.texture
      bufferMaterial.uniforms.bufferTexture.value = textureA.texture

      bufferMaterial.uniforms.time.value += 0.9

      renderer.render(scene, camera)
    }
    recursiveAnimation()
  }

  render() {
    return (
      <>
        <video
          style={{ visibility: "hidden", width: "0" }}
          ref={this.videoRef}
          autoPlay
          loop
          muted
          id="video1"
          width="420"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <canvas style={{ position: "absolute" }} ref={this.canvasRef}>
          Please enable javascript to view animation
        </canvas>
      </>
    )
  }
}
