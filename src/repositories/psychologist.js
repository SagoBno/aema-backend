async function listAll(result) {
  const psychologists = await app.db.Psychologist.findAll(result);
  return psychologists;
}

const psychologistRepository = {
  listAll,
};

export default psychologistRepository;
