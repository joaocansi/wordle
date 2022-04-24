interface LetterProps {
  letter: string;
}

const Letter = ({ letter }: LetterProps) => {
  return <div className="letter">{letter}</div>;
};

export default Letter;
