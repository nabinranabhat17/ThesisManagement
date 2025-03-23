import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Add token interceptor for authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If we get an unauthorized error, clear the token
      localStorage.removeItem("adminToken");
    }
    return Promise.reject(error);
  }
);

export interface Department {
  id: number;
  name: string;
}

export interface Supervisor {
  id: number;
  name: string;
  email: string;
  department_id: number;
  department_name?: string;
  specialization?: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  student_id: string;
  department_id: number;
  department_name?: string;
  enrollment_year: number;
}

export interface Thesis {
  id: number;
  title: string;
  description: string;
  student_id: number;
  student_name?: string;
  supervisor_id: number;
  supervisor_name?: string;
  submission_date: string;
  grade?: string;
  created_at: string;
  updated_at: string;
}

// Theses API
export const getTheses = async () => {
  const response = await api.get<Thesis[]>("/theses");
  return response.data;
};

export const getThesisByDateRange = async (
  startDate: string,
  endDate: string
) => {
  const response = await api.get<Thesis[]>(
    `/theses/date-range/${startDate}/${endDate}`
  );
  return response.data;
};

export const getThesisByYear = async (year: string) => {
  const response = await api.get<Thesis[]>(`/theses/year/${year}`);
  return response.data;
};

export const getThesisBySupervisor = async (supervisorId: number) => {
  const response = await api.get<Thesis[]>(
    `/theses/supervisor/${supervisorId}`
  );
  return response.data;
};

export const getThesisByStudent = async (studentId: number) => {
  const response = await api.get<Thesis[]>(`/theses/student/${studentId}`);
  return response.data;
};

export const searchTheses = async (query: string) => {
  const response = await api.get<Thesis[]>(`/theses/search/${query}`);
  return response.data;
};

// Departments API
export const getDepartments = async () => {
  const response = await api.get<Department[]>("/departments");
  return response.data;
};

// Supervisors API
export const getSupervisors = async () => {
  const response = await api.get<Supervisor[]>("/supervisors");
  return response.data;
};

// Students API
export const getStudents = async () => {
  const response = await api.get<Student[]>("/students");
  return response.data;
};

// Admin Authentication API
export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
  admin: {
    id: number;
    username: string;
    email: string;
  };
}

export const loginAdmin = async (credentials: AdminLoginRequest) => {
  try {
    const response = await api.post<AdminLoginResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

export const getAdminProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

// Admin CRUD operations for theses, students, supervisors, departments
export const createThesis = async (
  thesis: Omit<Thesis, "id" | "created_at" | "updated_at">
) => {
  const response = await api.post<Thesis>("/theses", thesis);
  return response.data;
};

export const updateThesis = async (id: number, thesis: Partial<Thesis>) => {
  const response = await api.put<Thesis>(`/theses/${id}`, thesis);
  return response.data;
};

export const deleteThesis = async (id: number) => {
  await api.delete(`/theses/${id}`);
  return true;
};

// Admin CRUD operations for students
export const createStudent = async (
  student: Omit<Student, "id" | "department_name">
) => {
  const response = await api.post<Student>("/students", student);
  return response.data;
};

export const updateStudent = async (id: number, student: Partial<Student>) => {
  const response = await api.put<Student>(`/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: number) => {
  await api.delete(`/students/${id}`);
  return true;
};

// Admin CRUD operations for supervisors
export const createSupervisor = async (
  supervisor: Omit<Supervisor, "id" | "department_name">
) => {
  const response = await api.post<Supervisor>("/supervisors", supervisor);
  return response.data;
};

export const updateSupervisor = async (
  id: number,
  supervisor: Partial<Supervisor>
) => {
  const response = await api.put<Supervisor>(`/supervisors/${id}`, supervisor);
  return response.data;
};

export const deleteSupervisor = async (id: number) => {
  await api.delete(`/supervisors/${id}`);
  return true;
};

// Admin CRUD operations for departments
export const createDepartment = async (name: string) => {
  const response = await api.post<Department>("/departments", { name });
  return response.data;
};

export const updateDepartment = async (id: number, name: string) => {
  const response = await api.put<Department>(`/departments/${id}`, { name });
  return response.data;
};

export const deleteDepartment = async (id: number) => {
  await api.delete(`/departments/${id}`);
  return true;
};

export default api;
