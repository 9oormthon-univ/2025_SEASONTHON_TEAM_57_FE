export default function ChallengeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="mx-[3.2rem] mt-[.2rem] mb-[8rem]">{children}</main>;
}
