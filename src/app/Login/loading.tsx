import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Image
      src="/images/loading.svg"
      alt="Loading...."
      width={150}
      height={150}
    />
  );
}
