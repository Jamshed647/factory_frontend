interface CustomStyle {
  "--c": string;
  background: string;
  backgroundSize: string;
  backgroundRepeat: string;
  animation: string;
}
const DataLoader = () => {
  return (
    <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ">
      <div className="flex justify-center items-center w-full h-full">
        <div
          className="w-[66px] h-[66px]"
          style={
            {
              "--c": "radial-gradient(farthest-side, #011C28 80%, transparent)",
              background: `
                var(--c) 50% 0,
                var(--c) 50% 100%,
                var(--c) 100% 50%,
                var(--c) 0 50%
            `,
              backgroundSize: "18px 18px",
              backgroundRepeat: "no-repeat",
              animation: "spinner-kh173p 1s infinite",
            } as CustomStyle
          }
        >
          <style>
            {`
        @keyframes spinner-kh173p {
          to {
            transform: rotate(0.5turn);
            }
          }
          `}
          </style>
        </div>
      </div>
    </div>
  );
};

export default DataLoader;
