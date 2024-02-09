import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div
      className="wrp-loading"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
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
    </div>
  );
}
