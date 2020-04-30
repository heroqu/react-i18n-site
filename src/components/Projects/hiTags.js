// TODO: make this data to be loaded from json file
// in ComponentDidMount

// tags to be highlighted:
const tags = [
  'Microservices',
  'Node.js',
  'JavaScript',
  'TypeScript',
  'Express',
  'Mongo',
  'MongoDB',
  'Mongoose',
  'Redis',
  'Docker',
  'GitFlow',
  'Gulp',
  'Restify',
  'SQL',
  't-SQL',
  'React',
  'Redux',
  'Kafka',
  'Next.js',
  'Ganache.js',
  'Web3.js',
  'Ethereum',
  'Blockchain',
  'Solidity',
  'Smart contracts',
].map(s => s.toLowerCase())

const highlightedTagsSet = new Set(tags)

export default highlightedTagsSet
