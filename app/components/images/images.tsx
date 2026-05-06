"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "./index.scss";

const Images = () => {
  const parentReference = useRef(null);
  const viewChild = useInView(parentReference, {once: true, amount: .5});

  return (
    <section id="images">
      <div className="images-container" ref={parentReference}>
        <div className="images">
          <motion.div className="item item__1"
          initial={{opacity: 0, y: 100}}
          animate={viewChild ? {opacity: 1, y: 0} : {}}
          transition={{
            duration: .5
          }}
          />
          <motion.div className="item item__2"
          initial={{opacity: 0, y: 100}}
          animate={viewChild ? {opacity: 1, y: 0} : {}}
          transition={{
            duration: .5,
            delay: .1
          }}
          />
          <motion.div className="item item__3"
          initial={{opacity: 0, y: 100}}
          animate={viewChild ? {opacity: 1, y: 0} : {}}
          transition={{
            duration: .5,
            delay: .2
          }}
          />
        </div>
      </div>
    </section>
  )
}
export default Images;