import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

const FILES = {
  staff: "staff.json",
  departments: "departments.json",
  faculties: "faculties.json",
  designations: "designations.json",
  announcements: "announcements.json",
};

async function readCollection(name) {
  const filePath = path.join(DATA_DIR, FILES[name]);
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

async function writeCollection(name, data) {
  const filePath = path.join(DATA_DIR, FILES[name]);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  return data;
}

function generateId(prefix, existing) {
  const nums = existing
    .map((item) => item.id)
    .filter((id) => typeof id === "string" && id.startsWith(prefix + "-"))
    .map((id) => parseInt(id.split("-").pop(), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `${prefix}-${String(next).padStart(4, "0")}`;
}

/* -------------------- Staff -------------------- */

export async function getAllStaff() {
  return readCollection("staff");
}

export async function getStaffById(id) {
  const all = await readCollection("staff");
  return all.find((s) => s.id === id) || null;
}

export async function createStaff(payload) {
  const all = await readCollection("staff");
  const id = generateId("stf", all);
  const record = {
    id,
    status: "Active",
    dateEmployed: new Date().toISOString().slice(0, 10),
    ...payload,
  };
  all.push(record);
  await writeCollection("staff", all);
  return record;
}

export async function updateStaff(id, payload) {
  const all = await readCollection("staff");
  const index = all.findIndex((s) => s.id === id);
  if (index === -1) return null;
  all[index] = { ...all[index], ...payload, id };
  await writeCollection("staff", all);
  return all[index];
}

export async function deleteStaff(id) {
  const all = await readCollection("staff");
  const next = all.filter((s) => s.id !== id);
  if (next.length === all.length) return false;
  await writeCollection("staff", next);
  return true;
}

/* -------------------- Departments -------------------- */

export async function getAllDepartments() {
  return readCollection("departments");
}

export async function getDepartmentById(id) {
  const all = await readCollection("departments");
  return all.find((d) => d.id === id) || null;
}

/* -------------------- Faculties -------------------- */

export async function getAllFaculties() {
  return readCollection("faculties");
}

export async function getFacultyById(id) {
  const all = await readCollection("faculties");
  return all.find((f) => f.id === id) || null;
}

/* -------------------- Designations -------------------- */

export async function getAllDesignations() {
  return readCollection("designations");
}

export async function getDesignationById(id) {
  const all = await readCollection("designations");
  return all.find((d) => d.id === id) || null;
}

/* -------------------- Announcements -------------------- */

export async function getAllAnnouncements() {
  const all = await readCollection("announcements");
  return [...all].sort((a, b) => new Date(b.date) - new Date(a.date));
}

/* -------------------- Aggregation helpers -------------------- */

export async function getEnrichedStaff() {
  const [staff, departments, faculties, designations] = await Promise.all([
    getAllStaff(),
    getAllDepartments(),
    getAllFaculties(),
    getAllDesignations(),
  ]);

  const depMap = Object.fromEntries(departments.map((d) => [d.id, d]));
  const facMap = Object.fromEntries(faculties.map((f) => [f.id, f]));
  const desMap = Object.fromEntries(designations.map((d) => [d.id, d]));

  return staff.map((s) => ({
    ...s,
    department: depMap[s.departmentId] || null,
    faculty: facMap[s.facultyId] || null,
    designation: desMap[s.designationId] || null,
  }));
}

export async function getEnrichedStaffById(id) {
  const all = await getEnrichedStaff();
  return all.find((s) => s.id === id) || null;
}

export async function getStats() {
  const [staff, departments, faculties] = await Promise.all([
    getAllStaff(),
    getAllDepartments(),
    getAllFaculties(),
  ]);
  return {
    totalStaff: staff.length,
    totalDepartments: departments.length,
    totalFaculties: faculties.length,
    activeStaff: staff.filter((s) => s.status === "Active").length,
  };
}
