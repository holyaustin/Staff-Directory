import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Read JSON file with error handling
async function readJSON(filename, defaultValue = []) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Create file with default value
      await writeJSON(filename, defaultValue);
      return defaultValue;
    }
    throw error;
  }
}

// Write JSON file with safe write
async function writeJSON(filename, data) {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  const tempPath = filePath + '.tmp';
  
  try {
    // Write to temp file first
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf8');
    // Rename temp to actual file (atomic operation)
    await fs.rename(tempPath, filePath);
  } catch (error) {
    // Clean up temp file if error
    try {
      await fs.unlink(tempPath);
    } catch {}
    throw error;
  }
}

// Database operations
export const db = {
  // Staff operations
  async getAllStaff() {
    const staff = await readJSON('staff.json');
    const departments = await readJSON('departments.json');
    const units = await readJSON('units.json');
    
    return staff.map(s => {
      const dept = departments.find(d => d.id === s.departmentId);
      const unit = units.find(u => u.id === s.unitId);
      return {
        ...s,
        departmentName: dept?.name || 'Unknown',
        departmentCode: dept?.code || 'N/A',
        unitName: unit?.name || 'Unknown',
        fullName: `${s.firstName} ${s.lastName}`
      };
    });
  },

  async getStaffById(id) {
    const staff = await readJSON('staff.json');
    return staff.find(s => s.id === id);
  },

  async createStaff(data) {
    const staff = await readJSON('staff.json');
    const newStaff = {
      id: `stf${String(staff.length + 1).padStart(3, '0')}`,
      ...data,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    staff.push(newStaff);
    await writeJSON('staff.json', staff);
    await this.logAudit('CREATE_STAFF', `Created staff: ${newStaff.firstName} ${newStaff.lastName}`);
    return newStaff;
  },

  async updateStaff(id, data) {
    const staff = await readJSON('staff.json');
    const index = staff.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Staff not found');
    
    staff[index] = {
      ...staff[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    await writeJSON('staff.json', staff);
    await this.logAudit('UPDATE_STAFF', `Updated staff: ${staff[index].firstName} ${staff[index].lastName}`);
    return staff[index];
  },

  async deleteStaff(id) {
    const staff = await readJSON('staff.json');
    const index = staff.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Staff not found');
    
    const deleted = staff[index];
    staff.splice(index, 1);
    await writeJSON('staff.json', staff);
    await this.logAudit('DELETE_STAFF', `Deleted staff: ${deleted.firstName} ${deleted.lastName}`);
    return { success: true };
  },

  async searchStaff(query) {
    const allStaff = await this.getAllStaff();
    const q = query.toLowerCase().trim();
    
    if (!q) return allStaff;
    
    return allStaff.filter(s => 
      s.firstName?.toLowerCase().includes(q) ||
      s.lastName?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.jobTitle?.toLowerCase().includes(q) ||
      s.departmentName?.toLowerCase().includes(q) ||
      s.phone?.includes(q) ||
      s.bio?.toLowerCase().includes(q)
    );
  },

  // Department operations
  async getDepartments() {
    return await readJSON('departments.json');
  },

  async getDepartmentById(id) {
    const depts = await readJSON('departments.json');
    return depts.find(d => d.id === id);
  },

  // Unit operations
  async getUnits() {
    return await readJSON('units.json');
  },

  async getUnitsByDepartment(departmentId) {
    const units = await readJSON('units.json');
    return units.filter(u => u.departmentId === departmentId);
  },

  // User operations
  async getUserByEmail(email) {
    const users = await readJSON('users.json');
    return users.find(u => u.email === email);
  },

  async getUsers() {
    return await readJSON('users.json');
  },

  // Audit logging
  async logAudit(action, details) {
    const audits = await readJSON('audit.json');
    const newAudit = {
      id: `aud${String(audits.length + 1).padStart(3, '0')}`,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    audits.push(newAudit);
    await writeJSON('audit.json', audits);
    return newAudit;
  },

  async getAuditLogs() {
    return await readJSON('audit.json');
  },

  // Statistics
  async getStats() {
    const staff = await readJSON('staff.json');
    const departments = await readJSON('departments.json');
    const users = await readJSON('users.json');
    
    return {
      totalStaff: staff.length,
      totalDepartments: departments.length,
      totalUsers: users.length,
      activeStaff: staff.filter(s => s.isActive).length,
      departments: departments.map(d => ({
        ...d,
        staffCount: staff.filter(s => s.departmentId === d.id).length
      }))
    };
  }
};