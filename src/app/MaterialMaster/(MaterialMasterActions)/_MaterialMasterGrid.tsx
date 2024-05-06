import Image from "next/image";

export default function MaterialMasterGrid() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src={"/images/under-development.svg"}
        height={200}
        width={200}
        alt="Img"
        style={{}}
        onError={(e) => {
          console.error("Error loading image:", e);
        }}
        unoptimized={true}
      />
    </div>
  );
}
