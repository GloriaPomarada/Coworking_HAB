-- INTRODUCIMOS DATOS EN LAS TABLAS:

-- Insertar usuarios
INSERT INTO usuarios (id, email, username, password, avatar, active, role, registrationCode, recoverPassCode)
VALUES
('1', 'usuario1@example.com', 'usuario1', 'password123', NULL, true, 'cliente', 'regCode123', 'recov123'),
('2', 'usuario2@example.com', 'usuario2', 'password456', NULL, true, 'cliente', 'regCode456', 'recov456'),
('3', 'admin@example.com', 'admin', 'adminpass', NULL, true, 'admin', NULL, NULL);

-- Relacionar usuarios como admins
INSERT INTO admins (usuario_id) VALUES ('3'); -- '3' corresponde al usuario 'admin' creado anteriormente

-- Insertar categorías de espacios
INSERT INTO categorias_espacios (nombre, descripcion)
VALUES
('Oficinas privadas', 'Espacios para trabajo individual o pequeños equipos'),
('Salas de reuniones', 'Espacios equipados para reuniones y presentaciones'),
('Espacios compartidos', 'Áreas abiertas para coworking');

-- Insertar categorías de incidencias
INSERT INTO categorias_incidencias (nombre, descripcion)
VALUES
('Eléctrica', 'Problemas relacionados con instalaciones eléctricas'),
('Mobiliario', 'Incidencias relacionadas con muebles y equipamientos'),
('Limpieza', 'Problemas de limpieza y mantenimiento');

-- Insertar espacios
INSERT INTO espacios (nombre, descripcion, categoria_id, capacidad, precio_por_persona, precio_espacio_completo, direccion, estado, incidencias)
VALUES
('Oficina A1', 'Oficina privada con escritorio y silla ergonómica', 1, 1, 100.00, 400.00, 'Calle Principal 123', 'libre', NULL),
('Sala de Reuniones B', 'Sala equipada con proyector y pizarra', 2, 10, 20.00, 150.00, 'Avenida Central 456', 'libre', NULL),
('Espacio Compartido C', 'Área abierta con mesas compartidas', 3, 20, 10.00, 150.00, 'Plaza Mayor 789', 'libre', NULL);

-- Insertar incidencias para espacios específicos
INSERT INTO incidencias (espacio_id, categoria_incidencia_id, usuario_id, mensaje, fecha)
VALUES
(1, 3, '1', 'Suelo sucio y polvoriento', '2024-06-28 10:00:00'),
(3, 1, '2', 'Fallo en el enchufe de la pared', '2024-06-29 15:30:00');

-- Insertar fotos de espacios
INSERT INTO espacios_fotos (name, espacio_id)
VALUES
('oficina_a1_1.jpg', 1),
('sala_reuniones_b_1.jpg', 2),
('espacio_compartido_c_1.jpg', 3);

-- Insertar votos para espacios
INSERT INTO espacios_votos (value, usuario_id, espacio_id)
VALUES
(5, '1', 1),
(4, '2', 2),
(3, '1', 3);

-- Insertar equipamientos
INSERT INTO equipamientos (nombre, descripcion, categoria_id)
VALUES
('Proyector', 'Proyector HD para presentaciones', 2),
('Sillas ergonómicas', 'Sillas con soporte lumbar ajustable', 1),
('Mesas de trabajo', 'Mesas amplias y resistentes', 3);

-- Insertar datos aleatorios en espacios_equipamientos
INSERT INTO espacios_equipamientos (espacio_id, equipamiento_id)
VALUES
(1, 2), -- Oficina A1: Sillas ergonómicas
(1, 3), -- Oficina A1: Mesas de trabajo
(2, 1), -- Sala de Reuniones B: Proyector
(2, 3), -- Sala de Reuniones B: Mesas de trabajo
(3, 2), -- Espacio Compartido C: Sillas ergonómicas
(3, 3); -- Espacio Compartido C: Mesas de trabajo

-- Insertar reservas
INSERT INTO reservas (usuario_id, espacio_id, tipo, fecha_inicio, fecha_fin, estado, observaciones)
VALUES
('1', 1, 'por_persona', '2024-07-01', '2024-07-01', 'reservado', 'Reserva para entrevista de trabajo'),
('2', 2, 'espacio_completo', '2024-07-02', '2024-07-02', 'reservado', 'Reunión mensual de equipo');

-- Insertar pagos asociados a reservas
INSERT INTO pagos (reserva_id, a_pagar, metodo_pago, observaciones)
VALUES
(1, 100.00, 'tarjeta', 'Pago por reserva de oficina A1'),
(2, 150.00, 'transferencia', 'Pago por reserva de sala de reuniones B');

UPDATE usuarios SET role = 'admin' WHERE id = '1';