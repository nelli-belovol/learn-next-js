import React, { useEffect } from "react";
import { useScrollY } from "../../hooks/useScrollY";
import { useAnimation, motion } from "framer-motion";
import styles from "./Up.module.css";
import { ButtonIcon } from "../../components";

export const Up = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div animate={controls} initial={{ opacity: 0 }} className={styles.up}>
      <ButtonIcon appearance='primary' icon='up' onClick={scrollToTop} aria-label='Наверх' />
    </motion.div>
  );
};
