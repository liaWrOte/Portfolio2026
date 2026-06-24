import React from 'react';
import ProjectShowcase from '../components/ProjectShowcase/ProjectShowcase';

// Example data structure - replace with your actual project data
const exampleProjects = [
  {
    id: '1',
    name: 'E-commerce Platform',
    type: 'Web Design',
    pitch:
      'A modern e-commerce platform built with React and Node.js, featuring real-time inventory management and seamless payment integration.',
    techno: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    role: 'Full Stack Developer',
    date: '2024',
    link: 'https://example.com/project1'
  },
  {
    id: '2',
    name: 'Brand Identity System',
    type: 'Brand Design',
    pitch:
      'Complete brand identity design including logo, color palette, typography guidelines, and marketing materials.',
    techno: ['Figma', 'Illustrator', 'After Effects'],
    role: 'Brand Designer',
    date: '2023',
    link: 'https://example.com/project2'
  },
  {
    id: '3',
    name: 'Mobile Banking App',
    type: 'Web Design',
    pitch:
      'Secure and intuitive mobile banking application with biometric authentication and real-time transaction tracking.',
    techno: ['React Native', 'TypeScript', 'Firebase', 'JWT'],
    role: 'Mobile Developer',
    date: '2024',
    link: 'https://example.com/project3'
  },
  {
    id: '4',
    name: 'Marketing Dashboard',
    type: 'Web Design',
    pitch:
      'Analytics dashboard for marketing teams with real-time data visualization and campaign management tools.',
    techno: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL'],
    role: 'Frontend Developer',
    date: '2023',
    link: 'https://example.com/project4'
  }
];

const ProjectShowcaseExample = () => {
  const handleProjectClick = (projectId) => {
    console.log('Project clicked:', projectId);
    // Navigate to project details or open project modal
    // Example: history.push(`/project/${projectId}`);
  };

  return (
    <ProjectShowcase
      projects={exampleProjects}
      onProjectClick={handleProjectClick}
      selectedProjectId={null}
      title="My Portfolio"
      subtitle="A collection of web design, brand design, and development projects"
    />
  );
};

export default ProjectShowcaseExample;
