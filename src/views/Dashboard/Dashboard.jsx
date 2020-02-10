import React from "react";
import HomeNavbar from "../../components/NavBar";
import DashboardTabs from "./DashboardTabs";
import { Container } from "reactstrap";

const Dashboard = () => {
  return (
    <div>
      <HomeNavbar />
      <Container>
        <DashboardTabs />
      </Container>
    </div>
  );
};

export default Dashboard;
