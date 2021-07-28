const Open = ({setOpen, className}: {setOpen: Function, className: string}) => {
    return (
    <svg onClick={() => setOpen(true)} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 494.15 371.11" fill="currentColor">
      <g data-name="Layer 2">
        <path
          d="M293 343.76L480.87 69.28c8.68-12.67 13.28-25.44 13.28-36.06C494.15 12.7 477.68 0 450.1 0H44C16.44 0 0 12.68 0 33.16c0 10.63 4.6 23.2 13.31 35.9l187.9 274.61c12.11 17.66 28.39 27.44 45.89 27.44s33.76-9.67 45.9-27.35z"
          data-name="Layer 1"
        ></path>
      </g>
    </svg>

    )
}

export default Open