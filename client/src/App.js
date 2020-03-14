import React from "react";
import { hot } from "react-hot-loader/root";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.textCenter}>
      <p>Hello, World!</p>
    </div>
  );
}

export default hot(App);
