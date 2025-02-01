import React from "react";

const DiaryHint: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 my-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        日記を書くためのヒント
      </h2>
      <ol className="space-y-3 text-gray-600">
        <li className="flex items-start">
          <span className="font-bold mr-2">1.</span>
          <span>今日あった出来事を書く</span>
        </li>
        <li className="flex items-start">
          <span className="font-bold mr-2">2.</span>
          <span>その出来事から感じたことを書く</span>
        </li>
        <li className="flex items-start">
          <span className="font-bold mr-2">3.</span>
          <span>これからどうしていくかを書く</span>
        </li>
      </ol>
    </div>
  );
};

export default DiaryHint;
