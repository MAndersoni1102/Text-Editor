import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (content) => {
    console.log('Post to the database');
  
    // This creates a connection to the database along with the version we want to use
    const jateDb = await openDB('jate', 1);
  
    // This will create a transaction along with the database we want to use
    const tx = jateDb.transaction('jate', 'readwrite');
  
    // This will open up the desired objectStore
    const store = tx.objectStore('jate');
  
    // This will use the .add method and pass it to the store
    const request = store.put({ content: content, id:1 });
  
    // This will await confirmation that the information was saved
    const result = await request;
    console.log('Data saved to the database', result);
  };
  
  // TODO: Add logic for a method that gets all the content from the database
  export const getDb = async () => {
  
    console.log('GET from the database');
  
    // This will create the database and connection
    const jateDb = await openDB('jate', 1);
  
    // This will create a new transaction and specifiy which database 
    const tx = jateDb.transaction('jate', 'readonly');
  
    // This will open up the stored object
    const store = tx.objectStore('jate');
  
    // This uses the get all method to grab all information in the database
    const request = store.get(1);
  
    // Finally this will grab confirmation of the request
    const result = await request;
    console.log('result.value', result);
    return result?.content;
  };
  
  initdb();

