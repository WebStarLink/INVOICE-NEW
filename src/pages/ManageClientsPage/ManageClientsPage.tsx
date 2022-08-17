import React, { useEffect, useState } from "react";
import classes from "./ManageClientsPage.module.scss";
import { ReactComponent as SelectClientIcon } from "assets/icons/select-client.svg";
import COLORS from "constants/colors";
import { FormProfile, TableManageClients } from "modules";
import { IClient } from "interfaces";
import { useDispatch, useSelector } from "react-redux";
import { clientsResponseSelector, getClients } from "store/global";

const ManageClientsPage = () => {
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
  const dispatch = useDispatch();
  const clients = useSelector(clientsResponseSelector);

  const handleSelectClient = (client: IClient) => {
    setSelectedClient(client);
  };

  const saveClientHandler = (values: IClient) => {
    console.log(values);
  };

  useEffect(() => {
    if (!clients) {
      dispatch(getClients());
    }
  }, [dispatch, clients]);

  return (
    <div className={classes.wrapper}>
      <h1>Manage Clients</h1>
      {clients && clients.length ? (
        <TableManageClients data={clients} onClick={handleSelectClient} />
      ) : (
        <div>Empty</div>
      )}

      <div className={classes.clientCard}>
        {!selectedClient ? (
          <>
            <SelectClientIcon width={100} height={100} fill={COLORS.PRIMARY} />
            <h2 className={classes.clientCardTitle}>Please select a client for editing ...</h2>
          </>
        ) : (
          <FormProfile onSubmit={saveClientHandler} profile={selectedClient} />
        )}
      </div>
    </div>
  );
};

export default ManageClientsPage;
