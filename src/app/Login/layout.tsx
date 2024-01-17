import CarouselLogin from "./_Carousel";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="login-page">
      <CarouselLogin />
      {children}
    </div>
  );
}
