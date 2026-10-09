import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const IT_ROLES = [
  "Software Developer",
  "Full Stack Developer Java",
  "Full Stack Developer Python",
  "Frontend Developer",
  "Backend Developer",
  "Web Developer",
  "Mobile App Developer",
  "Android Developer",
  "iOS Developer",
  "Python Developer",
  "Java Developer",
  ".NET Developer",
  "PHP Developer",
  "React Developer",
  "Node.js Developer",
  "UI/UX Designer",
  "Data Analyst",
  "Data Scientist",
  "Business Analyst",
  "AI/ML Engineer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Cybersecurity Analyst",
  "Network Engineer",
  "System Administrator",
  "Database Administrator",
  "QA Engineer",
  "Software Tester",
  "Automation Tester",
  "Technical Support Engineer",
  "IT Support Executive",
  "IT Project Manager",
  "Product Manager",
  "Scrum Master",
  "Solutions Architect",
  "Blockchain Developer",
  "Game Developer",
  "SEO Specialist",
  "Digital Marketing Specialist",
  "Content Writer",
  "Technical Writer"
];

const NON_IT_ROLES = [
  "HR Executive",
  "HR Manager",
  "Recruiter",
  "Talent Acquisition Executive",
  "Payroll Executive",
  "Accountant",
  "Finance Executive",
  "Financial Analyst",
  "Banking Executive",
  "Insurance Executive",
  "Sales Executive",
  "Sales Manager",
  "Business Development Executive",
  "Business Development Manager",
  "Marketing Executive",
  "Marketing Manager",
  "Digital Marketing Executive",
  "Customer Care Executive",
  "Customer Support Executive",
  "Telecaller",
  "Back Office Executive",
  "Data Entry Operator",
  "Office Administrator",
  "Administrative Executive",
  "Receptionist",
  "Front Office Executive",
  "Operations Executive",
  "Operations Manager",
  "Logistics Executive",
  "Supply Chain Executive",
  "Procurement Executive",
  "Purchase Executive",
  "Store Manager",
  "Warehouse Executive",
  "Inventory Executive",
  "Retail Sales Executive",
  "Store Executive",
  "Relationship Manager",
  "Account Manager",
  "Legal Executive",
  "Legal Assistant",
  "Content Writer",
  "Copywriter",
  "Graphic Designer",
  "Video Editor",
  "Social Media Executive",
  "Social Media Manager",
  "Teacher",
  "Tutor",
  "Trainer",
  "School Coordinator",
  "Healthcare Executive",
  "Medical Representative",
  "Hospital Administrator",
  "Pharmacist",
  "Lab Technician",
  "Civil Engineer",
  "Mechanical Engineer",
  "Electrical Engineer",
  "Production Engineer",
  "Quality Control Executive",
  "Quality Assurance Executive",
  "Manufacturing Executive",
  "Site Engineer",
  "Architect",
  "Interior Designer",
  "Real Estate Executive",
  "Hotel Manager",
  "Chef",
  "Restaurant Manager",
  "Hospitality Executive",
  "Travel Consultant",
  "Customer Relationship Executive"
];

const GENERAL_ROLES = [
  "General Candidate"
];

async function seedPositions() {
  console.log('Seeding IT Roles...');
  for (const role of IT_ROLES) {
    await prisma.position.upsert({
      where: { position_name: role },
      update: {},
      create: {
        position_name: role,
        department_type: 'IT'
      }
    });
  }

  console.log('Seeding Non-IT Roles...');
  for (const role of NON_IT_ROLES) {
    await prisma.position.upsert({
      where: { position_name: role },
      update: {},
      create: {
        position_name: role,
        department_type: 'Non-IT'
      }
    });
  }

  console.log('Seeding General Roles...');
  for (const role of GENERAL_ROLES) {
    await prisma.position.upsert({
      where: { position_name: role },
      update: {},
      create: {
        position_name: role,
        department_type: 'General'
      }
    });
  }

  console.log('Finished seeding positions!');
}

seedPositions()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
