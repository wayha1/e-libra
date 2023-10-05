import React, { useRef } from "react";
import { firestore } from "../../firebase";
import { addDoc, collection} from "@firebase/firestore"

const AboutUs = () => {
  const messageRef = useRef();
  const ref = collection(firestore, "messages");

  const handleSave = async (e) => {
    e.preventDefualt();
    console.log(messageRef.current.value);
    
      let data = {
        message: messageRef.current.value,
      };

      try {
        addDoc(ref, data);
      }catch (e) {
        console.log(e);
      }
  };

  return (
    <section className="text-center">
      <main>
        <div className="Banner mt-30">
          <form onSubmit={handleSave}>
            <label>Enter Message</label>
            <input type="text" ref={messageRef} className="border-black" />
            <button type="submit"> save</button>
          </form>
        </div>
      </main>
    </section>
  );
};

export default AboutUs;
