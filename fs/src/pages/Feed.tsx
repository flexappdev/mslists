import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

interface List {
  _id: string;
  name: string;
  items?: string[];
}

interface Item {
  _id: string;
  name: string;
  image?: string;
  description?: string;
}

const fetchLists = async (): Promise<List[]> => {
  const res = await fetch("/lists");
  if (!res.ok) throw new Error("failed to fetch lists");
  return res.json();
};

const fetchItem = async (id: string): Promise<Item> => {
  const res = await fetch(`/items?id=${id}`);
  if (!res.ok) throw new Error("failed to fetch item");
  return res.json();
};

const Feed = () => {
  const { data: lists = [] } = useQuery({ queryKey: ["lists"], queryFn: fetchLists });
  const [index, setIndex] = useState(0);
  const [books, setBooks] = useState<Record<string, Item | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lists.length) {
      const r = Math.floor(Math.random() * lists.length);
      setIndex(r);
    }
  }, [lists]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: index * container.clientHeight,
        behavior: "smooth",
      });
    }
    if (lists[index]) {
      const list = lists[index];
      if (list.items && list.items.length) {
        const id = list.items[Math.floor(Math.random() * list.items.length)];
        fetchItem(id).then((item) =>
          setBooks((prev) => ({ ...prev, [list._id]: item }))
        );
      }
    }
  }, [index, lists]);

  const next = () => {
    if (lists.length) {
      setIndex((i) => (i + 1) % lists.length);
    }
  };

  const random = () => {
    if (lists.length) {
      const r = Math.floor(Math.random() * lists.length);
      setIndex(r);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur p-4 text-center font-bold">
        MSLISTS
      </header>
      <div ref={containerRef} className="flex-1 overflow-y-scroll snap-y snap-mandatory">
        {lists.map((list, i) => (
          <div
            key={list._id}
            className="h-screen snap-start flex items-center justify-center p-6"
          >
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-semibold mb-4">{list.name}</h2>
              {books[list._id] && (
                <div>
                  {books[list._id]!.image && (
                    <img
                      src={books[list._id]!.image}
                      alt={books[list._id]!.name}
                      className="mx-auto mb-2 max-h-64 object-contain"
                    />
                  )}
                  <h3 className="text-xl font-semibold">
                    {books[list._id]!.name}
                  </h3>
                  {books[list._id]!.description && (
                    <p className="mt-2 text-sm">
                      {books[list._id]!.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {lists.length === 0 && (
          <div className="h-screen flex items-center justify-center">
            <p>No lists.</p>
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
