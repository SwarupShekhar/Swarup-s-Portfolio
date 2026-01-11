export function ProofStrip({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <section>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

