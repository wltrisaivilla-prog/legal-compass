export interface LegalArea {
  path: string;
  name: string;
  category: string;
  title: string;
  description: string;
  intro: string[];
  support: string;
  consult: string;
  faqs: { q: string; a: string }[];
  related: string[];
}

export const legalAreas: LegalArea[] = [
  {
    path: "/servicios/derecho-laboral", name: "Derecho Laboral", category: "Materia Laboral",
    title: "Abogado Laboral en Guatemala | Litigios de Guatemala",
    description: "Consulte atención en despidos injustificados, reinstalaciones, indemnización post mortem y procesos contra el Estado con Litigios de Guatemala.",
    intro: [
      "Una situación laboral puede generar dudas sobre los documentos recibidos, la historia de la relación de trabajo y los pasos que conviene revisar. Litigios de Guatemala atiende consultas en materia laboral desde su oficina en zona 4 de Ciudad de Guatemala. El catálogo de la firma incluye despidos injustificados, reinstalaciones, indemnización post mortem y procesos contra el Estado. Esta página reúne esas opciones para que pueda identificar el servicio relacionado con su situación y preparar una conversación inicial con la firma.",
      "La consulta permite presentar lo ocurrido con sus propias palabras, ordenar las fechas relevantes y explicar qué información tiene disponible. Si conserva comunicaciones, contratos, constancias u otros documentos relacionados, puede indicar su existencia al solicitar una cita. La revisión individual es necesaria para valorar el alcance de la atención; una descripción general del servicio no determina qué procede en un caso concreto ni anticipa su resultado.",
      "Puede comunicarse por WhatsApp o mediante la página de Contacto para explicar brevemente el motivo de su consulta. No necesita escoger por su cuenta un proceso antes de conversar con la firma. Si su asunto reúne elementos de distintas materias, la atención inicial ayuda a delimitar la consulta sin confundir los servicios laborales con otras categorías del catálogo.",
    ],
    support: "La firma puede revisar la documentación relacionada con la consulta, escuchar los antecedentes y explicar el alcance del servicio laboral solicitado. La atención en reinstalaciones o despidos requiere una revisión individual, al igual que una consulta sobre indemnización post mortem o procesos contra el Estado.",
    consult: "Consulte cuando necesite entender una comunicación sobre su relación laboral, reunir antecedentes de un despido o preguntar por alguno de los cuatro servicios del catálogo. Si recibió una notificación, indique la fecha al pedir la cita para que la firma pueda valorar la atención necesaria.",
    faqs: [
      { q: "¿Qué asuntos laborales atiende la firma?", a: "El catálogo incluye despidos injustificados, reinstalaciones, indemnización post mortem y procesos contra el Estado." },
      { q: "¿Qué puedo preparar para una consulta por despido?", a: "Puede organizar las fechas de lo ocurrido y señalar los contratos, comunicaciones o constancias que conserva. La firma le indicará qué información revisar según su consulta." },
      { q: "¿Una consulta implica que procede una reinstalación?", a: "No. La reinstalación figura como servicio, pero su pertinencia debe valorarse individualmente. Esta página no determina el resultado de ningún asunto." },
    ],
    related: [],
  },
  {
    path: "/servicios/derecho-penal", name: "Derecho Penal", category: "Materia Penal",
    title: "Abogado Penal en Guatemala | Litigios de Guatemala",
    description: "Atención en procesos penales, hechos de tránsito, conciliaciones ante el Ministerio Público, violencia contra la mujer y negación de asistencia económica.",
    intro: [
      "Una consulta penal requiere explicar con claridad lo ocurrido y distinguir entre la información disponible y las dudas que aún deben resolverse. Litigios de Guatemala ofrece atención en materia penal desde zona 4 de Ciudad de Guatemala. Los servicios de su catálogo abarcan asistencia en hechos de tránsito, conciliaciones ante el Ministerio Público, procesos penales, violencia contra la mujer y negación de asistencia económica. Son asuntos diferentes, aunque puedan compartir documentos o antecedentes, y cada consulta necesita una revisión propia.",
      "Esta página ayuda a identificar esas áreas de atención antes de comunicarse con la firma. Puede preparar un relato ordenado de los hechos, las fechas que conoce y las comunicaciones o documentos que ha recibido. Al solicitar una cita, indique si existe una notificación o actuación pendiente. La información general aquí presentada no permite establecer responsabilidades, decidir una estrategia ni anticipar la forma en que se resolverá un proceso.",
      "Para iniciar la conversación puede usar WhatsApp o el formulario de Contacto. Describa de manera breve el tipo de asunto y acuerde con la firma cómo presentar la documentación para su revisión. La atención individual permitirá precisar el servicio solicitado y sus condiciones, sin asumir que una conciliación u otra actuación sea adecuada en todos los casos.",
    ],
    support: "La firma puede conocer los antecedentes y revisar la información del asunto para explicar la atención que ofrece dentro de su catálogo penal. La asistencia en hechos de tránsito, una consulta sobre conciliaciones y la atención de un proceso penal no son servicios intercambiables: su alcance depende de la revisión del caso.",
    consult: "Solicite una consulta si recibió una comunicación relacionada con un proceso penal, necesita asistencia por hechos de tránsito o desea información sobre alguno de los asuntos publicados. Explique al pedir la cita qué ocurrió y si hay una fecha indicada en una notificación.",
    faqs: [
      { q: "¿La firma atiende hechos de tránsito?", a: "Sí. La asistencia en hechos de tránsito forma parte de la categoría Materia Penal del catálogo actual." },
      { q: "¿Todos los asuntos pueden resolverse mediante conciliación?", a: "Esta página no establece que todos los asuntos admitan conciliación. La firma ofrece conciliaciones ante el Ministerio Público y debe revisar cada consulta para explicar su alcance." },
      { q: "¿La negación de asistencia económica pertenece a esta categoría?", a: "Sí, aparece en Materia Penal. Las consultas sobre pensiones alimenticias se presentan por separado en la categoría Materia Familiar." },
    ],
    related: ["/servicios/derecho-familiar"],
  },
  {
    path: "/servicios/derecho-mercantil", name: "Derecho Mercantil", category: "Materia Mercantil",
    title: "Abogado Mercantil en Guatemala | Litigios de Guatemala",
    description: "Servicios mercantiles en Guatemala: sociedades, empresas, asambleas, actas, títulos de acciones, nombramientos, certificaciones y cambios de dirección.",
    intro: [
      "Las consultas sobre una sociedad o empresa suelen reunir antecedentes de su organización, decisiones internas y documentación que necesita revisión. Litigios de Guatemala ofrece servicios en materia mercantil desde zona 4 de Ciudad de Guatemala. El catálogo comprende constitución de sociedades, modificaciones y ampliaciones, empresas mercantiles y celebración de asambleas ordinarias y extraordinarias. También incluye puntos resolutivos, títulos de acciones, actas notariales de nombramiento de auxiliares de comercio, certificaciones y cambio de dirección.",
      "Identificar el servicio que necesita no siempre consiste en elegir un documento aislado. Puede ser útil explicar qué actividad desarrolla la empresa, qué decisión se desea documentar y cuáles son los antecedentes disponibles. La firma puede conocer esa información en una consulta y precisar el alcance de la atención solicitada. La descripción de esta página no reemplaza la revisión de los documentos de una sociedad ni establece requisitos concretos para todas las empresas.",
      "Si está organizando una consulta, indique si se trata de una constitución, una modificación o un asunto de una empresa existente. Puede contactarnos por WhatsApp o por la página de Contacto para acordar cómo presentar la información. Las opciones y condiciones se explican individualmente; el catálogo no implica plazos ni resultados garantizados para trámites o decisiones mercantiles.",
    ],
    support: "La firma puede revisar los antecedentes que correspondan al servicio solicitado y ayudar a delimitar la documentación relacionada con sociedades, empresas y decisiones de asamblea. Los nombramientos, certificaciones y títulos de acciones se presentan como servicios propios del catálogo mercantil, sin extender esta página a actividades no publicadas.",
    consult: "Consulte al preparar la constitución de una sociedad, una modificación o una asamblea, o cuando necesite información sobre nombramientos, certificaciones o cambios de dirección. Lleve una explicación del objetivo y señale qué documentos de la empresa están disponibles.",
    faqs: [
      { q: "¿Atienden sociedades y empresas mercantiles?", a: "Sí. Constitución de sociedades, modificaciones y ampliaciones y empresas mercantiles forman parte del catálogo." },
      { q: "¿Qué asambleas están incluidas?", a: "El catálogo contempla celebración de asambleas ordinarias y extraordinarias, además de punto resolutivo o punto de actas." },
      { q: "¿Puedo consultar sobre un nombramiento?", a: "Sí. Se ofrecen actas notariales de nombramiento de auxiliares de comercio. La firma debe revisar el objetivo y los antecedentes de su solicitud." },
    ],
    related: ["/servicios/servicios-notariales"],
  },
  {
    path: "/servicios/derecho-familiar", name: "Derecho Familiar", category: "Materia Familiar",
    title: "Abogado de Familia en Guatemala | Litigios de Guatemala",
    description: "Consulte servicios de materia familiar en Guatemala: pensiones alimenticias, obligación de hacer y juicios de ejecución con Litigios de Guatemala.",
    intro: [
      "Los asuntos familiares requieren escuchar los antecedentes con atención y comprender cuál es la consulta que necesita resolver. Litigios de Guatemala ofrece servicios de materia familiar desde zona 4 de Ciudad de Guatemala. Esta categoría del catálogo incluye pensiones alimenticias, obligación de hacer y juicios de ejecución. La página reúne exclusivamente esas opciones para mantener claro el alcance de los servicios publicados y facilitar el contacto con la firma.",
      "Antes de una consulta puede organizar una explicación de lo ocurrido, las fechas relevantes y los documentos o comunicaciones que conserva. Si existe una resolución o una notificación relacionada con el asunto, indique su existencia cuando solicite la cita. La revisión individual permite conocer los antecedentes y explicar la atención disponible; la información de esta página no determina obligaciones de una persona, cantidades, actuaciones específicas ni el resultado de un procedimiento.",
      "Algunos hechos pueden dar lugar a preguntas de otra materia. Por ejemplo, la negación de asistencia económica aparece en la categoría penal, mientras que las pensiones alimenticias están en la familiar. Esa distinción no decide cómo debe tratarse su caso: permite encontrar información del catálogo sin mezclar categorías. Puede iniciar una conversación por WhatsApp o Contacto para precisar el motivo de la consulta y acordar la revisión correspondiente.",
    ],
    support: "La firma puede escuchar su consulta sobre pensiones alimenticias, obligación de hacer o juicios de ejecución y revisar los antecedentes que presente. El alcance de la atención se explica a partir de esa revisión, sin asumir que todos los asuntos familiares requieren la misma actuación.",
    consult: "Consulte cuando necesite información sobre uno de estos servicios o quiera presentar documentos relacionados con una obligación o ejecución. Si la consulta se relaciona con otra categoría del catálogo, describa el asunto para que pueda delimitarse la atención.",
    faqs: [
      { q: "¿Qué servicios familiares están publicados?", a: "La categoría Materia Familiar incluye pensiones alimenticias, obligación de hacer y juicios de ejecución." },
      { q: "¿Pueden indicar una cantidad de pensión desde esta página?", a: "No. La página describe servicios generales y no realiza una valoración individual ni establece cantidades para una situación concreta." },
      { q: "¿Es lo mismo una pensión alimenticia que la negación de asistencia económica?", a: "El sitio las presenta en categorías distintas: pensiones alimenticias en Materia Familiar y negación de asistencia económica en Materia Penal. Una consulta permite revisar sus antecedentes sin asumir que ambos servicios sean equivalentes." },
    ],
    related: ["/servicios/derecho-penal"],
  },
  {
    path: "/servicios/bienes-raices", name: "Bienes Raíces", category: "Bienes Raíces",
    title: "Abogados de Bienes Raíces en Guatemala | Litigios de Guatemala",
    description: "Servicios legales de bienes raíces en Guatemala: compraventas, partición, división, unificación, usufructo, hipotecas, permutas y comodato.",
    intro: [
      "Una consulta sobre un inmueble puede relacionarse con una operación, con documentación existente o con la forma en que varias personas participan en una propiedad. Litigios de Guatemala ofrece servicios de bienes raíces desde zona 4 de Ciudad de Guatemala. Su catálogo incluye contratos de compraventa, partición, división de la cosa común, unificación de propiedades y constitución de usufructo, junto con otros servicios inmobiliarios detallados en esta página.",
      "La categoría también comprende mutuo con garantía hipotecaria, cancelación de hipotecas por prescripción, inmovilización de propiedades, permutas y contrato de comodato. Los nombres permiten identificar el tipo de consulta, pero no establecen que una opción sea adecuada para cualquier inmueble. Para conocer el alcance de la atención es necesario revisar los antecedentes de la solicitud y la información que tenga disponible sobre la propiedad u operación.",
      "Al contactar a la firma puede explicar si necesita información sobre una compraventa, una división, un derecho posesorio u otro servicio del catálogo. Indique qué documentos conserva y si existe una operación o comunicación pendiente. La consulta individual ayuda a ordenar esa información y a precisar el servicio solicitado. Esta página no confirma la situación jurídica de una propiedad, no sustituye la revisión de documentos y no promete plazos ni resultados de trámites inmobiliarios.",
    ],
    support: "La firma puede revisar los antecedentes de su consulta inmobiliaria y explicar la atención publicada para contratos, operaciones y documentación de propiedades. Cada servicio requiere delimitar el objeto de la solicitud; una consulta sobre usufructo, comodato o hipoteca no supone por sí misma que deba utilizarse esa figura.",
    consult: "Consulte antes de decidir sobre un documento relacionado con una operación inmobiliaria o cuando quiera aclarar el alcance de alguno de los servicios publicados. Presente el objetivo de la operación y señale los documentos disponibles para la revisión individual.",
    faqs: [
      { q: "¿Atienden compraventas y división de propiedades?", a: "Sí. El catálogo incluye contratos de compraventa, contratos de partición, división de la cosa común y unificación de propiedades." },
      { q: "¿Puedo consultar por una garantía hipotecaria?", a: "Sí. Mutuo con garantía hipotecaria y cancelación de hipotecas por prescripción son servicios publicados. La consulta debe revisarse individualmente." },
      { q: "¿También ofrecen usufructo y comodato?", a: "Sí. Constitución de usufructo y contrato de comodato aparecen en Bienes Raíces, junto con permutas e inmovilización de propiedades." },
    ],
    related: ["/servicios/servicios-notariales"],
  },
  {
    path: "/servicios/servicios-notariales", name: "Servicios Notariales", category: "Actos Notariales",
    title: "Servicios Notariales en Guatemala | Litigios de Guatemala",
    description: "Actos notariales en Guatemala: legalización de firmas y documentos, actas, matrimonios, mandatos, carta poder, finiquitos y contratos de arrendamiento.",
    intro: [
      "Una solicitud notarial puede tener objetivos diferentes: presentar un documento, dejar constancia de un acto o consultar por un contrato del catálogo. Litigios de Guatemala ofrece servicios de Actos Notariales desde zona 4 de Ciudad de Guatemala. La categoría incluye actas notariales de requerimiento y de legalización de firmas o documentos, liquidación total o parcial de patrimonio conyugal y celebraciones de matrimonios nacionales y matrimonios de extranjeros o mixtos.",
      "También se publican rescisiones, ampliaciones, carta poder, finiquitos, mandatos generales, especiales y judiciales, así como contratos de arrendamiento. Esta página utiliza los servicios de esa categoría para ayudarle a reconocer el motivo de su consulta. No todos los documentos requieren la misma atención, y el nombre de un servicio no sustituye la revisión de su finalidad y sus antecedentes.",
      "Para solicitar información puede describir qué desea documentar y señalar si ya cuenta con un texto o con documentación relacionada. La firma podrá explicar el alcance de la atención después de conocer la solicitud. Los documentos provenientes del extranjero y los asuntos de jurisdicción voluntaria se mantienen en sus categorías propias del catálogo general. Puede comunicarse por WhatsApp o Contacto para coordinar la consulta, sin asumir requisitos, plazos o resultados a partir de esta información general.",
    ],
    support: "La firma puede revisar el propósito de la solicitud y la documentación disponible para explicar el servicio notarial correspondiente. La atención se limita a los actos publicados en el catálogo; los nombramientos de auxiliares de comercio se describen por separado en la página mercantil.",
    consult: "Consulte cuando necesite información sobre legalización, actas, mandatos o contratos de arrendamiento del catálogo, o antes de definir el documento que desea solicitar. Explique su objetivo y si ya dispone de documentos para revisión.",
    faqs: [
      { q: "¿Qué legalizaciones se ofrecen?", a: "El catálogo de Actos Notariales incluye actas notariales de legalización de firmas y actas notariales de legalización de documentos." },
      { q: "¿Atienden mandatos y carta poder?", a: "Sí. Se publican carta poder y mandatos generales, especiales y judiciales. La firma revisará el propósito de su solicitud para explicar el servicio." },
      { q: "¿Los documentos extranjeros son parte de esta misma categoría?", a: "No. El catálogo presenta Documentos Provenientes del Extranjero como categoría independiente. Puede consultar el catálogo general para identificar sus servicios." },
    ],
    related: ["/servicios/derecho-mercantil", "/servicios/bienes-raices"],
  },
];
