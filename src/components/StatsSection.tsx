const stats = [
  { value: "25+", label: "Años de Experiencia" },
  { value: "80+", label: "Servicios Legales" },
  { value: "1000+", label: "Casos Resueltos" },
  { value: "98%", label: "Clientes Satisfechos" },
];

const StatsSection = () => {
  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-gold font-heading text-4xl md:text-5xl font-bold mb-2">
              {stat.value}
            </div>
            <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
