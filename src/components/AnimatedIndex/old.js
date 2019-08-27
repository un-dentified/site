import React, { Component, createRef } from "react"
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  VideoTexture,
  LinearFilter,
  NearestFilter,
  RGBFormat,
  Mesh,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  ShaderMaterial,
  WebGLRenderTarget,
  Vector2,
} from "three"
import videoSrc from "../../../public/video/intro.mp4"

const fragmentShader = `uniform vec2 res;
uniform sampler2D bufferTexture;
uniform sampler2D videoTexture;
uniform float time;
void main() {
  vec2 st = gl_FragCoord.xy / res;
  vec2 uv = st;
  uv *= 0.998;

  vec4 sum = texture2D(bufferTexture, uv);
  vec4 src = texture2D(videoTexture, uv);
  sum.rgb = mix(sum.rbg, src.rgb, 0.01);
  gl_FragColor = sum;
   
 }
`

export default class AnimatedIndex extends Component {
  videoRef = createRef()

  videoTextureInit = () => {
    const video = this.videoRef.current
    const videoTexture = new VideoTexture(video)
    videoTexture.minFilter = LinearFilter
    videoTexture.magFilter = LinearFilter
    videoTexture.format = RGBFormat

    return videoTexture
  }

  bufferInit = videoTexture => {
    //Create buffer scene
    const bufferScene = new Scene()
    //Create 2 buffer textures
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
    //Pass textureA to shader
    const bufferMaterial = new ShaderMaterial({
      uniforms: {
        bufferTexture: { value: textureA.texture },
        res: {
          type: "v2",
          value: new Vector2(window.innerWidth, window.innerHeight),
        },
        //Keeps the resolution
        videoTexture: { value: videoTexture },
        time: { value: Math.random() * Math.PI * 2 + Math.PI },
      },
      fragmentShader,
    })
    const plane = new PlaneBufferGeometry(window.innerWidth, window.innerHeight)
    const bufferObject = new Mesh(plane, bufferMaterial)
    bufferScene.add(bufferObject)

    //Draw textureB to screen
    const finalMaterial = new MeshBasicMaterial({ map: textureB.texture })
    const quad = new Mesh(plane, finalMaterial)
    bufferScene.add(quad)

    return { bufferScene, bufferMaterial, textureA, textureB, quad }
  }

  sceneInit = () => {
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
    renderer.autoClear = true
    renderer.setSize(width, height)
    document.body.appendChild(renderer.domElement)
    return { scene, camera, renderer }
  }

  componentDidMount() {
    const { scene, camera, renderer } = this.sceneInit()
    const videoTexture = this.videoTextureInit()
    let {
      textureA,
      textureB,
      bufferMaterial,
      bufferScene,
      quad,
    } = this.bufferInit(videoTexture)
    const recursiveAnimation = () => {
      this.animationFrameId = requestAnimationFrame(recursiveAnimation)
      //Draw to textureB

      renderer.render(bufferScene, camera, textureB)

      //Swap textureA and B

      var t = textureA
      textureA = textureB
      textureB = t

      quad.material.map = textureB.texture
      bufferMaterial.uniforms.bufferTexture.value = textureA.texture

      //Update time
      bufferMaterial.uniforms.time.value += 0.01

      //Finally, draw to the screen
      renderer.render(scene, camera)
    }
    recursiveAnimation()
  }

  render() {
    return (
      <video ref={this.videoRef} autoPlay loop muted id="video1" width="420">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    )
  }
}
