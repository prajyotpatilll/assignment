import interns from '../data/interns.js';

export const getAllInterns = (req, res) => {
  res.json(interns);
};

export const getInternById = (req, res) => {
  const intern = interns.find(i => i.id === parseInt(req.params.id));
  if (!intern) return res.status(404).json({ message: 'Intern not found' });
  res.json(intern);
};
