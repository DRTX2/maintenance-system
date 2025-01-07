import { Grid2 } from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { useEffect, useState } from "react";
import { getDecodedToken } from "../../utils/authService";
import { useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";
import ReportItem from "./ReportItem";
import ResponsiblesModal from "./ResponsiblesModal";
import AssetsModal from "./AssetsModal";
import generateMaintenancesPDF from "./generateMaintenancesPDF";

const Report = () => {
  const role = getDecodedToken()?.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/dashboard/maintance");
    }
  }, [role, navigate]);

  const [isOpenResponsiblesModal, setIsOpenResponiblesModal] = useState(false);
  const [isOpenAssets, setIsOpenAssets] = useState(false);

  const handleReportMaintenaces = () => {
    generateMaintenancesPDF();
  };

  return (
    <Wrapper>
      <Grid2
        container
        spacing={2}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <ReportItem
          open={setIsOpenResponiblesModal}
          icon={SupervisorAccountIcon}
          label="Mantenimiento de responsables"
        />
        <ReportItem
          open={setIsOpenAssets}
          icon={DevicesIcon}
          label="Histórico de activos"
        />
        <ReportItem
          open={() => handleReportMaintenaces()}
          icon={WorkHistoryIcon}
          label="Cumplimiento de mantenimientos"
        />
      </Grid2>

      <ResponsiblesModal
        open={isOpenResponsiblesModal}
        handleClose={() => setIsOpenResponiblesModal(false)}
      />

      <AssetsModal
        open={isOpenAssets}
        handleClose={() => setIsOpenAssets(false)}
      />
    </Wrapper>
  );
};

export default Report;
