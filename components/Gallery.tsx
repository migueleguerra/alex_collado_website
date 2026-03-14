export default function Gallery() {
  return (
    <section className="gallery">
      {Array.from({ length: 16 }, (_, i) => (
        <div key={i + 1} className={`gallery--${i + 1}`}></div>
      ))}
    </section>
  );
}
