interface ShowProps {
  score: number;

  timeComplexity: string;

  spaceComplexity: string;

  clarityReadability: string;

  maintainability: string;

  correctness: string;
}

export const Show = ({
  score,
  timeComplexity,
  spaceComplexity,
  clarityReadability,
  maintainability,
  correctness,
}: ShowProps) => {
  return (
    <div className="w-[400px] h-[500px] flex p-3  flex-col items-center gap-3 gfont">
      <h1 className="text-xl font-bold">Code Quality Analysis</h1>
      <div className="text-lg font-semibold">
        Score: <span className="text-[#003049]">{score}</span>
      </div>
      <div className="text-lg">
        <strong className="underline">Time Complexity :</strong>{" "}
        <span className="text-[#003049]">{timeComplexity}</span>
      </div>
      <div className="text-lg">
        <strong className="underline">Space Complexity :</strong>{" "}
        <span className="text-[#003049]">{spaceComplexity}</span>
      </div>
      <div className="text-lg">
        <strong className="underline">Clarity/Readability :</strong>{" "}
        <span className="text-[#003049]">{clarityReadability}</span>
      </div>
      <div className="text-lg">
        <strong className="underline">Maintainability :</strong>{" "}
        <span className="text-[#003049]">{maintainability}</span>
      </div>
      <div className="text-lg">
        <strong className="underline">Correctness :</strong>{" "}
        <span className="text-[#003049]">{correctness}</span>
      </div>
    </div>
  );
};
