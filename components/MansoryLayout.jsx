import { useEffect, useState } from "react";

export default function MansoryLayout({ children, classes }) {
  const [size, setSize] = useState([0, 0]);
  const [columns, setColumns] = useState(1);
  const [gridColClass, setGridColClass] = useState("");

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    if (size[0] > 767) {
      setColumns(3);
      setGridColClass("grid-cols-3");
    } else if (size[0] > 639) {
      setColumns(2);
      setGridColClass("grid-cols-2");
    } else {
      setColumns(1);
      setGridColClass("grid-cols-1");
    }

    window.addEventListener("resize", updateSize, false);
    updateSize();
    return () => window.removeEventListener("resize", updateSize, false);
  }, [size[0]]);

  function splitIntoColumns() {
    const columnWrapper = [];
    const results = [];

    for (let i = 0; i < columns; i++) {
      columnWrapper[`column${i}`] = [];
    }

    for (let i = 0; i < children.length; i++) {
      const columnIndex = i % columns;
      columnWrapper[`column${columnIndex}`]?.push(<>{children[i]}</>);
    }

    console.log(columnWrapper);
    for (let i = 0; i < columns; i++) {
      results.push(columnWrapper[`column${i}`]);
    }
    return results;
  }

  const splittedData = splitIntoColumns();

  return (
    <div className={`grid ${gridColClass} gap-y-5 gap-x-4 ${classes}`}>
      {splittedData.map((data, i) => (
        <div className="flex flex-col flex-wrap gap-4" key={i}>
          {data}
        </div>
      ))}
    </div>
  );
}
