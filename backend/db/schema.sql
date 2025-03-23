--@Block
CREATE DATABASE IF NOT EXISTS thesis_management;
USE thesis_management;
--@Block
-- Drop tables if they exist (in reverse order due to foreign key constraints)
DROP TABLE IF EXISTS theses;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS supervisors;
DROP TABLE IF EXISTS departments;
--@Block
-- Create departments table
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--@Block
-- Create supervisors table
CREATE TABLE supervisors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  department_id INT,
  specialization VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);
--@Block
-- Create students table
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  student_id VARCHAR(50) NOT NULL UNIQUE,
  department_id INT,
  enrollment_year INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);
--@Block
-- Create theses table (updated to contain only completed theses)
CREATE TABLE theses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  student_id INT,
  supervisor_id INT,
  submission_date DATE NOT NULL,
  grade VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE SET NULL,
  FOREIGN KEY (supervisor_id) REFERENCES supervisors(id) ON DELETE SET NULL
);
--@Block
-- Add admins table
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--@Block
-- Insert sample data into departments
INSERT INTO departments (name) VALUES 
('Computer Science'),
('Electrical Engineering'),
('Mechanical Engineering'),
('Civil Engineering'),
('Chemistry'),
('Physics'),
('Mathematics'),
('Biology');
--@Block
-- Insert sample data into supervisors
INSERT INTO supervisors (name, email, department_id, specialization) VALUES
('Dr. John Smith', 'john.smith@university.edu', 1, 'Artificial Intelligence'),
('Dr. Sarah Johnson', 'sarah.johnson@university.edu', 1, 'Database Systems'),
('Dr. Michael Brown', 'michael.brown@university.edu', 2, 'Power Electronics'),
('Dr. Amanda Wilson', 'amanda.wilson@university.edu', 3, 'Fluid Mechanics'),
('Dr. Robert Davis', 'robert.davis@university.edu', 5, 'Organic Chemistry'),
('Dr. Emily Robinson', 'emily.robinson@university.edu', 1, 'Cybersecurity'),
('Dr. David Lee', 'david.lee@university.edu', 2, 'Signal Processing'),
('Dr. Jennifer Garcia', 'jennifer.garcia@university.edu', 4, 'Structural Engineering'),
('Dr. Christopher Martinez', 'christopher.martinez@university.edu', 5, 'Analytical Chemistry'),
('Dr. Jessica Thompson', 'jessica.thompson@university.edu', 6, 'Quantum Physics'),
('Dr. Daniel Miller', 'daniel.miller@university.edu', 7, 'Applied Mathematics'),
('Dr. Michelle Taylor', 'michelle.taylor@university.edu', 8, 'Molecular Biology'),
('Dr. Kevin Wright', 'kevin.wright@university.edu', 1, 'Machine Learning'),
('Dr. Lisa Chen', 'lisa.chen@university.edu', 2, 'Renewable Energy'),
('Dr. Paul Wilson', 'paul.wilson@university.edu', 3, 'Thermodynamics');
--@Block
-- Insert sample data into students
INSERT INTO students (name, email, student_id, department_id, enrollment_year) VALUES
('James Wilson', 'james.wilson@university.edu', 'CS001', 1, 2018),
('Emily Johnson', 'emily.johnson@university.edu', 'CS002', 1, 2018),
('Daniel Lee', 'daniel.lee@university.edu', 'EE001', 2, 2017),
('Jessica Brown', 'jessica.brown@university.edu', 'ME001', 3, 2018),
('Alex Martinez', 'alex.martinez@university.edu', 'CH001', 5, 2019),
('Sophia Garcia', 'sophia.garcia@university.edu', 'CS003', 1, 2018),
('Ethan Rodriguez', 'ethan.rodriguez@university.edu', 'EE002', 2, 2019),
('Olivia Hernandez', 'olivia.hernandez@university.edu', 'ME002', 3, 2017),
('Noah Smith', 'noah.smith@university.edu', 'CE001', 4, 2018),
('Emma Davis', 'emma.davis@university.edu', 'CH002', 5, 2018),
('Matthew Thompson', 'matthew.thompson@university.edu', 'PH001', 6, 2019),
('Ava Walker', 'ava.walker@university.edu', 'MA001', 7, 2018),
('William Anderson', 'william.anderson@university.edu', 'BI001', 8, 2018),
('Isabella Thomas', 'isabella.thomas@university.edu', 'CS004', 1, 2019),
('Benjamin Jackson', 'benjamin.jackson@university.edu', 'EE003', 2, 2018),
('Mia White', 'mia.white@university.edu', 'ME003', 3, 2018),
('Mason Harris', 'mason.harris@university.edu', 'CE002', 4, 2017),
('Charlotte Martin', 'charlotte.martin@university.edu', 'CH003', 5, 2017),
('Jacob Thompson', 'jacob.thompson@university.edu', 'PH002', 6, 2018),
('Abigail Garcia', 'abigail.garcia@university.edu', 'MA002', 7, 2018),
('Elijah Martinez', 'elijah.martinez@university.edu', 'BI002', 8, 2019),
('Avery Robinson', 'avery.robinson@university.edu', 'CS005', 1, 2017),
('Lucas Clark', 'lucas.clark@university.edu', 'EE004', 2, 2018),
('Harper Lewis', 'harper.lewis@university.edu', 'ME004', 3, 2019),
('Logan Lee', 'logan.lee@university.edu', 'CE003', 4, 2018),
('Zoey Walker', 'zoey.walker@university.edu', 'CH004', 5, 2018),
('Gabriel Hall', 'gabriel.hall@university.edu', 'PH003', 6, 2017),
('Lily Young', 'lily.young@university.edu', 'MA003', 7, 2018),
('Julian King', 'julian.king@university.edu', 'BI003', 8, 2018),
('Hannah Scott', 'hannah.scott@university.edu', 'CS006', 1, 2019),
('Aaron Green', 'aaron.green@university.edu', 'EE005', 2, 2018),
('Nora Baker', 'nora.baker@university.edu', 'ME005', 3, 2018),
('Isaac Adams', 'isaac.adams@university.edu', 'CE004', 4, 2019),
('Grace Nelson', 'grace.nelson@university.edu', 'CH005', 5, 2017),
('Caleb Hill', 'caleb.hill@university.edu', 'PH004', 6, 2018),
('Layla Rivera', 'layla.rivera@university.edu', 'MA004', 7, 2018),
('Luke Campbell', 'luke.campbell@university.edu', 'BI004', 8, 2018),
('Audrey Mitchell', 'audrey.mitchell@university.edu', 'CS007', 1, 2017),
('Adam Roberts', 'adam.roberts@university.edu', 'EE006', 2, 2019),
('Riley Carter', 'riley.carter@university.edu', 'ME006', 3, 2018),
('Hunter Phillips', 'hunter.phillips@university.edu', 'CE005', 4, 2018),
('Leah Evans', 'leah.evans@university.edu', 'CH006', 5, 2018),
('Jack Torres', 'jack.torres@university.edu', 'PH005', 6, 2019),
('Chloe Nguyen', 'chloe.nguyen@university.edu', 'MA005', 7, 2017),
('David Collins', 'david.collins@university.edu', 'BI005', 8, 2018),
('Victoria Morgan', 'victoria.morgan@university.edu', 'CS008', 1, 2018),
('Carson Murphy', 'carson.murphy@university.edu', 'EE007', 2, 2018),
('Paisley Cook', 'paisley.cook@university.edu', 'ME007', 3, 2019),
('Owen Bailey', 'owen.bailey@university.edu', 'CE006', 4, 2017),
('Scarlett Richardson', 'scarlett.richardson@university.edu', 'CH007', 5, 2018),
('Nathan Cox', 'nathan.cox@university.edu', 'PH006', 6, 2018);
--@Block
-- Insert sample data into theses (completed theses only with submission dates)
INSERT INTO theses (title, description, student_id, supervisor_id, submission_date, grade) VALUES
('Neural Networks for Image Recognition', 'Research on improving image recognition algorithms using deep neural networks', 1, 1, '2022-05-15', 'A'),
('Cloud Database Optimization', 'Study of optimization techniques for cloud-based database systems', 2, 2, '2022-06-10', 'A-'),
('Smart Grid Efficiency', 'Analysis of power efficiency in smart grid implementations', 3, 3, '2021-12-15', 'B+'),
('Fluid Dynamics in Automotive Design', 'Study of fluid dynamics principles applied to automotive aerodynamics', 4, 4, '2022-07-01', 'A'),
('Green Chemistry Synthesis Methods', 'Development of environmentally friendly methods for chemical synthesis', 5, 5, '2023-01-20', 'A'),
('Blockchain Security Implementation', 'Analysis and implementation of security measures for blockchain networks', 6, 6, '2022-05-25', 'B+'),
('5G Network Optimization', 'Research on optimizing performance of 5G wireless networks', 7, 7, '2023-02-28', 'A-'),
('Earthquake-Resistant Structures', 'Design methodologies for earthquake-resistant building structures', 8, 8, '2021-11-10', 'A'),
('Novel Catalysts for Chemical Reactions', 'Discovery and testing of new catalysts for industrial chemical reactions', 9, 9, '2022-08-05', 'B'),
('Quantum Computing Applications', 'Exploration of practical applications for quantum computing technology', 10, 10, '2023-03-15', 'A+'),
('Differential Equations in Climate Modeling', 'Application of differential equations to improve climate prediction models', 11, 11, '2022-07-20', 'A-'),
('Gene Editing Technologies', 'Evaluation of CRISPR and other gene editing technologies for medical applications', 12, 12, '2022-12-01', 'A'),
('Computer Vision for Autonomous Vehicles', 'Development of computer vision systems for self-driving cars', 13, 13, '2023-04-10', 'A'),
('Solar Energy Storage Solutions', 'Research on improving energy storage for solar power systems', 14, 14, '2022-09-30', 'B+'),
('Heat Transfer in Mechanical Systems', 'Analysis of heat transfer mechanisms in complex mechanical systems', 15, 15, '2022-06-15', 'A-'),
('Natural Language Processing Algorithms', 'Improvements to natural language processing for multilingual applications', 16, 1, '2022-11-20', 'A'),
('IoT Security Frameworks', 'Development of security frameworks for Internet of Things devices', 17, 6, '2021-10-05', 'B+'),
('Advanced Signal Processing Techniques', 'Novel techniques for processing and analyzing complex signals', 18, 7, '2022-05-12', 'A-'),
('Sustainable Building Materials', 'Evaluation and testing of eco-friendly construction materials', 19, 8, '2022-08-22', 'A'),
('Polymer Chemistry Innovations', 'New approaches to polymer synthesis and applications', 20, 9, '2023-01-30', 'B+'),
('Quantum Entanglement Studies', 'Experimental studies of quantum entanglement phenomena', 21, 10, '2022-07-05', 'A'),
('Cryptographic Algorithm Design', 'Design and analysis of new cryptographic algorithms', 22, 11, '2022-10-18', 'A-'),
('Microbial Fuel Cells', 'Development of microbial fuel cells for sustainable energy', 23, 12, '2023-03-25', 'B'),
('Reinforcement Learning Applications', 'Applications of reinforcement learning in robotics', 24, 13, '2022-09-15', 'A'),
('Power Electronics for Electric Vehicles', 'Advancements in power electronics for electric vehicle efficiency', 25, 14, '2022-04-20', 'A-'),
('Computational Fluid Dynamics Models', 'Development of improved CFD models for aerospace applications', 26, 15, '2022-12-10', 'B+'),
('Seismic Analysis Methods', 'New methods for analyzing seismic data in structural engineering', 27, 8, '2021-11-28', 'A'),
('Medicinal Chemistry Research', 'Research on compounds with potential pharmaceutical applications', 28, 5, '2022-06-30', 'A-'),
('Astrophysics Data Analysis', 'Analysis techniques for large-scale astrophysical data', 29, 10, '2023-02-15', 'A'),
('Statistical Learning Theory', 'Advancements in statistical learning theory and applications', 30, 11, '2022-08-25', 'B+'),
('CRISPR Gene Therapy Applications', 'Applications of CRISPR technology in gene therapy', 31, 12, '2022-04-05', 'A'),
('Cybersecurity Threat Analysis', 'Methods for detecting and preventing emerging cybersecurity threats', 32, 6, '2022-11-15', 'A-'),
('Renewable Energy Grid Integration', 'Solutions for integrating renewable energy into existing power grids', 33, 3, '2023-01-10', 'B'),
('Structural Health Monitoring', 'Systems for real-time monitoring of structural integrity in buildings', 34, 8, '2022-07-28', 'A'),
('Analytical Chemistry Techniques', 'Advanced techniques for chemical analysis in environmental samples', 35, 9, '2022-10-05', 'A-'),
('Theoretical Physics Models', 'Development of theoretical models in particle physics', 36, 10, '2023-03-20', 'A+'),
('Numerical Methods Optimization', 'Optimization of numerical methods for engineering applications', 37, 11, '2022-05-30', 'B+'),
('Genetic Diversity Conservation', 'Strategies for conserving genetic diversity in endangered species', 38, 12, '2022-09-22', 'A'),
('Machine Learning for Medical Imaging', 'Applications of ML in medical image analysis and diagnosis', 39, 13, '2023-02-05', 'A'),
('Smart Grid Cybersecurity', 'Security measures for protecting smart grid infrastructure', 40, 7, '2022-08-15', 'B+'),
('Nanomaterials in Engineering', 'Applications of nanomaterials in mechanical engineering', 41, 4, '2022-12-20', 'A-'),
('Bridge Design Innovations', 'Innovative approaches to bridge design and construction', 42, 8, '2023-04-15', 'A'),
('Green Chemistry Catalysts', 'Development of environmentally friendly catalysts', 43, 9, '2022-06-25', 'B'),
('Quantum Cryptography Systems', 'Implementation and analysis of quantum cryptography systems', 44, 10, '2022-11-05', 'A'),
('Mathematical Modeling of Epidemics', 'Mathematical models for predicting epidemic spread', 45, 11, '2023-03-10', 'A-'),
('Marine Ecosystem Conservation', 'Strategies for conserving and restoring marine ecosystems', 46, 12, '2022-07-15', 'B+'),
('Deep Learning for Speech Recognition', 'Improvements to speech recognition using deep learning', 47, 13, '2022-10-28', 'A'),
('Smart Energy Management Systems', 'Development of intelligent systems for energy management', 48, 14, '2023-01-15', 'A-'),
('Advanced Manufacturing Techniques', 'Research on cutting-edge manufacturing processes', 49, 15, '2022-09-10', 'B+'),
('Software Testing Methodologies', 'Development of improved software testing approaches', 50, 1, '2022-12-05', 'A');
--@Block
-- Insert a default admin (username: admin, password: admin123)
-- Note: In production, use a secure password
-- Update the password hash to ensure it's correctly generated for 'admin123'
INSERT INTO admins (username, email, password) 
VALUES ('admin', 'admin@thesismanagement.com', 
        '$2b$10$3euPcmQFCiblsZeEu5s7p.9wVslfRvXnKEUJK7T9LswBrTDEw.JES');
