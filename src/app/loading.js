export default function loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 435 50"
        style={{
          backgroundColor: '#FFFFFF',
        }}
        width="435px"
        height="50px"
      >
        <style>
          {
            "\n@font-face {\n  font-family: 'Poppins';\n  font-style: normal;\n  font-weight: 400;\n  font-display: fallback;\n  src: url(data:font/truetype;base64,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) format('truetype');\n}\n"
          }
        </style>
        <path id="path0">
          <animate
            id="d0"
            attributeName="d"
            begin="0s;d0.end"
            dur="1500ms"
            fill="remove"
            values="m0,25 h0 ; m0,25 h435 ; m0,25 h435 ; m0,25 h0"
            keyTimes="0;0.72727272727273;0.81818181818182;1"
          />
        </path>
        <text
          fontFamily='"Poppins", monospace'
          fill="#000000"
          fontSize={20}
          dominantBaseline="middle"
          x="50%"
          textAnchor="middle"
        >
          <textPath xlinkHref="#path0">
            {`\n            Loading Data........\n        `}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
