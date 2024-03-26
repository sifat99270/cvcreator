export default function Load() {
    return (
      <div className="    w-16 loader mx-auto  flex justify-center items-center flex-col gap-1 ">
        <div className="flex gap-1  ">
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "aqua",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          ></div>
        </div>
        <div className="flex gap-1">
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "blue",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "magenta",
              borderRadius: "50%",
            }}
          ></div>
        </div>
      </div>
    );
  }