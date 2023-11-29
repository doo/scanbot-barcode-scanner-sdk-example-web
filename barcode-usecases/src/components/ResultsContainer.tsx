const ResultsContainer = ({results}: {results: string[]}) => {
  return (
    <div className="bg-white h-1/5 overflow-auto rounded-s-sm rounded-e-sm">
      <div>
        {results.map((result) => {
          return <p></p>;
        })}
      </div>
    </div>
  );
};

export default ResultsContainer;
