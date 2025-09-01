export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative mx-[3.2rem]">{children}</div>;
}
