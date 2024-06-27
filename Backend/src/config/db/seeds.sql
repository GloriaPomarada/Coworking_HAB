-- Insertar usuarios
INSERT INTO usuarios (id, email, username, password, avatar, active, role, registrationCode, recoverPassCode)
VALUES 
('123e4567-e89b-12d3-a456-426614174000', 'admin@example.com', 'admin_user', 'admin_password_hash', NULL, true, 'admin', 'ABC123', 'XYZ456'),
('123e4567-e89b-12d3-a456-426614174001', 'cliente@example.com', 'cliente_user', 'cliente_password_hash', NULL, true, 'cliente', 'DEF456', 'UVW789');

-- Insertar admins
INSERT INTO admins (usuario_id)
VALUES 
('123e4567-e89b-12d3-a456-426614174000');

-- Insertar espacios
INSERT INTO espacios (nombre, descripcion, tipo, equipamiento, capacidad, precio_por_persona, precio_espacio_completo, direccion, estado, incidencias, imagen)
VALUES 
('Sala de Reuniones A', 'Sala equipada con proyector y pizarra blanca.', 'sala', 'Proyector, Pizarra, Wi-Fi', 10, 5.00, 50.00, 'Calle Falsa 123, Ciudad', 'libre', NULL, NULL),
('Despacho B', 'Despacho privado con aire acondicionado.', 'despacho', 'Wi-Fi, Aire acondicionado', 4, 10.00, 35.00, 'Avenida Siempreviva 742, Ciudad', 'libre', NULL, NULL);

-- Insertar espacios_votos
INSERT INTO espacios_votos (value, usuario_id, espacio_id)
VALUES 
(5, '123e4567-e89b-12d3-a456-426614174001', 1),
(4, '123e4567-e89b-12d3-a456-426614174001', 2);

-- Insertar reservas
INSERT INTO reservas (usuario_id, espacio_id, tipo, fecha_inicio, fecha_fin, estado, observaciones)
VALUES 
('123e4567-e89b-12d3-a456-426614174001', 1, 'por_persona', '2024-07-01', '2024-07-01', 'reservado', 'Reunión de negocios'),
('123e4567-e89b-12d3-a456-426614174001', 2, 'espacio_completo', '2024-07-02', '2024-07-03', 'pendiente', 'Reservado para un taller');

-- Insertar pagos
INSERT INTO pagos (reserva_id, a_pagar, metodo_pago, observaciones)
VALUES 
(1, 50.00, 'tarjeta', 'Pago completado con tarjeta de crédito'),
(2, 70.00, 'transferencia', 'Pago pendiente de confirmación');