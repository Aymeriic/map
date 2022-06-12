import React from 'react';

import ToolItem from "./ToolItem";
import { selectCredit } from "../map/mapSlice";
import { useAppSelector } from "../../app/hooks";
import { Elements } from "../../constants/config";

import styles from './Toolbox.module.css';

export const Toolbox = (): JSX.Element => {
  const credit = useAppSelector(selectCredit);

  return (
    <div className={styles.toolbox}>
      <p className={styles.credit}>Credit : {credit}</p>
      <ToolItem editable type={Elements.Rock} />
      <ToolItem editable type={Elements.Water} />
      <ToolItem editable type={Elements.House} />
    </div>
  );
};

export default Toolbox;
