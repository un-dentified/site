import React from "react"
import PageWrapper from "../components/PageWrapper"
import Seo from "../components/Seo"
import styles from "./styles/shop.module.scss"

const Shop = props => (
  <>
    <Seo />
    <PageWrapper
      {...props}
      currentPage="shop"
      menuAccess={true}
      menuOpen={true}
      defaultLinks={["", "about", "music", "shows"]}
      dataCy="shop"
    >
      <header className={styles.header}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.text}
          viewBox="0 0 196.7 48.7"
        >
          <g>
            <path
              d="M2,45.08V4.91L4.51,1H14.86l2.51,3.91v9.92H12.23V9.78l-.6-.95H7.74l-.6.95V40.22l.6,1h3.89l.6-1v-5h5.14v9.91L14.86,49H4.51Z"
              transform="translate(-1.65 -0.65)"
              fill="#2a094e"
              stroke="#2a094e"
              strokeMiterlimit="10"
              strokeWidth="0.7"
            />
            <path
              d="M35.9,4.91V45.08L33.39,49H23l-2.51-3.92V4.91L23,1H33.39ZM30.12,8.83H26.24l-.57.88V40.35l.57.88h3.88l.6-.88V9.71Z"
              transform="translate(-1.65 -0.65)"
              fill="#2a094e"
              stroke="#2a094e"
              strokeMiterlimit="10"
              strokeWidth="0.7"
            />
            <path
              d="M52.25,38.7H49.58l-5-22.1V49H39.47V1h6.39l5,22.67L56,1h6.39V49H57.22V16.6Z"
              transform="translate(-1.65 -0.65)"
              fill="#2a094e"
              stroke="#2a094e"
              strokeMiterlimit="10"
              strokeWidth="0.7"
            />
            <path
              d="M65.93,49V1h5.14V49Z"
              transform="translate(-1.65 -0.65)"
              fill="#2a094e"
              stroke="#2a094e"
              strokeMiterlimit="10"
              strokeWidth="0.7"
            />
            <path
              d="M74.63,49V1h5.55l6.67,29.43V1H92V49H86.44L79.77,19.57V49Z"
              transform="translate(-1.65 -0.65)"
              fill="#2a094e"
              stroke="#2a094e"
              strokeMiterlimit="10"
              strokeWidth="0.7"
            />
            <path
              d="M95.56,45.08V4.91L98.06,1h10.72l2.51,3.91v9.92h-5.14V9.59l-.57-.95h-4.24l-.61.95V40.22l.61,1h4.24l.57-1v-9.6h-2.51V22.73h7.65V45.08L108.78,49H98.06Z"
              transform="translate(-1.65 -0.65)"
              fill="#2a094e"
              stroke="#2a094e"
              strokeMiterlimit="10"
              strokeWidth="0.7"
            />
            <path
              d="M134.31,14.83V9.78l-.6-.95h-3.93l-.6.95v10l.6.94H137l2.51,3.92V45.08L137,49H126.55L124,45.08V35.17h5.14v5.11l.6.95h3.93l.6-.95V29.42l-.6-1h-7.16L124,24.56V4.91L126.55,1H137l2.51,3.91v9.92Z"
              transform="translate(-1.65 -0.65)"
              fill="#2a094e"
              stroke="#2a094e"
              strokeMiterlimit="10"
              strokeWidth="0.7"
            />
            <path
              d="M158.14,4.91V45.08L155.64,49H145.29l-2.51-3.92V4.91L145.29,1h10.35Zm-5.78,3.92h-3.88l-.57.88V40.35l.57.88h3.88l.61-.88V9.71Z"
              transform="translate(-1.65 -0.65)"
              fill="#2a094e"
              stroke="#2a094e"
              strokeMiterlimit="10"
              strokeWidth="0.7"
            />
            <path
              d="M177.08,4.91V45.08L174.57,49H164.22l-2.51-3.92V4.91L164.22,1h10.35ZM171.3,8.83h-3.88l-.57.88V40.35l.57.88h3.88l.61-.88V9.71Z"
              transform="translate(-1.65 -0.65)"
              fill="#2a094e"
              stroke="#2a094e"
              strokeMiterlimit="10"
              strokeWidth="0.7"
            />
            <path
              d="M180.65,49V1h5.54l6.67,29.43V1H198V49h-5.54l-6.67-29.43V49Z"
              transform="translate(-1.65 -0.65)"
              fill="#2a094e"
              stroke="#2a094e"
              strokeMiterlimit="10"
              strokeWidth="0.7"
            />
          </g>
        </svg>
      </header>
    </PageWrapper>
  </>
)

export default Shop
