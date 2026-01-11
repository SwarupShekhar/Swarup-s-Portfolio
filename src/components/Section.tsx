export function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      {title ? <h2>{title}</h2> : null}
      <div>{children}</div>
    </section>
  );
}

