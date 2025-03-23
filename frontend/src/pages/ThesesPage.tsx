import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { format, parseISO } from "date-fns";
import Container from "../components/ui/Container";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
} from "../components/ui/Card";
import { Table, THead, TBody, TR, TH, TD } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Pagination from "../components/ui/Pagination";
import Select from "../components/ui/Select";
import DatePicker from "../components/ui/DatePicker";
import {
  getTheses,
  getThesisBySupervisor,
  getThesisByStudent,
  getThesisByDateRange,
  getThesisByYear,
  getSupervisors,
  getStudents,
  searchTheses,
  Thesis,
  Supervisor,
  Student,
} from "../services/api";

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.875rem;
  color: #4b5563; /* Darker text color for better visibility */
  margin-right: 0.5rem;
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: white;
  min-width: 200px;
  color: #1f2937; /* Darker text color */
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #1f2937; /* Darker text color */
`;

const SearchInput = styled(Input)`
  flex: 1;
  min-width: 300px;
`;

const ClearFiltersButton = styled(Button)`
  margin-left: auto;
`;

export default function ThesesPage() {
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  // Add sort state
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Get unique years from the submission dates
  const years = useMemo(() => {
    const uniqueYears = new Set<string>();
    theses.forEach((thesis) => {
      if (thesis.submission_date) {
        const year = new Date(thesis.submission_date).getFullYear().toString();
        uniqueYears.add(year);
      }
    });
    return Array.from(uniqueYears).sort((a, b) => b.localeCompare(a)); // Sort descending
  }, [theses]);

  // Fetch all theses for initial load
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const thesesData = await getTheses();
        setTheses(thesesData);

        const supervisorsData = await getSupervisors();
        setSupervisors(supervisorsData);

        const studentsData = await getStudents();
        setStudents(studentsData);

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load initial data");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Effect for filtering theses
  useEffect(() => {
    const fetchFilteredData = async () => {
      if (
        !selectedSupervisor &&
        !selectedStudent &&
        !selectedYear &&
        !startDate &&
        !endDate &&
        !searchQuery
      ) {
        // If no filters are applied, return all theses
        const allTheses = await getTheses();
        setTheses(allTheses);
        return;
      }

      setLoading(true);
      try {
        let filteredTheses;

        // Apply search query first if exists
        if (searchQuery) {
          filteredTheses = await searchTheses(searchQuery);
        }

        // Apply supervisor filter
        if (selectedSupervisor) {
          const supervisorId = parseInt(selectedSupervisor);
          const thesesBySupervisor = await getThesisBySupervisor(supervisorId);
          filteredTheses = filteredTheses
            ? filteredTheses.filter((thesis) =>
                thesesBySupervisor.some((t) => t.id === thesis.id)
              )
            : thesesBySupervisor;
        }

        // Apply student filter
        if (selectedStudent) {
          const studentId = parseInt(selectedStudent);
          const thesesByStudent = await getThesisByStudent(studentId);
          filteredTheses = filteredTheses
            ? filteredTheses.filter((thesis) =>
                thesesByStudent.some((t) => t.id === thesis.id)
              )
            : thesesByStudent;
        }

        // Apply year filter
        if (selectedYear) {
          const thesesByYear = await getThesisByYear(selectedYear);
          filteredTheses = filteredTheses
            ? filteredTheses.filter((thesis) =>
                thesesByYear.some((t) => t.id === thesis.id)
              )
            : thesesByYear;
        }

        // Apply date range filter
        if (startDate && endDate) {
          const thesesByDateRange = await getThesisByDateRange(
            startDate,
            endDate
          );
          filteredTheses = filteredTheses
            ? filteredTheses.filter((thesis) =>
                thesesByDateRange.some((t) => t.id === thesis.id)
              )
            : thesesByDateRange;
        }

        setTheses(filteredTheses || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching filtered theses:", err);
        setError("Failed to apply filters");
      } finally {
        setLoading(false);
      }
    };

    // Only run the effect if any filter has been applied
    if (
      selectedSupervisor ||
      selectedStudent ||
      selectedYear ||
      (startDate && endDate) ||
      searchQuery
    ) {
      fetchFilteredData();
    }
  }, [
    selectedSupervisor,
    selectedStudent,
    selectedYear,
    startDate,
    endDate,
    searchQuery,
  ]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      setLoading(true);
      try {
        const results = await searchTheses(searchQuery);
        setTheses(results);
        setError(null);
      } catch (err) {
        console.error("Error searching theses:", err);
        setError("Failed to search theses");
      } finally {
        setLoading(false);
      }
    }
  };

  const clearFilters = async () => {
    setSelectedSupervisor("");
    setSelectedStudent("");
    setSelectedYear("");
    setStartDate("");
    setEndDate("");
    setSearchQuery("");

    // Reset to all theses
    setLoading(true);
    try {
      const allTheses = await getTheses();
      setTheses(allTheses);
      setError(null);
    } catch (err) {
      console.error("Error resetting theses:", err);
      setError("Failed to reset filters");
    } finally {
      setLoading(false);
    }
  };

  // Sort theses based on the sortOrder
  const sortedTheses = useMemo(() => {
    if (!theses.length) return [];

    return [...theses].sort((a, b) => {
      const dateA = new Date(a.submission_date).getTime();
      const dateB = new Date(b.submission_date).getTime();

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [theses, sortOrder]);

  // Update pagination to use sortedTheses
  const indexOfLastThesis = currentPage * itemsPerPage;
  const indexOfFirstThesis = indexOfLastThesis - itemsPerPage;
  const currentTheses = sortedTheses.slice(
    indexOfFirstThesis,
    indexOfLastThesis
  );
  const totalPages = Math.ceil(sortedTheses.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [theses.length]);

  return (
    <PageWrapper>
      <PageHeader>
        <Title>Completed Theses Archive</Title>
      </PageHeader>

      <FiltersContainer>
        <FilterRow>
          <FilterLabel>Search:</FilterLabel>
          <form
            onSubmit={handleSearch}
            style={{ display: "flex", flex: 1, gap: "0.5rem" }}
          >
            <SearchInput
              type="text"
              placeholder="Search by title, student or supervisor name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>
        </FilterRow>

        <FilterRow>
          <div>
            <FilterLabel htmlFor="supervisor-select">Supervisor:</FilterLabel>
            <StyledSelect
              id="supervisor-select"
              value={selectedSupervisor}
              onChange={(e) => setSelectedSupervisor(e.target.value)}
            >
              <option value="">All Supervisors</option>
              {supervisors.map((supervisor) => (
                <option key={supervisor.id} value={supervisor.id}>
                  {supervisor.name}
                </option>
              ))}
            </StyledSelect>
          </div>

          <div>
            <FilterLabel htmlFor="student-select">Student:</FilterLabel>
            <StyledSelect
              id="student-select"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">All Students</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </StyledSelect>
          </div>

          <div>
            <FilterLabel htmlFor="year-select">Year:</FilterLabel>
            <StyledSelect
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </StyledSelect>
          </div>

          <div>
            <FilterLabel htmlFor="sort-select">Sort by Date:</FilterLabel>
            <StyledSelect
              id="sort-select"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "newest" | "oldest")
              }
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </StyledSelect>
          </div>
        </FilterRow>

        <FilterRow>
          <DatePicker
            id="start-date"
            label="From"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            max={endDate || undefined}
            placeholder="Start Date"
          />

          <DatePicker
            id="end-date"
            label="To"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || undefined}
            placeholder="End Date"
          />

          <ClearFiltersButton
            variant="secondary"
            size="sm"
            onClick={clearFilters}
          >
            Clear Filters
          </ClearFiltersButton>
        </FilterRow>
      </FiltersContainer>

      <Card>
        <CardHeader>
          <CardTitle>Archived Theses</CardTitle>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div>Loading thesis data...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <Table>
              <THead>
                <TR>
                  <TH>Title</TH>
                  <TH>Student</TH>
                  <TH>Supervisor</TH>
                  <TH>Submission Date</TH>
                  <TH>Grade</TH>
                  <TH>Actions</TH>
                </TR>
              </THead>
              <TBody>
                {currentTheses.length === 0 ? (
                  <TR>
                    <TD colSpan={6} style={{ textAlign: "center" }}>
                      No theses found.
                    </TD>
                  </TR>
                ) : (
                  currentTheses.map((thesis) => (
                    <TR key={thesis.id}>
                      <TD>{thesis.title}</TD>
                      <TD>{thesis.student_name || "N/A"}</TD>
                      <TD>{thesis.supervisor_name || "N/A"}</TD>
                      <TD>
                        {thesis.submission_date
                          ? format(
                              parseISO(thesis.submission_date),
                              "MMM d, yyyy"
                            )
                          : "N/A"}
                      </TD>
                      <TD>{thesis.grade || "N/A"}</TD>
                      <TD>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TD>
                    </TR>
                  ))
                )}
              </TBody>
            </Table>
          )}
        </CardBody>
        <CardFooter>
          {!loading && !error && theses.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}
