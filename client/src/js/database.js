import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Put/Post");
  const jateDB = await openDB("jate", 1);

  const transact = jateDB.transaction("jate", "readwrite");

  const store = transact.objectStore("jate");

  const req = store.add({ body: content });

  const res = await req;

  console.log("Data saved to DB", res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("Get");

    const jateDB = await openDB("jate", 1);

    const transact = jateDB.transaction("jate", "readonly");

    const store = transact.objectStore("jate");

    const req = store.getAll();

    const res = await req;

    return res;
  } catch (error) {
    console.error("Error fetching data from IndexedDB:", error);
    return []; // or handle as appropriate
  }
};

initdb();
