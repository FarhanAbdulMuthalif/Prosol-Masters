import Image from "next/image";

export default function LoadingComp() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div
      className="wrp-loading"
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src="/images/loading.svg"
        alt="Loading...."
        width={150}
        height={150}
      />
      <div
        className="img-wrapper"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Image
          src="/images/prosol-logo.svg"
          className="Logo-img"
          alt="Loading...."
          width={90}
          height={35}
          priority={true}
        />
      </div>
      {/* <Image
        src="/images/prosol-logo.svg"
        className="Logo-img"
        alt="Loading...."
        width={120}
        height={45}
        priority={true}
      /> */}
    </div>
  );
}
