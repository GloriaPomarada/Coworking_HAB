import { Link } from "react-router-dom";

function Home() {
  const cards = [
    { title: "Oficinas Privadas", image: "../../../../public/oficina-privada.jpg", hoverText: "Oficinas privadas equipadas con todo lo necesario para tu productividad", link: "/oficinas-privadas" },
    { title: "Salas de Reuniones", image: "../../../../public/sala_runiones.jpg", hoverText: "Nuestras salas reuniones estan preparadas para adaptarse a tu necesidad" },
    { title: "Salas de Conferencias", image: "../../../../public/sala-de-conferencias.jpg", hoverText: "Salas de conferencias ideales para tus presentaciones y eventos"},
    { title: "Espacios para Eventos", image: "../../../../public/espacio-eventos.png", hoverText: "Espacios versátiles para cualquier tipo de evento"},
    { title: "Coworking", image: "../../../../public/foto-coworking.jpeg", hoverText: "Áreas de coworking diseñadas para fomentar la colaboración y la creatividad" },
    { title: "Áreas de descanso", image: "../../../../public/descanso-oficinas.jpg", hoverText: "Zonas de descanso cómodas para relajarte y recargar energías",  }
  ];

  return (
    <>
      <div className="relative max-h-[550px] overflow-hidden mb-">
        <video
          className="w-full max-h-[550px] object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="./public/Coworking_Home_Promocional.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
      <div className="w-full h-[15vh] bg-blue-500 flex items-center justify-center mb-8">
        <h2 className="text-center text-white text-lg font-bold">Impulsa tu creatividad, comparte tu éxito.</h2>
      </div>
      <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Link key={index} to="/space/spaces" className="relative block h-60 bg-cover bg-center flex items-center justify-center text-white text-xl font-bold group" style={{ backgroundImage: `url(${card.image})` }}>
            <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-0 transition-opacity duration-500"></div>
            <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-500">{card.title}</span>
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
              <span className="text-white text-center">{card.hoverText}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="container mx-auto mt-16 p-8 bg-gray-100 text-gray-900 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">¿Qué es el coworking y cómo mejorar el rendimiento de las empresas?</h3>
        <p className="mb-8">El término coworking es un anglicismo que, traducido libremente, viene a significar «trabajando de forma compartida». Es decir, hacerlo en un espacio común. Esto ya nos da idea de algunas de sus ventajas, sobre todo en las grandes ciudades donde los alquileres son muy costosos. Por tanto, lugares de coworking en Madrid como los que ofrece Inspira son una magnífica elección.</p>

        <h4 className="text-xl font-semibold mb-2">¿En qué consiste exactamente el coworking?</h4>
        <p className="mb-4">Podemos definir esta figura como un sistema laboral que permite a profesionales de distintos sectores compartir un mismo lugar de trabajo tanto físico como tecnológico. De este modo, pueden desempeñar sus tareas propias al mismo tiempo que desarrollan proyectos conjunto</p>
        <p className="mb-4">Sin embargo, el coworking va más allá de ser un mero centro de negocio o una oficina compartida. Estos espacios se caracterizan, justamente, por su esencia colaborativa laboral. Las empresas o profesionales que los integran realizan sus propias tareas, pero también interaccionan entre ellos a través de los citados proyectos comunes.</p>
        <p className="mb-8">Por tanto, las ventajas de las oficinas de coworking sobrepasan el mero ahorro en el alquiler. Además, permiten establecer relaciones personales y profesionales dentro de una comunidad multidisciplinar. De hecho, también suelen contar con lugares donde relajarse y entablar contactos más informales. Pero también debe haber unas normas esenciales</p>

        <h4 className="text-xl font-semibold mb-2">Oficinas de coworking: ¿cómo funcionan?</h4>
        <p className="mb-4">El coworking en oficinas es una cesión de espacio para que trabajemos en un entorno común. Por tanto, se rige por unas normas básicas que deben seguirse para que la coexistencia sea correcta y fructífera. Estas premisas son las siguientes:</p>
        <ul className="list-disc list-inside mb-4">
          <li className="mb-2">Convivencia y respeto entre los miembros</li>
          <li className="mb-2">Libertad de acceso y zonas comunes que faciliten la conexión entre quienes forman parte del coworking.</li>
          <li className="mb-2">Existencia de un community builder o constructor de la comunidad. Este funciona como nexo que une a los distintos miembros y aporta iniciativas que ayudan a mejorar tanto el espacio como las condiciones de trabajo.</li>
          <li>Promoción de eventos y talleres de formación que, a su vez, multiplican las posibilidades de negocio</li>
        </ul>
        <p className="mb-8">Por tanto, el coworking es mucho más que el simple alquiler de salas para establecer la base de la empresa o para reuniones. Y esto se aprecia bien en todo lo que ofrecemos en Inspira.</p>

        <h4 className="text-xl font-semibold mb-2">Oficinas privadas por tiempos que van desde horas hasta meses</h4>
        <p className="mb-8">Se trata de despachos completamente equipados de mobiliario y servicios. Además, puedes elegirlos con la máxima flexibilidad. Los tienes del tamaño que necesites, desde un puesto de trabajo hasta veinticinco. Todos son luminosos y podemos personalizártelos. Por ejemplo, con terraza o sala de reuniones incorporada. </p>

        <h4 className="text-xl font-semibold mb-2">Salas de reuniones </h4>    
          <p className="mb-8">Precisamente, también te ofrecemos el alquiler de salas para reuniones con objeto de que puedas verte con tus empleados, clientes o proveedores. Además, las diseñamos a tu gusto. De este modo, puedes pedirla más o menos luminosa, con mayor o menor capacidad, con servicio de vídeo conferencia o incluso con catering. Todo en aras de que tu reunión sea un éxito</p>

        <h4 className="text-xl font-semibold mb-2"> Salas de Conferencias</h4>
        <p className="mb-8">Nuestras salas de conferencias están diseñadas para albergar tus presentaciones y eventos con la máxima profesionalidad. Equipadas con tecnología audiovisual de última generación, estas salas pueden adaptarse a tus necesidades específicas. Puedes elegir la capacidad adecuada, ajustar la iluminación a tu preferencia y disponer de servicios adicionales como videoconferencias o catering. Todo está preparado para que tu conferencia sea un éxito rotundo.</p>

        <h4 className="text-xl font-semibold mb-2">Espacios para eventos</h4>
        <p className="mb-8">Te ofrecemos espacios versátiles para todo tipo de eventos, desde lanzamientos de productos hasta celebraciones corporativas. Nuestros espacios están diseñados para adaptarse a tus necesidades, permitiéndote personalizar la capacidad, la disposición del mobiliario y la iluminación. Además, puedes solicitar servicios adicionales como equipo de sonido, proyección audiovisual y catering. Todo pensado para que tu evento sea un éxito memorable.</p>

        <h4 className="text-xl font-semibold mb-2">Espacios de coworking        </h4>
        <p className="mb-4">Todas nuestras instalaciones de <b>Coworking Space</b> cuentan con espacios donde puedes reunirte con otros miembros del coworking. En estos lugares, el objetivo es intercambiar opiniones y socializar al tiempo que descansas del trabajo.</p>
        <p className="mb-8">Asimismo, encontrarás otros servicios útiles al margen de tu oficina. Por ejemplo, te ofrecemos taquillas o trastero, reparaciones, aparcamiento, zona de café o té e incluso servicio de mudanzas. Para disfrutar de todos ellos tendrás la máxima flexibilidad y los mejores precios.</p>

        <h4 className="text-xl font-semibold mb-2">Áreas de Descanso</h4>
        <p>Nuestras áreas de descanso están diseñadas para ofrecerte un respiro en medio de la jornada laboral. Equipadas con muebles cómodos y un ambiente relajante, estos espacios te permiten desconectar y recargar energías. Puedes disfrutar de zonas tranquilas para relajarte, leer o simplemente tomar un descanso. Además, nuestras áreas están pensadas para fomentar el bienestar y la productividad, ofreciendo un espacio ideal para rejuvenecer y volver con renovada energía</p>
      </div>
    </>
  );
}

export default Home;
