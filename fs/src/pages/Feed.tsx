import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

interface List {
  _id?: string;
  name: string;
  items?: string[];
}

interface Item {
  _id?: string;
  name: string;
}

const fetchLists = async (): Promise<List[]> => {
  const res = await fetch("/lists");
  if (!res.ok) throw new Error("failed to fetch lists");
  return res.json();
};

const fetchItems = async (): Promise<Item[]> => {
  const res = await fetch("/items");
  if (!res.ok) throw new Error("failed to fetch items");
  return res.json();
};

const Feed = () => {
  const { data: lists = [] } = useQuery({ queryKey: ["lists"], queryFn: fetchLists });
  const { data: items = [] } = useQuery({ queryKey: ["items"], queryFn: fetchItems });

  const feed = [...lists, ...items];
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: index * container.clientHeight,
        behavior: "smooth",
      });
    }
  }, [index]);

  const next = () => {
    if (feed.length) {
      setIndex((i) => (i + 1) % feed.length);
    }
  };

  const random = () => {
    if (feed.length) {
      const r = Math.floor(Math.random() * feed.length);
      setIndex(r);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur p-4 text-center font-bold">
        MSLISTS
      </header>
      <div ref={containerRef} className="flex-1 overflow-y-scroll snap-y snap-mandatory">
        {feed.map((item, i) => (
          <div
            key={i}
            className="h-screen snap-start flex items-center justify-center p-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">
                {item.name ?? "Unnamed"}
              </h2>
              {Array.isArray((item as List).items) && (
                <ul className="mt-4 list-disc list-inside text-left">
                  {(item as List).items?.map((sub) => (
                    <li key={sub}>{sub}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
        {feed.length === 0 && (
          <div className="h-screen flex items-center justify-center">
            <p>No items.</p>
          </div>
        )}
      </div>
      <footer className="sticky bottom-0 z-10 bg-background/80 backdrop-blur p-4 flex justify-between">
        <Button onClick={next}>Next</Button>
        <Button variant="outline" onClick={random}>
          Random
        </Button>
      </footer>
    </div>
  );
};

export default Feed;
