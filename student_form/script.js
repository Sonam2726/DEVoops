const form = document.getElementById('studentForm');
const messageBox = document.getElementById('messageBox');
const studentList = document.getElementById('studentList');

let students = [];

function showMessage(text, type = 'success') {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;
}

function clearErrors() {
  document.querySelectorAll('.error-text').forEach((el) => {
    el.textContent = '';
  });
  document.querySelectorAll('input, select').forEach((el) => {
    el.classList.remove('input-invalid');
  });
}

function validateField(field, value) {
  switch (field) {
    case 'name':
      if (!value.trim() || value.trim().length < 3 || !/^[A-Za-z\s]+$/.test(value.trim())) {
        return 'Name must contain at least 3 letters only.';
      }
      return '';
    case 'email':
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        return 'Please enter a valid email address.';
      }
      return '';
    case 'mobile':
      if (!/^\d{10}$/.test(value.trim())) {
        return 'Mobile number must be exactly 10 digits.';
      }
      return '';
    case 'password':
      if (value.trim().length < 6) {
        return 'Password must be at least 6 characters.';
      }
      return '';
    case 'branch':
      if (!value) {
        return 'Please select a branch.';
      }
      return '';
    default:
      return '';
  }
}

function renderStudents() {
  if (!students.length) {
    studentList.innerHTML = '<li>No students registered yet.</li>';
    return;
  }

  studentList.innerHTML = students
    .map(
      (student) => `
        <li>
          <strong>${student.name}</strong> — ${student.email} | ${student.mobile} | ${student.branch}
        </li>
      `
    )
    .join('');
}

async function loadStudents() {
  try {
    const response = await fetch('student.json');
    if (!response.ok) {
      throw new Error('Unable to load student data.');
    }

    const data = await response.json();
    students = Array.isArray(data.students) ? data.students : [];
    renderStudents();
  } catch (error) {
    console.error(error);
    students = [];
    renderStudents();
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearErrors();

  const formData = new FormData(form);
  const entries = Object.fromEntries(formData.entries());

  const fields = ['name', 'email', 'mobile', 'password', 'branch'];
  const errors = {};

  fields.forEach((field) => {
    const value = String(entries[field] || '').trim();
    const error = validateField(field, value);
    errors[field] = error;

    if (error) {
      document.getElementById(`${field}Error`).textContent = error;
      document.getElementById(field).classList.add('input-invalid');
    }
  });

  const validCount = fields.filter((field) => !errors[field]).length;

  if (validCount === fields.length) {
    students.unshift({
      name: entries.name.trim(),
      email: entries.email.trim(),
      mobile: entries.mobile.trim(),
      password: entries.password.trim(),
      branch: entries.branch,
    });

    localStorage.setItem('studentRegistrations', JSON.stringify(students));
    renderStudents();
    form.reset();
    showMessage('Registration successful! Student added to the list.', 'success');
  } else if (validCount === 0) {
    showMessage('Registration failed. Please complete all required fields correctly.', 'error');
  } else {
    showMessage('Partial successful registration. Please fix the highlighted fields.', 'partial');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const savedStudents = localStorage.getItem('studentRegistrations');

  if (savedStudents) {
    students = JSON.parse(savedStudents);
    renderStudents();
  } else {
    loadStudents();
  }
});