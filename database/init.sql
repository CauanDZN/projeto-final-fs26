-- Criação da tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL -- 'student', 'teacher', 'technician', 'coordinator'
);

-- Criação da tabela de turmas
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Criação da tabela de alunos nas turmas
CREATE TABLE student_classes (
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    PRIMARY KEY (student_id, class_id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- Criação da tabela de avaliações educacionais
CREATE TABLE educational_evaluations (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 0 AND rating <= 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- Criação da tabela de itens para avaliação técnica
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Criação da tabela de solicitações de serviço técnico
CREATE TABLE service_requests (
    id SERIAL PRIMARY KEY,
    class_id INT NOT NULL,
    item_id INT NOT NULL,
    issue_description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);

-- Criação da tabela de relatórios técnicos
CREATE TABLE technical_reports (
    id SERIAL PRIMARY KEY,
    request_id INT NOT NULL,
    technician_id INT NOT NULL,
    report TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES service_requests(id),
    FOREIGN KEY (technician_id) REFERENCES users(id)
);

-- Criação da tabela de professores nas turmas
CREATE TABLE teacher_classes (
    teacher_id INT NOT NULL,
    class_id INT NOT NULL,
    PRIMARY KEY (teacher_id, class_id),
    FOREIGN KEY (teacher_id) REFERENCES users(id),
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- Inserção de itens para avaliação técnica
INSERT INTO items (name) VALUES 
('Ar-Condicionado'),
('Projetor'),
('Lousa'),
('Limpeza');
